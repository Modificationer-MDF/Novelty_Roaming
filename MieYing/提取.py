import re
import json
import sys

# ---------- 1. 从 WMXX.md 加载 HFNID 映射 ----------
def load_hfnid_mapping(wmxx_path):
    mapping = {}
    try:
        with open(wmxx_path, "r", encoding="utf-8") as f:
            content = f.read()
    except FileNotFoundError:
        print(f"⚠️ 未找到 WMXX.md，将无法提供 HFNID 映射")
        return mapping

    pattern = r'\|\s*(y\d+)\s*\|\s*([^\|]+?)\s*\|'
    for hfnid, username in re.findall(pattern, content):
        username = username.strip()
        if username:
            mapping[username] = hfnid
    return mapping

# ---------- 2. 解析用户名中的标签 ----------
def parse_username(raw_username):
    if '_' in raw_username:
        parts = raw_username.split('_', 1)
        return parts[0], parts[1]
    else:
        return "", raw_username

# ---------- 3. 从 MYXD.md 提取所有帖子 ----------
def extract_posts(md_path, hfnid_map, debug=False):
    with open(md_path, "r", encoding="utf-8") as f:
        lines = f.readlines()

    time_pattern = re.compile(r'[（(](\d{1,2})[：:](\d{1,2})(?:[：:](\d{2}))?[）)]')

    posts = []
    current_post = None
    current_time = None
    in_post = False
    unmatched_titles = []

    for raw_line in lines:
        line = raw_line.strip()

        # ---- 检测标题行 ----
        if re.search(r'###+', line) and '——' in line and '于' in line:
            if current_post:
                posts.append(current_post)

            status = "live"
            httpsta = "200 OK"
            stripped_line = line
            deleted = False

            if stripped_line.startswith('~~') and stripped_line.endswith('~~'):
                deleted = True
                stripped_line = stripped_line[2:-2].strip()
                status_match = re.search(r'(\d{3})\s+([A-Za-z\-]+)$', stripped_line)
                if status_match:
                    code = status_match.group(1)
                    reason = status_match.group(2)
                    httpsta = f"{code} {reason}"
                    stripped_line = re.sub(r'\s+\d{3}\s+[A-Za-z\-]+$', '', stripped_line)
                else:
                    httpsta = "410 Gone"

            id_title_match = re.search(r'([a-zA-Z]\w*?)[（(][“"]([^“”"]+)[”"][）)]', stripped_line)
            if not id_title_match:
                cleaned = re.sub(r'\[[^\]]+\]\s*', '', stripped_line)
                id_title_match = re.search(r'([a-zA-Z]\w*?)[（(][“"]([^“”"]+)[”"][）)]', cleaned)
            if not id_title_match:
                unmatched_titles.append(line)
                continue
            post_id = id_title_match.group(1)
            title = id_title_match.group(2)

            parts = stripped_line.split('——', 1)
            if len(parts) < 2:
                unmatched_titles.append(line)
                continue
            right_part = parts[1].strip()

            author_match = re.search(r'\[?@([^\]]+)\]?\([^\)]+\)?', right_part)
            if not author_match:
                author_match = re.search(r'@([^\s，,。.、！!？?；;：:）\)]+)', right_part)
            if not author_match:
                author_match = re.search(r'@([^\s（(]+)[（(]', right_part)
            if not author_match:
                author_match = re.search(r'^(.*?)于\s+', right_part)
                if author_match:
                    author = author_match.group(1).strip()
                else:
                    unmatched_titles.append(line)
                    continue
            else:
                author = author_match.group(1).strip()

            time_match = re.search(r'于\s+(.+?)(?:发起|开始|发布|创建|通告|$)', right_part)
            if not time_match:
                time_match = re.search(r'于\s+(.+)$', right_part)
            if not time_match:
                unmatched_titles.append(line)
                continue
            stime = time_match.group(1).strip()

            if deleted:
                status = "deleted"

            current_post = {
                "id": post_id,
                "title": title,
                "author": author,
                "stime": stime,
                "status": status,
                "httpsta": httpsta,
                "replies": []
            }
            in_post = True
            current_time = None

            if debug:
                print(f"[Post] {post_id}: {title} by {author} at {stime} ({status} {httpsta})")
            continue

        if re.search(r'###+', line) and not re.search(r'——.*于', line):
            unmatched_titles.append(line)

        # ---- 在帖子内处理回复 ----
        if in_post:
            time_match = time_pattern.search(line)
            if time_match:
                h, m, sec = time_match.groups()
                sec = sec if sec else "00"
                current_time = f"{h.zfill(2)}：{m.zfill(2)}：{sec.zfill(2)}"
                if debug:
                    print(f"  [Time] {current_time}")

            # ---- 处理以 > 开头的行 ----
            if line.startswith(">"):
                # 去除所有前导的 > 和空白字符（包括空格）
                reply_raw = re.sub(r'^[>\s]+', '', line)

                # 跳过纯时间标记行
                if re.match(r'^[（(]\d{1,2}[：:]\d{1,2}', reply_raw):
                    continue

                # 跳过被删除的行
                if reply_raw.startswith("~~"):
                    continue

                # 去掉行尾反斜杠
                reply_raw = re.sub(r'\\\s*$', '', reply_raw)

                if debug:
                    print(f"    [Cleaned] {reply_raw[:80]}...")

                # ---- 解析用户名、IP、发言内容 ----
                user_match = re.match(r'^([^（]+?)（IP 属地：([^）]+)）[：:][“"](.*)', reply_raw)
                if not user_match:
                    if debug:
                        print(f"    [Warning] 无法解析回复行: {reply_raw[:50]}...")
                    continue

                raw_username = user_match.group(1).strip()
                # 再次清理前导的 > 和空格（双重保险）
                raw_username = re.sub(r'^[>\s]+', '', raw_username)
                ip = user_match.group(2).strip()
                content_with_quotes = user_match.group(3).strip()

                if content_with_quotes.endswith('”') or content_with_quotes.endswith('"'):
                    content = content_with_quotes[:-1]
                else:
                    content = content_with_quotes

                content = re.sub(r'\s+', ' ', content).strip()

                tag, name = parse_username(raw_username)
                hfnid = hfnid_map.get(raw_username, None)

                reply_obj = {
                    "time": current_time if current_time else "00:00:00",
                    "text": content,
                    "tag": tag,
                    "name": name,
                    "ip": ip,
                    "hfnid": hfnid
                }
                current_post["replies"].append(reply_obj)

                if debug:
                    print(f"    [Reply] {raw_username} ({ip}): {content[:30]}...")

    if current_post:
        posts.append(current_post)

    if debug and unmatched_titles:
        print(f"\n⚠️ 以下 {len(unmatched_titles)} 行 ### 未能匹配：")
        for title_line in unmatched_titles:
            print(f"  {title_line}")

    return posts

# ---------- 4. 主程序 ----------
if __name__ == "__main__":
    debug = "--debug" in sys.argv
    args = [arg for arg in sys.argv[1:] if arg != "--debug"]

    md_file = args[0] if len(args) > 0 else "MYXD.md"
    wmxx_file = args[1] if len(args) > 1 else "WMXX.md"

    try:
        hfnid_map = load_hfnid_mapping(wmxx_file)
        print(f"📄 加载 HFNID 映射：{len(hfnid_map)} 个用户名")

        posts = extract_posts(md_file, hfnid_map, debug)
        print(f"📝 提取到 {len(posts)} 个帖子/视频/直播")

        output = {
            "posts": posts,
            "hfnid_map": hfnid_map
        }

        out_file = "forum_data.json"
        with open(out_file, "w", encoding="utf-8") as f:
            json.dump(output, f, ensure_ascii=False, indent=2)

        print(f"✅ 已保存至 {out_file}")

    except FileNotFoundError as e:
        print(f"❌ 文件未找到: {e}")