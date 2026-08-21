from rich.progress import *
from rich.console import Console
import os
import time
import sys

cs = Console()

color = {
    "甲": "#00ff00", # Fabulous +
    "乙": "#98fb98", # Excellent
    "丙": "#20b2aa", # Good
    "丁": "#00ffff", # Decent
    "戊": "#0080ff", # Average
    "己": "#ba55d3", # Poor -
    "庚": "#dd20dd", # Serious -
    "辛": "#ff00ff", # Critical
    "壬": "#ff1493", # Nightmare
    "癸": "#ff0000", # Disaster -
    "DOWN": "#8b1a1a", # Down
    "error": "#8b1a1a",
    "inp": "#ffd700",
    "xz": "#00ff7f",
    "text": "#ffffff",
    "green": "#108010", 
    "blue": "#0000ff",
    "red": "#ff0000",
    "yellow": "#ffff00",
    "gold": "#ffd700",
    "orange": "#ffa500",
    "watergreen": "#7fffd4",
    "aqua": "#00bfff",
    "purple": "#800080",
    "darkred": "#8b0000",
    "darkgreen": "#006400",
    "lightblue": "#add8e6",
    "skyblue": "#87ceeb",
    "grey": "#808080",
    "lightgrey": "#d3d3d3",
    "pink": "#ffc0cb",
    "hotpink": "#ff69b4",
    "brown": "#a52a2a",
    "tea": "#d2b48c",
    "lavender": "#e6e6fa",
    "navy": "#000080",
    "olive": "#808000",
    "lime": "#30ff30",
    "magenta": "#ff00ff",
    "cyan": "#00ffff",
    "crimson": "#dc143c",
    "coral": "#ff7f50",
    "teal": "#008080",
    "plum": "#dda0dd",
    "salmon": "#fa8072",
    "turquoise": "#40e0d0",
    "chtreuse": "#7fff00",
    "dodgerblue": "#1e90ff",
    "mediumseagreen": "#3cb371",
    "firebrick": "#b22222",
    "silver": "#c0c0c0",
    "dimgray": "#696969",
    "limegreen": "#32cd32",
    "royalblue": "#4169e1",
}

def output_structure(text, cl, bl):
    if not isinstance(text, str):
        text = str(text)

    if cl == "甲":
        cl = "甲"
    elif cl == "乙":
        cl = "乙"
    elif cl == "丙":
        cl = "丙"
    elif cl == "丁":
        cl = "丁"
    elif cl == "戊":
        cl = "戊"
    elif cl == "己":
        cl = "己"
    elif cl == "庚":
        cl = "庚"
    elif cl == "辛":
        cl = "辛"
    elif cl == "壬":
        cl = "壬"
    elif cl == "癸":
        cl = "癸"
    elif cl == "DOWN":
        cl = "DOWN"
    elif cl == "error":
        cl = "错误"
    elif cl == "inp":
        cl = "输入"
    elif cl == "xz":
        cl = "选择"
    else:
        cl = "文字"

    return (f"[{cl}] {text}" if bl else text)

def cl_print(text, cl, e):
    text = output_structure(text, cl, False)
    cs.print(text, style=color[cl], end=e)
    
def zf(text, cl):
    text = output_structure(text, cl, True)

    for i in text:
        cs.print(i, style=color[cl], end="")
        time.sleep(0.003)
    if cl == "inp" or cl == "error" or cl == "xz":
        return input()
    else:
        os.system("pause > nul")
        print()
        return

def xz(text, array):
    ls_str = ""
    for i in range(len(array)):
        ls_str += f"（{i+1}） {array[i]}　"
    try:
        return zf(fr"""{text}
{ls_str}
\/ """, "xz")
    except:
        return False

"""
rejected

def jdt(current, total, ch, typ, srt, unit, bw = 100):
    column = [
        TextColumn("{task.description}"),
        BarColumn(bar_width=bw),
        TaskProgressColumn(text_format="{task.percentage:.3f}%"),
    ]
    with Progress(*column) as progress:
        t_color = ""
        if srt == "up":
            if current >= 0.9 * total:
                t_color = "甲"
            elif 0.8 * total <= current < 0.9 * total:
                t_color = "乙"
            elif 0.7 * total <= current < 0.8 * total:
                t_color = "丙"
            elif 0.6 * total <= current < 0.7 * total:
                t_color = "丁"
            elif 0.5 * total <= current < 0.6 * total:
                t_color = "戊"
            elif 0.4 * total <= current < 0.5 * total:
                t_color = "己"
            elif 0.3 * total <= current < 0.4 * total:
                t_color = "庚"
            elif 0.2 * total <= current < 0.3 * total:
                t_color = "辛"
            elif 0.1 * total <= current < 0.2 * total:
                t_color = "壬"
            elif 0 <= current < 0.1 * total:
                t_color = "癸"
            else:
                t_color = "DOWN"
        elif srt == "down":
            if current >= 0.9 * total:
                t_color = "癸"
            elif 0.8 * total <= current < 0.9 * total:
                t_color = "壬"
            elif 0.7 * total <= current < 0.8 * total:
                t_color = "辛"
            elif 0.6 * total <= current < 0.7 * total:
                t_color = "庚"
            elif 0.5 * total <= current < 0.6 * total:
                t_color = "己"
            elif 0.4 * total <= current < 0.5 * total:
                t_color = "戊"
            elif 0.3 * total <= current < 0.4 * total:
                t_color = "丁"
            elif 0.2 * total <= current < 0.3 * total:
                t_color = "丙"
            elif 0.1 * total <= current < 0.2 * total:
                t_color = "乙"
            elif 0 <= current < 0.1 * total:
                t_color = "甲"
            else:
                t_color = "DOWN"

        column.append(TextColumn(f"[{color[t_color]}][{t_color}] {ch} {typ.upper()}： {current:.3f} {unit} / {total:.3f} {unit}。"))
        task = progress.add_task("", total=total)
        progress.update(task, completed=current)
        progress.console.print(f"[{color[t_color]}][{t_color}] {ch} {typ.upper()}： {current:.3f} {unit} / {total:.3f} {unit}。")
"""