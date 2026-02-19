# -*- coding: utf-8 -*-
# Mosha Comb 2025 ~ 2026。
from random import *
from rich.progress import *
from rich.console import Console
import os
import time
import sys
import math
import keyboard as kb
import queue
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
    "倒下": "#8b1a1a", # Down
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
    "gray": "#808080",
    "lightgray": "#d3d3d3",
    "pink": "#ffc0cb",
    "hotpink": "#ff69b4",
    "brown": "#a52a2a",
    "tea": "#d2b48c",
    "lavender": "#e6e6fa",
    "navy": "#000080",
    "olive": "#808000",
    "lime": "#30ff30",
    "magenta": "#ff00ff",
}

z_x = []
z_y = []

d_x = []
d_y = []

class Z: # 角色属性。
    def __init__(self, hp, thp, name, atk, crit, fy, jc, exist, zdz, jz, dizzy):
        self.hp = hp # 角色 HP。
        self.thp = thp # 角色总 HP。
        self.name = name # 角色名称。
        self.atk = atk # 角色攻击力。
        self.crit = crit # 角色暴击率。
        self.fy = fy # 角色防御力。
        self.jc = jc # 角色 JC。
        self.exist = exist # 角色是否存活。
        self.zdz = zdz # 角色在与谁战斗？
        self.jz = jz # 角色被停止活动的回合数。
        self.dizzy = dizzy # 角色是否眩晕。

class D: # 敌人属性。
    def __init__(self, hp, thp, name, atk, crit, fy, jc, exist, zdz, jz, dizzy):
        self.hp = hp # 敌人 HP。
        self.thp = thp # 敌人总 HP。
        self.name = name # 敌人名称。
        self.atk = atk # 敌人攻击力。
        self.crit = crit # 敌人暴击率。
        self.fy = fy # 敌人防御力。
        self.jc = jc # 敌人 JC。
        self.exist = exist # 敌人是否存活。
        self.zdz = zdz # 敌人在与谁战斗？
        self.jz = jz # 敌人被停止活动的回合数。
        self.dizzy = dizzy # 敌人是否眩晕。

dx = [-1, 1, 0, 0]
dy = [0, 0, -1, 1]

def output_structure(text, cl, bl):
    if not isinstance(text, str):
        text = str(text)

    match cl:
        case "甲":
            cl = "甲"
        case "乙":
            cl = "乙"
        case "丙":
            cl = "丙"
        case "丁":
            cl = "丁"
        case "戊":
            cl = "戊"
        case "己":
            cl = "己"
        case "庚":
            cl = "庚"
        case "辛":
            cl = "辛"
        case "壬":
            cl = "壬"
        case "癸":
            cl = "癸"
        case "倒下":
            cl = "倒下"
        case "error":
            cl = "错误"
        case "inp":
            cl = "输入"
        case "xz":
            cl = "选择"
        case _:
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

def jdt(current, total, char, typ, side): 
    # current：当前值；total：总值；char：角色；typ：属性；side：阵营。
    column = [
        TextColumn("{task.description}"),
        BarColumn(bar_width=qj_bw),
        TaskProgressColumn(text_format="{task.percentage:.3f}%"),
    ]
    with Progress(*column) as progress:
        t_color: str = ""
        if side == "me" and typ == "hp":
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
                t_color = "倒下"
        elif side == "me" and typ == "energy":
            if current > total:
                t_color = "戊"
            elif 0.8 * total <= current <= total:
                t_color = "己"
            elif 0.6 * total <= current < 0.8 * total:
                t_color = "庚"
            elif 0.4 * total <= current < 0.6 * total:
                t_color = "辛"
            elif 0.2 * total <= current < 0.4 * total:
                t_color = "壬"
            elif 0 <= current < 0.2 * total:
                t_color = "癸"
            else:
                t_color = "倒下"
        elif side == "enemy" and typ == "hp":
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
                t_color = "倒下"
        elif side == "enemy" and typ == "energy":
            if current > total:
                t_color = "癸"
            elif 0.8 * total <= current <= total:
                t_color = "壬"
            elif 0.6 * total <= current < 0.8 * total:
                t_color = "辛"
            elif 0.4 * total <= current < 0.6 * total:
                t_color = "庚"
            elif 0.2 * total <= current < 0.4 * total:
                t_color = "己"
            elif 0 <= current < 0.2 * total:
                t_color = "戊"
            else:
                t_color = "倒下"

        column.append(TextColumn(f"[{color[t_color]}][{t_color}] {char} {typ.upper()}： {current:.3f} / {total:.3f}。"))
        task = progress.add_task("", total=total)
        progress.update(task, completed=current)
        progress.console.print(f"[{color[t_color]}][{t_color}] {char} {typ.upper()}： {current:.3f} / {total:.3f}。")

def zs(var, p, q):
    while True:
        try:
            var = int(var)
            if p <= var <= q:
                return var
            else:
                raise ValueError(f"无效输入。请输入一个在 {p} 和 {q} 之间的数字")
        except Exception as e:
            var = zf("请重新输入一个整数：", "error")

def fd(var, p, q):
    while True:
        try:
            var = float(var)
            if math.isinf(var):
                raise ValueError("不可以输入无穷大。")
            if p <= var <= q:
                return var
            else:
                raise ValueError(f"无效输入。请输入一个在 {p} 和 {q} 之间的数字")
        except Exception as e:
            var = zf("请重新输入一个浮点数：", "error")

def mz(me, enemy):
    global fz_lsstring, ls_range

    os.system("cls")
    print("瞄准测试")
    print(fr"""      攻方                                防方""")
    cl_print(f"""      {me}                               {enemy}""", "yellow", "")
    print(r"""
    -----                                   -----            
  --      --                              --      --
    -----                                   -----
    // || \\                                // || \\
//  ||  \\   |￣￣￣￣￣￣￣￣￣￣|     //  ||  \\ 
\\  ||   ————|                    |————//   ||  //
    ||                                      ||
    // || \\                                // || \\
//  ||  \\                              //  ||  \\
//   ||   \\                            //   ||   \\
""")
    print("按下 Z 键攻击。")
    ls_string = list("×××..................^^*****^^...............××××××")
    fz_lsstring = ls_string[:]
    ls_range = len(ls_string)
    pressed = False

    sys.stdout.write("".join(ls_string))
    sys.stdout.flush()

    mz_order = randint(0, 1)

    if mz_order:
        l = 0
        for i in range(ls_range):
            if l > 0:
                ls_string[l - 1] = "."
            ls_string[l] = "|"

            sys.stdout.write("\r" + "".join(ls_string))
            sys.stdout.flush()

            l = (l + 1) % ls_range
            time.sleep(0.025)

            if kb.is_pressed("z"):
                pressed = True
                break
    else:
        ls_string = ls_string[::-1]
        l = ls_range - 1
        for j in range(ls_range - 1, -1, -1):
            if l < ls_range - 1:
                ls_string[l + 1] = "."
            ls_string[l] = "|"

            sys.stdout.write("\r" + "".join(ls_string))
            sys.stdout.flush()

            l = (l - 1) % ls_range
            time.sleep(0.025)

            if kb.is_pressed("z"):
                pressed = True
                break
            elif kb.is_pressed("esc"):
                zf("即将退出。", "text")
                return False

    if pressed == False:
        l = 0

    acc = (100 - abs(l - ls_range / 2))
    print()
    zf(f"精准度：{acc}%（{l}）", "text")

if __name__ == "__main__":
    while True:
        a = mz("角色", "敌人")
        if a == False:
            sys.exit(0)
        b = mz("敌人", "角色")
        if b == False:
            sys.exit(0)