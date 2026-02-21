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
}

z_x = []
z_y = []

d_x = []
d_y = []

class Z: # 角色属性。
    def __init__(self, hp, thp, energy, tenergy, name, atk, crit, fy, jc, exist, zdz, jz, dizzy):
        self.hp = hp # 角色 HP。
        self.thp = thp # 角色总 HP。
        self.energy = energy # 角色精力。
        self.tenergy = tenergy # 角色总精力。
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
    def __init__(self, hp, thp, energy, tenergy, name, atk, crit, fy, jc, exist, zdz, jz, dizzy):
        self.hp = hp # 敌人 HP。
        self.thp = thp # 敌人总 HP。
        self.energy = energy # 敌人精力。
        self.tenergy = tenergy # 敌人总精力。
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

def gj(z_ord, d_ord): # z_ord：被抓角色，d_ord：抓角色的看守者。
    def simul_check():
        global player_existing, monitor_existing
        # 检查敌人状态。
        if d_sx[d_ord].hp <= 0:
            zf(f"{d_sx[d_ord].name} 败下阵来。", "甲")
            monitor_existing -= 1
            d_sx[d_ord].exist = False
            d_sx[d_ord].zdz = -1
            z_sx[z_ord].zdz = -1
            maze[d_x[d_ord]][d_y[d_ord]] = f"| . |"
            maze[z_x[z_ord]][z_y[z_ord]] = f"| Z - {z_ord} |"
            return False

        # 检查角色状态。
        if z_sx[z_ord].hp <= 0:
            zf(f"{z_sx[z_ord].name} 败下阵来。", "癸")
            player_existing -= 1
            z_sx[z_ord].exist = False
            d_sx[d_ord].zdz = -1
            z_sx[z_ord].zdz = -1
            maze[z_x[z_ord]][z_y[z_ord]] = f"| . |"
            maze[d_x[d_ord]][d_y[d_ord]] = f"| D - {d_ord} |"
            return False

        return True

    z_acc = 0  # 我方打击精准度。
    d_acc = 0  # 敌方打击精准度。
    z_damage = 0  # 角色对敌人造成的伤害。
    d_damage = 0  # 被选中的敌人对角色造成的伤害。
    z_check = 0
    d_check = 0

    z_check = z_sx[z_ord].jc * 3.306 - z_sx[z_ord].fy
    d_check = d_sx[d_ord].jc * 3.306 - d_sx[d_ord].fy

    print("初始状态。")
    jdt(z_sx[z_ord].hp, z_sx[z_ord].thp, f"{z_sx[z_ord].name}", "hp", "me")
    jdt(d_sx[d_ord].hp, d_sx[d_ord].thp, f"{d_sx[d_ord].name}", "hp", "enemy")
    input()

    z_damage = randint(6, 9) + z_sx[z_ord].atk
    z_acc = mz(z_sx[z_ord].name, d_sx[d_ord].name)
    print()
    if fz_lsstring[z_acc] == "*":
        zf(f"{z_sx[z_ord].name} 打出了暴击！", "乙")
        z_damage *= (1 + (z_sx[z_ord].crit - abs(5 - z_acc) / 50) / 10)
    elif fz_lsstring[z_acc] == "^":
        zf(f"{z_sx[z_ord].name} 打出了精准的一招。", "丙")
        z_damage *= (1 + (z_sx[z_ord].atk - abs(5 - z_acc) / 40) / 10)
    elif fz_lsstring[z_acc] == ".":
        zf(f"{z_sx[z_ord].name} 未能精准命中。", "壬")
        z_damage *= (1 - abs(5 - z_acc) / 30)
    elif fz_lsstring[z_acc] == "×" or not z_acc:
        zf(f"{z_sx[z_ord].name} 落空了。", "癸")
        z_damage = 0
    print()
    if d_check <= 0:
        z_damage = 0
    z_damage *= (d_check / 10) * uniform(0.95, 1.05)
    zf(f"{z_sx[z_ord].name} 对 {d_sx[d_ord].name} 造成了 {max(abs(z_damage), 0):.3f} HP 伤害。", "text")
    d_sx[d_ord].hp -= z_damage
    print()
    jdt(d_sx[d_ord].hp, d_sx[d_ord].thp, f"{d_sx[d_ord].name}", "hp", "enemy")
    input()
    if simul_check() == False:
        return

    d_damage = randint(6, 9) + d_sx[d_ord].atk
    d_acc = mz(d_sx[d_ord].name, z_sx[z_ord].name)
    print()
    if fz_lsstring[d_acc] == "*":
        zf(f"{d_sx[d_ord].name} 打出了暴击！", "壬")
        d_damage*= (1 + (d_sx[d_ord].atk - abs(5 - d_acc) / 50) / 10)
    elif fz_lsstring[d_acc] == "^":
        zf(f"{d_sx[d_ord].name} 打出了精准的一招。", "辛")
        d_damage *= (1 + (d_sx[d_ord].crit - abs(5 - d_acc) / 40) / 10)
    elif fz_lsstring[d_acc] == ".":
        zf(f"{d_sx[d_ord].name} 未能精准命中。", "乙")
        d_damage *= (1 - abs(5 - d_acc) / 30)
    elif fz_lsstring[d_acc] == "×" or d_acc == 0:
        zf(f"{d_sx[d_ord].name} 落空了。", "甲")
        d_damage = 0
    print()
    if z_check <= 0:
        d_damage = 0
    d_damage *= (z_check / 10) * uniform(0.95, 1.05)
    zf(f"{d_sx[d_ord].name} 对 {z_sx[z_ord].name} 造成了 {max(abs(d_damage), 0):.3f} HP 伤害。", "text")
    z_sx[z_ord].hp -= d_damage
    print()
    jdt(z_sx[z_ord].hp, z_sx[z_ord].thp, f"{z_sx[z_ord].name}", "hp", "me")
    input()
    if simul_check() == False:
        return

    os.system("cls")
    if simul_check():
        print("结束状态。")
        jdt(z_sx[z_ord].hp, z_sx[z_ord].thp, f"{z_sx[z_ord].name}", "hp", "me")
        jdt(d_sx[d_ord].hp, d_sx[d_ord].thp, f"{d_sx[d_ord].name}", "hp", "enemy")
        os.system("pause")
    else:
        return

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

    if pressed == False:
        l = 0

    return l

if __name__ == "__main__":
    os.system("cls")

    zf("…………", "aqua")
    maze_size = zs(zf("矩阵规模？（k × k 的正方形）", "inp"), 5, 20)
    qj_bw = zf("进度条宽度（默认 60）？", "inp")
    try:
        if qj_bw == "" or 25 <= int(qj_bw) <= 125:
            qj_bw = 60
    except:
        qj_bw = 60

    while True:
        print()
        zf("…………", "aqua")
        z_amount = zs(zf("我方数量？", "inp"), 1, float("inf"))

        print()
        zf("…………", "aqua")
        d_amount = zs(zf("看守者数量？", "inp"), 1, float("inf"))

        if z_amount + d_amount >= maze_size * maze_size:
            zf("人数过多！重新输入！", "error")
        else:
            break       

    z_sx = [
        Z(0, 0, 0, 0, f"Z - {i}", randint(1, 14), uniform(0.1, 0.9), randint(1, 14), randint(9, 17), True, -1, 0, False)
        for i in range(z_amount)
    ]

    d_sx = [
        D(0, 0, 0, 0, f"D - {i}", randint(1, 14), uniform(0.1, 0.9), randint(1, 14), randint(9, 17), True, -1, 0, False)
        for i in range(d_amount)
    ]

    print()
    zf("…………", "aqua")

    sf_zwz = xz("是否使用随机生成的起始位置？", ["是。", "否。"])
    sf_zhp = xz("是否使用随机生成的 HP？（范围在 30 到 999 之间）", ["是。", "否。"])
    sf_zenergy = xz("是否使用随机生成的精力？（范围在 5 到 59 之间）", ["是。", "否。"])
    
    for i in range(z_amount):
        if sf_zhp == "1":
            z_sx[i].thp = randint(30, 999)
        else:
            if z_amount == 1:
                if sf_zwz != "1":
                    z_x.append(zs(zf("角色起始纵坐标？（X 从 0 开始）", "inp"), 0, maze_size - 1))
                    z_y.append(zs(zf("角色起始横坐标？（Y 从 0 开始）", "inp"), 0, maze_size - 1))
                else:
                    while True:
                        ls_zhp1 = zs(zf("角色起始 HP？", "inp"), 1, float("inf"))
                        if ls_zhp1 < 30 or ls_zhp1 > 999:
                            ls_rsp1 = zf("建议将 HP 设置在 30 到 999 之间。如无需更改，请按下 1。", "inp")
                            if ls_rsp1 == "1":
                                break
                        else:
                            break
            else:
                if sf_zwz != "1":
                    z_x.append(zs(zf(f"第 {i + 1} 位角色的起始纵坐标？（X 从 0 开始）", "inp"), 0, maze_size - 1))
                    z_y.append(zs(zf(f"第 {i + 1} 位角色的起始横坐标？（Y 从 0 开始）", "inp"), 0, maze_size - 1))
                else:
                    while True:
                        ls_zhp2 = zs(zf("角色起始 HP？", "inp"), 1, float("inf"))
                        if ls_zhp2 < 30 or ls_zhp2 > 999:
                            ls_rsp2 = zf("建议将 HP 设置在 30 到 999 之间。如无需更改，请按下 1。", "inp")
                            if ls_rsp2 == "1":
                                break
                        else:
                            break
        
        z_sx[i].hp = z_sx[i].thp        

    for j in range(z_amount):
        if sf_zenergy == "1":
            z_sx[j].tenergy = randint(5, 59)
        else:
            while True:
                if z_amount == 1:
                    ls_zenergy = zs(zf("角色起始精力？", "inp"), 1, float("inf"))
                else:
                    ls_zenergy = zs(zf(f"第 {j + 1} 位角色的起始精力？", "inp"), 1, float("inf"))
                
                if ls_zenergy < 5 or ls_zenergy > 59:
                    ls_rsp3 = zf("建议将精力设置在 5 到 59 之间。如无需更改，请按下 1。", "inp")
                    if ls_rsp3 == "1":
                        break
                else:
                    break        

        z_sx[j].energy = z_sx[j].tenergy

    print()
    zf("…………", "aqua")
    sf_dhp = xz("是否使用随机生成的看守者 HP？（范围在 30 到 999 之间）", ["是。", "否。"])
    sf_denergy = xz("是否使用随机生成的看守者精力？（范围在 5 到 59 之间）", ["是。", "否。"])
    
    for j in range(d_amount):
        if sf_dhp == "1":
            d_sx[j].thp = randint(30, 999)
        else:
            if d_amount == 1:
                d_sx[j].thp = zs(zf("看守者起始 HP？", "inp"), 1, float("inf"))
            else:
                d_sx[j].thp = zs(zf(f"第 {j + 1} 位看守者的起始 HP？", "inp"), 1, float("inf"))
        d_sx[j].hp = d_sx[j].thp

    for k in range(d_amount):
        if sf_denergy == "1":
            d_sx[k].tenergy = randint(5, 59)
        else:
            if d_amount == 1:
                d_sx[k].tenergy = zs(zf("看守者起始精力？", "inp"), 1, float("inf"))
            else:
                d_sx[k].tenergy = zs(zf(f"第 {k + 1} 位看守者的起始精力？", "inp"), 1, float("inf"))
        d_sx[k].energy = d_sx[k].tenergy
    os.system("cls")

    if sf_zwz == "1":
        for ls in range(z_amount): # 随机分配角色的位置。
            ls_zx = randint(0, maze_size - 1)
            ls_zy = randint(0, maze_size - 1)
            z_x.append(ls_zx)
            z_y.append(ls_zy)

    for ls in range(d_amount): # 随机分配监视者的位置。
        ls_dx = randint(0, maze_size - 1)
        ls_dy = randint(0, maze_size - 1)
        d_x.append(ls_dx)
        d_y.append(ls_dy)
        
    player_step = 0
    maze = [["| . |" for i in range(maze_size)] for j in range(maze_size)]

    for h in range(z_amount):
        for i in range(maze_size):
            for j in range(maze_size):
                if i == z_x[h] and j == z_y[h] and z_sx[h].exist:
                    if "Z" in maze[i][j] or "D" in maze[i][j]:
                        maze[i][j] = maze[i][j][:-2] + f", Z - {h} |"
                    elif maze[i][j] == "| . |":
                        maze[i][j] = f"| Z - {h} |"

    for l in range(d_amount):
        for m in range(maze_size):
            for n in range(maze_size):
                if m == d_x[l] and n == d_y[l] and d_sx[l].exist:
                    if "D" in maze[m][n] or "Z" in maze[m][n]:
                        maze[m][n] = maze[m][n][:-2] + f", D - {l} |"
                    elif maze[m][n] == "| . |":
                        maze[m][n] = f"| D - {l} |"

    o_amount = randint(0, math.floor(math.sqrt(abs(maze_size ** 1.5 - z_amount - d_amount)))) # 障碍物总量。
    o_x = [] # 障碍物 X 坐标列表。
    o_y = [] # 障碍物 Y 坐标列表。

    w_amount = randint(0, math.floor(math.sqrt(abs(maze_size ** 1.5 - z_amount + d_amount)))) # 水洼总量。
    w_x = [] # 水洼 X 坐标列表。
    w_y = [] # 水洼 Y 坐标列表。

    r_amount = randint(0, math.floor((o_amount + w_amount) * uniform(0.3, 0.6))) # 随机事件格数量。
    r_x = [] # 随机事件格 X 坐标列表。
    r_y = [] # 随机事件格 Y 坐标列表。

    e_amount = round(math.sqrt(maze_size ** 2 / 21))
    e_x = []
    e_y = []

    for i in range(o_amount):
        while True:
            ls_ox = randint(0, maze_size - 1)
            ls_oy = randint(0, maze_size - 1)
            if maze[ls_ox][ls_oy] == "| . |":
                o_x.append(ls_ox)
                o_y.append(ls_oy)
                break

    for i in range(w_amount):
        while True:
            ls_wx = randint(0, maze_size - 1)
            ls_wy = randint(0, maze_size - 1)
            if maze[ls_wx][ls_wy] == "| . |":
                w_x.append(ls_wx)
                w_y.append(ls_wy)
                break

    for i in range(r_amount):
        while True:
            ls_rx = randint(0, maze_size - 1)
            ls_ry = randint(0, maze_size - 1)
            if maze[ls_rx][ls_ry] == "| . |":
                r_x.append(ls_rx)
                r_y.append(ls_ry)
                break

    for i in range(e_amount):
        while True:
            ls_ex = randint(0, maze_size - 1)
            ls_ey = randint(0, maze_size - 1)
            if maze[ls_ex][ls_ey] == "| . |":
                e_x.append(ls_ex)
                e_y.append(ls_ey)
                break

def random_event(side, num):
    def hp_recover():
        if side == "z":
            hp_recover = uniform(0.1, 0.3) * math.sqrt(z_sx[num].thp * randint(9, 15))
            z_sx[num].hp += hp_recover
            zf(f"Z - {num} 恢复了 {hp_recover:.3f} HP。", "甲" if z_sx[num].hp > z_sx[num].thp else "乙")
            jdt(z_sx[num].hp, z_sx[num].thp, f"Z - {num}", "hp", "me")
        elif side == "d":
            hp_recover = uniform(0.1, 0.3) * math.sqrt(d_sx[num].thp * randint(9, 15))
            d_sx[num].hp += hp_recover
            zf(f"D - {num} 恢复了 {hp_recover:.3f} HP。", "癸" if d_sx[num].hp > d_sx[num].thp else "壬")
            jdt(d_sx[num].hp, d_sx[num].thp, f"D - {num}", "hp", "enemy")
        os.system("pause > nul")

    def energy_recover():
        if side == "z":
            energy_recover = uniform(0.1, 0.3) * math.sqrt(z_sx[num].tenergy * randint(9, 15))
            z_sx[num].energy += energy_recover
            zf(f"Z - {num} 的精力恢复了 {energy_recover:.3f}。", "甲" if z_sx[num].energy > z_sx[num].tenergy else "乙")
            jdt(z_sx[num].energy, z_sx[num].tenergy, f"Z - {num}", "energy", "me")
        elif side == "d":
            energy_recover = uniform(0.1, 0.3) * math.sqrt(d_sx[num].tenergy * randint(9, 15))
            d_sx[num].energy += energy_recover
            zf(f"D - {num} 的精力恢复了 {energy_recover:.3f}。", "癸" if d_sx[num].energy > d_sx[num].tenergy else "壬")
            jdt(d_sx[num].energy, d_sx[num].tenergy, f"D - {num}", "energy", "enemy")
        os.system("pause > nul")

    global o_amount, w_amount
    event_type = randint(1, 7)
    match event_type:
        case 1: # 恢复 HP。
            hp_recover()
        case 2: # 增加攻击力。
            if side == "z":
                atk_increase = randint(1, 5)
                zf(f"Z - {num} 增加了 {atk_increase} 点攻击力。", "丙")
                z_sx[num].atk += atk_increase
            elif side == "d":
                atk_increase = randint(1, 5)
                zf(f"D - {num} 增加了 {atk_increase} 点攻击力。", "辛")
                d_sx[num].atk += atk_increase
        case 3: # 增加防御力。
            if side == "z":
                fy_increase = randint(1, 5)
                zf (f"Z - {num} 增加了 {fy_increase} 点防御力。", "丙")
                z_sx[num].fy += fy_increase
            elif side == "d":
                fy_increase = randint(1, 5)
                zf (f"D - {num} 增加了 {fy_increase} 点防御力。", "辛")
                d_sx[num].fy += fy_increase
        case 4: # 淘汰一名敌人或角色。
            ls_dord = randint(0, d_amount - 1)
            ls_zord = randint(0, z_amount - 1)
            if randint(1, 9) <= 3:
                ls_opt = [randint(0, 1), randint(0, 1)] # 0：淘汰一名敌人；1：淘汰一名角色。
                if ls_opt[0] == 1 or ls_opt[1] == 0 and side == "z":
                    while True:
                        if d_sx[ls_dord].exist:
                            d_sx[ls_dord].exist = False
                            d_sx[ls_dord].zdz = -1
                            maze[d_x[ls_dord]][d_y[ls_dord]] = f"| . |"
                            zf(f"D - {ls_dord} 突然消失了！", "甲")
                            break
                elif ls_opt[0] == 0 or ls_opt[1] == 1 and side == "d":
                    while True:
                        if z_sx[ls_zord].exist:
                            z_sx[ls_zord].exist = False
                            z_sx[ls_zord].zdz = -1
                            maze[z_x[ls_zord]][z_y[ls_zord]] = f"| . |"
                            zf(f"Z - {ls_zord} 突然消失了！", "癸")
                            break
            else:
                if side == "z":
                    d_sx[ls_dord].jz = 2
                    zf(f"D - {ls_dord} 遭眩晕，停止活动一回合！", "乙")
                elif side == "d":
                    z_sx[ls_zord].jz = 2
                    zf(f"Z - {ls_zord} 遭眩晕，停止活动一回合！", "壬")
        case 5: # 障碍物消失或恢复部分 HP / 精力。
            if o_amount == 0:
                ls_diso = randint(1, o_amount)
                o_amount = max(0, o_amount - ls_diso)
                zf(f"放眼望去，地图上消失了 {ls_diso} 个障碍物！", "丁")
            else:
                hp_recover() if randint(1, 2) == 1 else energy_recover()
        case 6: # 水洼消失或恢复部分 HP / 精力。
            if w_amount == 0:
                ls_disw = randint(1, w_amount)
                w_amount = max(0, w_amount - ls_disw)
                zf(f"放眼望去，地图上消失了 {ls_disw} 个水洼！", "丙")
            else:
                hp_recover() if randint(1, 2) == 1 else energy_recover()
        case 7: # JC 变动。
            bh_jc = uniform(-2, 2)
            side = "Z" if randint(1, 2) == 1 else "D"
            if side == "Z":
                if bh_jc < 0:
                    zf(f"Z - {num} 的 JC 降低了 {abs(bh_jc):.3f} 点。", "乙")
                    z_sx[num].jc += bh_jc
                elif bh_jc > 0:
                    zf(f"Z - {num} 的 JC 提高了 {bh_jc:.3f} 点。", "壬")
                    z_sx[num].jc += bh_jc
                else:
                    hp_recover() if randint(1, 2) == 1 else energy_recover()
            elif side == "D":
                if bh_jc < 0:
                    zf(f"D - {num} 的 JC 降低了 {abs(bh_jc):.3f} 点。", "壬")
                    d_sx[num].jc += bh_jc
                elif bh_jc > 0:
                    zf(f"D - {num} 的 JC 提高了 {bh_jc:.3f} 点。", "乙")
                    d_sx[num].jc += bh_jc
                else:
                    hp_recover() if randint(1, 2) == 1 else energy_recover()
        case 8: # 恢复精力。
            energy_recover()

def print_map(side, num):
    print()
    for i in range(maze_size):
        for j in range(maze_size):
            if side == "z" and i == z_x[num] and j == z_y[num]:
                cl_print(maze[i][j], "gold", " ")
            elif side == "d" and i == d_x[num] and j == d_y[num]:
                cl_print(maze[i][j], "hotpink", " ")
            elif "Z" in maze[i][j] and "D" not in maze[i][j]:
                cl_print(maze[i][j], "green", " ")
            elif "D" in maze[i][j] and "Z" not in maze[i][j]:
                cl_print(maze[i][j], "blue", " ")
            elif "Z" in maze[i][j] and "D" in maze[i][j]:
                cl_print(maze[i][j], "red", " ")
            elif maze[i][j] == "| ; |":
                cl_print(maze[i][j], "magenta", " ")
            elif maze[i][j] == "| _ |":
                cl_print(maze[i][j], "darkred", " ")
            elif maze[i][j] == "| ^ |":
                cl_print(maze[i][j], "orange", " ")
            elif maze[i][j] == "| → |":
                cl_print(maze[i][j], "tea", " ")
            else:
                print(maze[i][j], end=" ")
        print()
    print()

def z_move(num):
    global player_step

    turn_index = 0

    def keyboard_control(bh_x, bh_y):
        global player_existing, maze, player_escaped
        destination_x, destination_y = z_x[num] + bh_x, z_y[num] + bh_y
        
        z_sx[num].energy -= 1

        # 水洼处理。
        if maze[destination_x][destination_y] == "| _ |":
            z_slip = uniform(0.19, 0.3) * math.sqrt(z_sx[num].thp * randint(9, 15))
            zf(f"Z - {num} 不小心踩进了水洼！他摔倒了，丧失了 {z_slip:.3f} HP。他停止活动一回合！", "辛")
            z_sx[num].hp -= z_slip
            z_sx[num].jz = 2
            print()
            if z_sx[num].hp <= 0:
                zf(f"Z - {num} 摔倒了，看来他不得不休息三回合！", "壬")
                z_sx[num].dizzy = True
                z_sx[num].jz = 4
                d_sx[num].hp = 0.001
                return
        elif maze[destination_x][destination_y] == "| ^ |":
            random_event("z", num)
        elif maze[destination_x][destination_y] == "| → |":
            zf(f"Z - {num} 进入了出口，逃离了 “厅内” 迷宫！", "甲")
            z_sx[num].exist = False
            player_existing -= 1
            player_escaped += 1
            return
        
        if "D" in maze[destination_x][destination_y]:
            destination_xy = maze[destination_x][destination_y]
            d_ids = [] # 记录看守者 ID。
            parts = destination_xy.replace("|", "").replace(" ", "").split(',')
            for ls in parts:
                if ls.startswith("D-"):
                    d_id = ls.replace("D-", "")
                    if d_id:
                        d_ids.append(d_id)
        
            if d_ids: # 若有抓捕者。
                d_idszf = ", ".join(d_ids)
                ls_caughtzf = f"Z - {num} 被 D - {d_idszf} 捕获。"
                if len(d_ids) > 1: # 有多个看守者，直接出局。
                    z_sx[num].exist = False
                    player_existing -= 1
                else: # 否则，开始战斗。
                    z_sx[num].zdz = int(d_ids[0])
                    d_sx[int(d_ids[0])].zdz = num

        z_x[num] = destination_x
        z_y[num] = destination_y

        # 更新迷宫。
        maze = [["| . |" for _ in range(maze_size)] for _ in range(maze_size)]
    
        for d in range(e_amount):
            maze[e_x[d]][e_y[d]] = "| → |"

        for e in range(r_amount):
            maze[r_x[e]][r_y[e]] = "| ^ |"

        for f in range(w_amount):
            maze[w_x[f]][w_y[f]] = "| _ |"
    
        for g in range(o_amount):
            maze[o_x[g]][o_y[g]] = "| ; |"
    
        for h in range(z_amount):
            if z_sx[h].exist == False:
                continue
            x, y = z_x[h], z_y[h]
            if "Z" in maze[x][y] or "D" in maze[x][y]:
                maze[x][y] = maze[x][y][:-2] + f", Z - {h} |"
            else:
                maze[x][y] = f"| Z - {h} |"
    
        for l in range(d_amount):
            if d_sx[l].exist == False:
                continue
            x, y = d_x[l], d_y[l]
            if "D" in maze[x][y] or "Z" in maze[x][y]:
                maze[x][y] = maze[x][y][:-2] + f", D - {l} |"
            else:
                maze[x][y] = f"| D - {l} |"

    def hitwall(i, fx): # fx：方向。
        if i < 3:
            cl_print(f"向{fx}走不通。", "error", "\n")
        else:
            if i == 3:
                zf(f"如果，你非要向{fx}走的话……", "red")
            z_hitwall = uniform(0.25, 0.49) * math.sqrt(z_sx[num].thp * randint(14, 22) + i ** i)
            zf(f"Z - {num} 撞向了{fx}方的墙壁！丧失了 {z_hitwall:.3f} HP。", "辛")
            z_sx[num].hp -= z_hitwall
            jdt(z_sx[num].hp, z_sx[num].thp, f"Z - {num}", "hp", "me")
            if z_sx[num].hp <= 0:
                zf(f"Z - {num} 撞晕了，看来他不得不休息三回合。", "壬")
                z_sx[num].jz = 4
                z_sx[num].hp = 0.001
                z_sx[num].dizzy = True
                return -1
            print()
        i += 1
        return i

    for i in range(2):
        turn_index += 1

        os.system("cls")
        print("""| Z | 表示你的位置，| D | 表示看守者的位置，| . | 表示空格子，| Z , D | 表示你和看守者在同一格子内；| ; | 表示障碍物，不可通行；
进入 | _ | 会让 Z 和 D 摔倒、失去部分 HP 并停止移动一回合；| ^ | 表示随机事件格，进入后会触发随机事件；进入 | → | 后，Z 将逃离迷宫。
所有角色逃离后将获得胜利。

使用方向键控制角色，按 ESC 暂停，按 F1 跳过本次移动，按 F3 跳过本回合。
""")
        cl_print("一回合可以移动两次。", "watergreen", "\n\n")
        cl_print("若单角色被单看守者抓，则开始战斗；若多角色被单看守者抓或单角色被多看守者抓，直接出局。", "yellow", "\n\n")
        print(f"已走 {player_step} 步。还有 {player_existing} 名角色在场，共 {z_amount} 名；还有 {monitor_existing} 名看守者在场，共 {d_amount} 名。")
    
        print_map("z", num)
    
        jdt(z_sx[num].energy, z_sx[num].tenergy, f"Z - {num}", "energy", "me")
        print()
        
        if z_sx[num].energy - 1 <= 0:
            zf(f"Z - {num} 的精力不足以继续移动了！他必须休息一回合。", "text")
            z_sx[num].energy += uniform(0.4, 0.8)
            os.system("pause > nul")
            return

        print(f"现在移动 Z - {num}。")
        et = 0
        if z_sx[num].exist and z_sx[num].zdz == -1 and z_sx[num].dizzy == False: 
            while True:
                time.sleep(0.1)
                if kb.is_pressed("up"):
                    if 0 <= z_x[num] - 1 <= maze_size - 1 and maze[z_x[num] - 1][z_y[num]] != "| ; |":
                        keyboard_control(-1, 0)
                        player_step += 1
                        break
                    else:
                        et = hitwall(et, "上")
                        if et == -1:
                            return

                elif kb.is_pressed("down"):
                    if 0 <= z_x[num] + 1 <= maze_size - 1 and maze[z_x[num] + 1][z_y[num]] != "| ; |":
                        keyboard_control(1, 0)
                        player_step += 1
                        break
                    else:
                        et = hitwall(et, "下")
                        if et == -1:
                            return
                elif kb.is_pressed("left"):
                    if 0 <= z_y[num] - 1 <= maze_size - 1 and maze[z_x[num]][z_y[num] - 1] != "| ; |":
                        keyboard_control(0, -1)
                        player_step += 1
                        break
                    else:
                        et = hitwall(et, "左")
                        if et == -1:
                            return
                elif kb.is_pressed("right"):
                    if 0 <= z_y[num] + 1 <= maze_size - 1 and maze[z_x[num]][z_y[num] + 1] != "| ; |":
                        keyboard_control(0, 1)
                        player_step += 1
                        break
                    else:
                        et = hitwall(et, "右")
                        if et == -1:
                            return
                elif kb.is_pressed("esc"):
                    ls_res = xz("是否退出？", ["是。", "否。"])
                    if ls_res == "1":
                        sys.exit(0)
                    else:
                        zf("继续游戏，本次跳过，角色精力将恢复一部分。", "text")
                        z_sx[num].energy += uniform(0.4, 0.8)
                        break
                elif kb.is_pressed("f1"):
                    z_sx[num].energy += uniform(0.4, 0.8)
                    break
                elif kb.is_pressed("f3"):
                    z_sx[num].energy += uniform(0.4, 0.8) + (uniform(0.4, 0.8) if turn_index == 1 else 0)
                    return
        else:
            continue

def d_move(num):
    os.system("cls")
    x_change = True
    ls_caughtzf = ""
    ls_slipped = ""
    ls_dizzying = ""
    ls_waiting = ""
    global player_existing, maze

    while True:
        if d_sx[num].energy - 2 <= 0:
            inf = f"的精力不足以继续移动了！他必须休息一回合。"
            d_sx[num].energy += uniform(0.4, 0.8) + uniform(0.4, 0.8)

        ls_cx = randint(-1, 1)
        ls_cy = randint(-1, 1)
        if 0 <= ls_cx + d_x[num] <= maze_size - 1 and 0 <= ls_cy + d_y[num] <= maze_size - 1 and maze[ls_cx + d_x[num]][ls_cy + d_y[num]] != "| ; |":
            if ls_cx == 0:
                inf = "没有纵向移动"
                x_change = False
            elif ls_cx > 0:
                inf = f"向下移动了 {abs(ls_cx)} 格"
                d_sx[num].energy -= 1
            else:
                inf = f"向上移动了 {abs(ls_cx)} 格"
                d_sx[num].energy -= 1

            if ls_cy == 0:
                inf += f"{'却' if x_change else '也'}没有横向移动"
            elif ls_cy > 0:
                inf += f"{'也' if x_change else '却'}向右移动了 {abs(ls_cy)} 格"
                d_sx[num].energy -= 1
            else:
                inf += f"{'也' if x_change else '却'}向左移动了 {abs(ls_cy)} 格"
                d_sx[num].energy -= 1
            
            destination_x, destination_y = d_x[num] + ls_cx, d_y[num] + ls_cy

            if maze[destination_x][destination_y] == "| _ |":
                d_slip = uniform(0.19, 0.3) * math.sqrt(d_sx[num].thp * randint(9, 15))
                ls_slipped = f"D - {num} 摔倒了！丧失了 {d_slip:.3f} HP。他停止活动一回合！"
                d_sx[num].hp -= d_slip
                d_sx[num].jz = 2
                print()
                if d_sx[num].hp <= 0:
                    ls_dizzying = f"D - {num} 摔晕了，看来他不得不休息三回合！"
                    d_sx[num].dizzy = True
                    d_sx[num].jz = 4
                    d_sx[num].hp = 0.001
                    break
            elif maze[destination_x][destination_y] == "| ^ |":
                random_event("d", num)
                break
            elif maze[destination_x][destination_y] == "| → |":
                ls_waiting = f"D - {num} 发现了出口，他决定守株待兔五回合。（在此期间，此处出口无效）"
                d_sx[num].jz = 6
                break
            if "Z" in maze[destination_x][destination_y]:
                destination_xy = maze[destination_x][destination_y] # 获取目的地格子信息。
                z_ids = [] # 记录被抓角色 ID。
                parts = destination_xy.replace("|", "").replace(" ", "").split(',')
                for ls in parts:
                    if ls.startswith("Z-"):
                        z_id = ls.replace("Z-", "")
                        if z_id:
                            z_ids.append(z_id)
        
                if z_ids: # 若有被抓角色。
                    z_idszf = ", ".join(z_ids)
                    ls_caughtzf = f"D - {num} 将 Z - {z_idszf} 捕获。"
                    if len(z_ids) > 1: # 多角色被抓，直接出局。
                        for zz in z_ids:
                            z_sx[int(zz)].exist = False
                            player_existing -= 1
                    else: # 否则，开始战斗。
                        z_sx[int(z_ids[0])].zdz = num
                        d_sx[num].zdz = int(z_ids[0])
                
            d_x[num] += ls_cx
            d_y[num] += ls_cy

            # 更新迷宫。
            maze = [["| . |" for _ in range(maze_size)] for _ in range(maze_size)]
    
            for d in range(e_amount):
                maze[e_x[d]][e_y[d]] = "| → |"

            for e in range(r_amount):
                maze[r_x[e]][r_y[e]] = "| ^ |"

            for f in range(w_amount):
                maze[w_x[f]][w_y[f]] = "| _ |"
    
            for g in range(o_amount):
                maze[o_x[g]][o_y[g]] = "| ; |"
    
            for h in range(z_amount):
                if not z_sx[h].exist:
                    continue
                x, y = z_x[h], z_y[h]
                if "Z" in maze[x][y] or "D" in maze[x][y]:
                    maze[x][y] = maze[x][y][:-2] + f", Z - {h} |"
                else:
                    maze[x][y] = f"| Z - {h} |"
    
            for l in range(d_amount):
                if not d_sx[l].exist:
                    continue
                x, y = d_x[l], d_y[l]
                if "D" in maze[x][y] or "Z" in maze[x][y]:
                    maze[x][y] = maze[x][y][:-2] + f", D - {l} |"
                else:
                    maze[x][y] = f"| D - {l} |"
            
            print("看守者移动。")

            print_map("d", num)

            jdt(d_sx[num].energy, d_sx[num].tenergy, f"D - {num}", "energy", "enemy")
            print()
            zf(f"D - {num} {inf}。", "text")
            if ls_caughtzf != "":
                zf(ls_caughtzf, "癸")
            if ls_slipped != "":
                zf(ls_slipped, "丙")
                jdt(d_sx[num].hp, d_sx[num].thp, f"D - {num}", "hp", "enemy")
                input()
            if ls_dizzying != "":
                zf(ls_dizzying, "乙")
            break

player_existing = z_amount
monitor_existing = d_amount
player_escaped = 0 # 逃脱的角色数量。

while player_existing > 0 and monitor_existing > 0:
    player_existing = 0
    monitor_existing = 0
    maze = [["| . |" for _ in range(maze_size)] for _ in range(maze_size)]
    
    for d in range(e_amount):
        maze[e_x[d]][e_y[d]] = "| → |"

    for e in range(r_amount):
        maze[r_x[e]][r_y[e]] = "| ^ |"

    for f in range(w_amount):
        maze[w_x[f]][w_y[f]] = "| _ |"
    
    for g in range(o_amount):
        maze[o_x[g]][o_y[g]] = "| ; |"
    
    for h in range(z_amount):
        if not z_sx[h].exist:
            continue
        x, y = z_x[h], z_y[h]
        if "Z" in maze[x][y] or "D" in maze[x][y]:
            maze[x][y] = maze[x][y][:-2] + f", Z - {h} |"
        else:
            maze[x][y] = f"| Z - {h} |"
        player_existing += 1
    
    for l in range(d_amount):
        if not d_sx[l].exist:
            continue
        x, y = d_x[l], d_y[l]
        if "D" in maze[x][y] or "Z" in maze[x][y]:
            maze[x][y] = maze[x][y][:-2] + f", D - {l} |"
        else:
            maze[x][y] = f"| D - {l} |"
        monitor_existing += 1

    for a in range(z_amount):
        if z_sx[a].dizzy and z_sx[a].exist:
            z_sx[a].hp = min(z_sx[a].hp + uniform(0.7, 1.4) * math.sqrt(z_sx[a].thp * randint(10, 17)), z_sx[a].thp)
            if z_sx[a].dizzy and z_sx[a].jz == 0 and z_sx[a].exist:
                z_sx[a].dizzy = False # 眩晕时间结束。
                zf(f"Z - {a} 重新开始行动。", "乙")
                jdt(z_sx[a].hp, z_sx[a].thp, f"Z - {a}", "hp", "me")
                os.system("pause > nul")

        if z_sx[a].exist and z_sx[a].zdz == -1 and z_sx[h].jz <= 0:
            z_move(a)
        elif z_sx[a].zdz != -1:
            os.system("cls")
            gj(a, z_sx[a].zdz)
        z_sx[a].jz -= 1

    for b in range(d_amount):
        if d_sx[b].dizzy and d_sx[b].exist:
            d_sx[b].hp = min(d_sx[b].hp + uniform(0.7, 1.4) * math.sqrt(d_sx[b].thp * randint(10, 17)), d_sx[b].thp)
            if d_sx[b].dizzy and d_sx[b].jz == 0 and d_sx[b].exist:
                d_sx[b].dizzy = False # 眩晕时间结束。
                zf(f"D - {b} 重新开始行动。", "壬")
                jdt(d_sx[b].hp, d_sx[b].thp, f"D - {b}", "hp", "enemy")
                os.system("pause > nul")

        if d_sx[b].exist and d_sx[b].zdz == -1 and d_sx[b].jz <= 0:
            d_move(b)
        elif d_sx[b].zdz != -1:
            os.system("cls")
            gj(d_sx[b].zdz, b)
        d_sx[b].jz -= 1

if player_existing == 0 and player_escaped < z_amount:
    zf("角色全部阵亡！你输了！", "癸")
elif monitor_existing == 0 :
    zf("你歼灭了敌人！你赢了！", "甲")
elif player_escaped == z_amount:
    zf("所有角色都逃脱了！你赢了！", "甲")
else:
    zf(f"""似乎发生了错误，以下是报错信息。
角色数量：{player_existing} / {z_amount}。
看守者数量：{monitor_existing} / {d_amount}。
""", "error")