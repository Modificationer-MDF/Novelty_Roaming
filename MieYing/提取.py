import re
import json
import sys

def clean_text(text):
    text = re.sub(r"\[([^\]]+)\]\([^\)]+\)", r"\1", text)
    text = re.sub(r"~~([^~]+)~~", r"\1", text)
    text = re.sub(r"\*\*([^\*]+)\*\*", r"\1", text)
    text = re.sub(r"\*([^\*]+)\*", r"\1", text)
    text = re.sub(r"\s+", " ", text).strip()
    return text

def extract_dialogs(filepath, debug=False):
    with open(filepath, "r", encoding="utf-8") as f:
        lines = f.readlines()

    date_pattern = r'（(\d{4}) 年 (\d{1,2}) 月 (\d{1,2}) 日 (\d{1,2})[：:](\d{1,2})(?:[：:](\d{2}))?）'
    time_pattern = r'（(\d{1,2})[：:](\d{1,2})(?:[：:](\d{2}))?）'
    # 匹配用户名（IP 属地：XXX）：“发言内容”
    # 兼容引号：中文左“ ”或英文双引号"
    user_pattern = r"([^（]+?)（IP 属地：([^）]+)）[：:][“\"](.*?)(?<!\\)[”\"]"

    data = []
    current_date = None
    current_time = None
    current_user = None
    current_ip = None
    current_content = ""
    in_multiline = False

    for raw_line in lines:
        # 处理以 > 开头的行（允许 > 后有0或1个空格）
        if not raw_line.lstrip().startswith(">"):
            if in_multiline and current_user:
                if current_date and current_time:
                    data.append({
                        "inf": clean_text(current_content),
                        "ip": current_ip,
                        "time": f"{current_date}，{current_time}"
                    })
                current_content = ""
                in_multiline = False
            continue

        # 去掉行首的 > 和可能的空格
        line = raw_line.lstrip()
        if line.startswith(">"):
            line = line[1:].lstrip()
        # 去掉行尾的反斜杠（Markdown 换行符）
        line = re.sub(r"\\\s*$", "", line)

        if debug:
            print(f"Processing: {line[:50]}...")

        # 1. 匹配完整日期
        date_match = re.search(date_pattern, line)
        if date_match:
            y, mon, d, h, m, sec = date_match.groups()
            sec = sec if sec else "00"
            current_date = f"{y}/{mon.zfill(2)}/{d.zfill(2)}"
            current_time = f"{h.zfill(2)}：{m.zfill(2)}：{sec.zfill(2)}"
            if debug:
                print(f"  -> Date set to {current_date} {current_time}")

        # 2. 匹配纯时间
        time_match = re.search(time_pattern, line)
        if time_match and not date_match:
            h, m, sec = time_match.groups()
            sec = sec if sec else "00"
            current_time = f"{h.zfill(2)}：{m.zfill(2)}：{sec.zfill(2)}"
            if debug:
                print(f"  -> Time set to {current_time}")

        # 3. 匹配用户发言
        user_match = re.search(user_pattern, line)
        if user_match:
            # 如果有未保存的跨行发言，先保存
            if in_multiline and current_user:
                if current_date and current_time:
                    data.append({
                        "inf": clean_text(current_content),
                        "ip": current_ip,
                        "time": f"{current_date}，{current_time}"
                    })
                current_content = ""
                in_multiline = False

            current_user = user_match.group(1).strip()
            current_ip = user_match.group(2).strip()
            content = user_match.group(3).strip()

            if debug:
                print(f"  -> Found user: {current_user}, IP: {current_ip}, Content: {content[:30]}...")

            # 检查发言是否完整结束（以右引号结尾）
            # 因为我们用了 (.*?)(?<!\\)[”\"] 非贪婪匹配，所以 content 已经不含结尾引号
            # 但如果有跨行，content 可能以换行结尾？实际上我们按行处理，所以只有当前行内容。
            # 判断是否跨行：如果 content 末尾没有右引号且后面没有紧跟着右引号（由于匹配已经吃掉），我们检查原始 raw_content
            raw_content = user_match.group(3)
            if raw_content.endswith("”") or raw_content.endswith('"'):
                # 完整单行发言
                current_content = content
                if current_date and current_time:
                    data.append({
                        "inf": clean_text(current_content),
                        "ip": current_ip,
                        "time": f"{current_date}，{current_time}"
                    })
                current_content = ""
                in_multiline = False
            else:
                # 跨行开头
                current_content = content
                in_multiline = True
            continue

        # 4. 如果处于跨行模式，追加内容
        if in_multiline:
            # 检查这一行是否以右引号结尾（标志发言结束）
            if line.endswith("”") or line.endswith('"'):
                current_content += " " + line[:-1]
                if current_date and current_time:
                    data.append({
                        "inf": clean_text(current_content),
                        "ip": current_ip,
                        "time": f"{current_date}，{current_time}"
                    })
                current_content = ""
                in_multiline = False
            else:
                current_content += " " + line

    # 文件末尾如果有未保存的跨行发言
    if in_multiline and current_user and current_date and current_time:
        data.append({
            "inf": clean_text(current_content),
            "ip": current_ip,
            "time": f"{current_date}，{current_time}"
        })

    return data

if __name__ == "__main__":
    args = [arg for arg in sys.argv[1:] if arg != "--debug"]
    input_file = args[0] if args else "MYXD.md"
    debug = "--debug" in sys.argv

    try:
        result = extract_dialogs(input_file, debug)
        output_file = "extracted_dialogs.json"
        with open(output_file, "w", encoding="utf-8") as f:
            json.dump(result, f, ensure_ascii=False, indent=2)
        print(f"提取了 {len(result)} 条发言，已保存至 {output_file}。")
    except FileNotFoundError:
        print(f"未找到 {input_file} 文件，请确认路径是否正确。")