import os
import re
import csv
from pathlib import Path

def parse_timestamp(line):
    """从行中提取时间，支持 (HH:MM) 或 (HH:MM:SS)"""
    match = re.search(r'（(\d{1,2})[：:](\d{1,2})(?:[：:](\d{1,2}))?）', line)
    if match:
        h, m, s = match.group(1), match.group(2), match.group(3) if match.group(3) else "00"
        return f"{int(h):02d}:{int(m):02d}:{int(s):02d}"
    return None

def parse_dialogue(line):
    # 匹配带 IP 的：用户名（IP 属地：xxx）：“内容”
    m = re.match(r'^([^（(]+?)（IP 属地：([^）]+)）[：:]“(.+?)”', line)
    if m:
        return m.group(1).strip(), m.group(2).strip(), m.group(3).strip()
    # 匹配不带 IP 的：用户名：“内容”
    m = re.match(r'^([^：:]+)[：:]“(.+?)”', line)
    if m:
        return m.group(1).strip(), "", m.group(2).strip()
    return None, None, None

def parse_action(line):
    # 禁言操作
    m = re.search(r'\*（(.+?) 已被 (.+?) 禁言 (\d+)[：:]?(\d+)?.*?）\*', line)
    if m:
        target, actor, duration_min, duration_sec = m.group(1), m.group(2), m.group(3), m.group(4)
        dur = f"{duration_min}分钟" + (f"{duration_sec}秒" if duration_sec else "")
        return "ban", target, actor, dur
    # 关闭帖子
    m = re.search(r'\*（(.+?) 已关闭该帖子。）\*', line)
    if m:
        return "close", m.group(1), "", ""
    # 删除信息（带删除线的）
    m = re.search(r'~~(.+?)~~ \*（该信息已由 (.+?) 删除。）\*', line)
    if m:
        return "delete", m.group(1), m.group(2), ""
    return None, None, None, None

def parse_description(line):
    """解析纯动作描述，如（Shatelliti 笑了笑。）"""
    m = re.search(r'^（(.+?)）$', line.strip())
    if m:
        return m.group(1).strip()
    return None

def extract_drum_notes(line):
    """提取鼓谱：XXX YYY !X!X!X_X 等"""
    # 匹配连续的非空格字符，包含 X Y ! _
    pattern = r'[XY!_]+(?:_[XY!_]+)*'
    notes = re.findall(pattern, line)
    return notes

def main():
    input_file = "MYXD.md"
    output_csv = "timeline.csv"
    output_drum = "drum_notes.txt"

    if not Path(input_file).exists():
        print(f"错误：找不到 {input_file}")
        return

    rows = []
    drum_lines = []

    with open(input_file, "r", encoding="utf-8") as f:
        for raw_line in f:
            line = raw_line.rstrip("\n")
            if not line:
                continue

            # 1. 提取时间戳
            ts = parse_timestamp(line)
            # 如果没有时间戳，沿用上一个有效时间（可选，这里简单跳过无时间的行）
            if not ts:
                # 但鼓谱和操作可能没有独立时间，我们仍然记录但时间留空
                pass

            # 3. 对话
            speaker, ip, content = parse_dialogue(line)
            if speaker:
                rows.append([ts, "对话", speaker.replace(">", "").strip(), ip, content])
                continue

            # 4. 系统操作
            op_type, target, actor, detail = parse_action(line)
            if op_type:
                rows.append([ts, op_type, target, actor, detail])
                continue

            # 5. 动作描述
            desc = parse_description(line)
            if desc:
                rows.append([ts, "动作", "", "", desc])
                continue

            # 6. 其他行（普通叙述，可忽略或作为注释）
            rows.append([ts, "注释", "", "", line[:100]])

    # 写入 CSV
    with open("timeline.csv", "w", newline="", encoding="utf-8-sig") as f:
        writer = csv.writer(f)
        writer.writerow(["时间", "类型", "角色", "IP 属地", "内容"])
        writer.writerows(rows)

    os.system("color b")
    print(f"已生成 {output_csv}，共 {len(rows)} 行事件。")

if __name__ == "__main__":
    main()