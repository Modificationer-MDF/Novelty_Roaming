# -*- coding: utf-8 -*-
# Comb Mosha 2025。
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
    "DOWN": "#8b1a1a", # Down
    "error": "#8b1a1a",
    "inp": "#ffd700",
    "xz": "#00ff7f",
    "text": "#ffffff",
}

z_x = []
z_y = []

d_x = []
d_y = []

class Z: # 角色属性。
    def __init__(self, hp, thp, name, atk, crit, fy, jc, exist, zdz):
        self.hp = hp # 角色 HP。
        self.thp = thp # 角色总 HP。
        self.name = name # 角色名称。
        self.atk = atk # 角色攻击力。
        self.crit = crit # 角色暴击率。
        self.fy = fy # 角色防御力。
        self.jc = jc # 角色 JC。
        self.exist = exist # 角色是否存活。
        self.zdz = zdz # 角色在与谁战斗？

class D: # 敌人属性。
    def __init__(self, hp, thp, name, atk, crit, fy, jc, exist, zdz):
        self.hp = hp # 敌人 HP。
        self.thp = thp # 敌人总 HP。
        self.name = name # 敌人名称。
        self.atk = atk # 敌人攻击力。
        self.crit = crit # 敌人暴击率。
        self.fy = fy # 敌人防御力。
        self.jc = jc # 敌人 JC。
        self.exist = exist # 敌人是否存活。
        self.zdz = zdz # 敌人在与谁战斗？

z_sx = [
    Z(0, 0, f"Z - {i}", randint(1, 14), uniform(0.1, 0.9), randint(1, 14), randint(9, 17), True, -1)
    for i in range(10)
]

d_sx = [
    D(0, 0, f"D - {i}", randint(1, 14), uniform(0.1, 0.9), randint(1, 14), randint(9, 17), True, -1)
    for i in range(10)
]

try:
    def zf(text, cl):
        if not isinstance(text, str):
            text = str(text)
            
        fz_cl = cl

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
            case "DOWN":
                cl = "倒下"
            case "error":
                cl = "错误"
            case "inp":
                cl = "输入"
            case "xz":
                cl = "选择"
            case _:
                cl = "文字"

        text = f"[{cl}] {text}"

        for i in text:
            cs.print(i, style=color[fz_cl], end="")
            time.sleep(0.003)
        return input()

    def xz(text, array):
        ls_str = ""
        for i in range(len(array)):
            ls_str += f"（{i+1}） {array[i]}　"
        zf(f"""{text}
        {ls_str}""", "xz")
        try:
            res = int(input(r"\/ "))
            return res
        except:
            return False

    def jdt(current, total, char, typ, side): 
        # current：当前值；total：总值；char：角色；typ：属性；side：阵营。
        column = [
            TextColumn("{task.description}"),
            BarColumn(bar_width=100),
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
                    t_color = "DOWN"
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
                    t_color = "DOWN"
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
                    t_color = "DOWN"
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
                    t_color = "DOWN"

            column.append(TextColumn(f"[{color[t_color]}][{t_color}] {char} {typ.upper()}： {current:.3f} / {total:.3f}。"))
            task = progress.add_task("", total=total)
            progress.update(task, completed=current)
            progress.console.print(f"[{color[t_color]}][{t_color}] {char} {typ.upper()}： {current:.3f} / {total:.3f}。")

    def gj(z_ord, d_ord): # z_ord：被抓角色，d_ord：抓角色的看守者。
        global player_caught, monitor_killed

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
        if 24 <= z_acc <= 25:
            zf(f"{z_sx[z_ord].name} 打出了精准的一招。", "乙")
            z_damage *= (1 + (z_sx[z_ord].crit - abs(5 - z_acc) / 45) / 10)
        elif z_acc == 0:
            zf(f"{z_sx[z_ord].name} 落空了。", "癸")
            z_damage = 0
        else:
            zf(f"{z_sx[z_ord].name} 未能精准命中。", "壬")
            z_damage *= (1 - abs(5 - z_acc) / 25)
        print()
        if d_check <= 0:
            z_damage = 0
        z_damage *= (d_check / 10) * uniform(0.95, 1.05)
        zf(f"{z_sx[z_ord].name} 对 {d_sx[d_ord].name} 造成了 {max(abs(z_damage), 0):.3f} HP 伤害。", "text")
        d_sx[d_ord].hp -= z_damage

        d_damage = randint(6, 9) + d_sx[d_ord].atk
        d_acc = mz(d_sx[d_ord].name, z_sx[z_ord].name)
        print()
        if 24 <= d_acc <= 25:
            zf(f"{d_sx[d_ord].name} 打出了精准的一招。", "壬")
            d_damage*= (1 + (d_sx[d_ord].atk - abs(5 - d_acc) / 45) / 10)
        elif d_acc == 0:
            zf(f"{d_sx[d_ord].name} 落空了。", "甲")
            d_damage = 0
        else:
            zf(f"{d_sx[d_ord].name} 未能精准命中。", "乙")
            d_damage *= (1 - abs(5 - d_acc) / 25)
        print()
        if z_check <= 0:
            d_damage = 0
        d_damage *= (z_check / 10) * uniform(0.95, 1.05)
        zf(f"{d_sx[d_ord].name} 对 {z_sx[z_ord].name} 造成了 {max(abs(d_damage), 0):.3f} HP 伤害。", "text")
        z_sx[z_ord].hp -= d_damage

        os.system("cls")
        print()
        # 检查敌人状态。
        if d_sx[d_ord].hp <= 0:
            zf(f"{d_sx[d_ord].name} 败下阵来。", "甲")
            monitor_killed += 1
            d_sx[d_ord].exist = False
            d_sx[d_ord].zdz = -1
            z_sx[z_ord].zdz = -1
            maze[d_x[d_ord]][d_y[d_ord]] = f"| . |"
            maze[z_x[z_ord]][z_y[z_ord]] = f"| Z - {z_ord} |"
            return

        # 检查角色状态。
        if z_sx[z_ord].hp <= 0:
            zf(f"{z_sx[z_ord].name} 败下阵来。", "癸")
            player_caught += 1
            z_sx[z_ord].exist = False
            d_sx[d_ord].zdz = -1
            z_sx[z_ord].zdz = -1
            maze[z_x[z_ord]][z_y[z_ord]] = f"| . |"
            maze[d_x[d_ord]][d_y[d_ord]] = f"| D - {d_ord} |"
            return

        print("结束状态。")
        jdt(z_sx[z_ord].hp, z_sx[z_ord].thp, f"{z_sx[z_ord].name}", "hp", "me")
        jdt(d_sx[d_ord].hp, d_sx[d_ord].thp, f"{d_sx[d_ord].name}", "hp", "enemy")
        os.system("pause")
        print()

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
                    raise ValueError("不可以输入无穷大。（Infinity）")
                if p <= var <= q:
                    return var
                else:
                    raise ValueError(f"无效输入。请输入一个在 {p} 和 {q} 之间的数字")
            except Exception as e:
                var = zf("请重新输入一个浮点数：", "error")

    def mz(me, enemy):
        os.system("cls")
        print("按下 Z 键攻击。")
        print(fr"""
      攻方                                防方
      {me}                               {enemy}
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

        ls_string = list("........................**........................")
        ls_range = len(ls_string)

        sys.stdout.write("".join(ls_string))
        sys.stdout.flush()


        if randint(0, 1):
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
                    break
        else:
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
                    break

        return l
except EOFError as e:
    print("发生了 EOF 错误。你可能按下了 Ctrl + Z 组合键。")
    sys.exit(0)
except KeyboardInterrupt:
    print()
    print("此次运行被键盘中断。")
    sys.exit(0)

os.system("cls")

zf("…………", "text")
limit_steps = zs(zf("最大步数？", "inp"), 1, float("inf"))

print()
zf("…………", "text")
z_amount = zs(zf("我方数量？", "inp"), 1, 9)

print()
zf("…………", "text")
d_amount = zs(zf("看守者数量？", "inp"), 1, 9)

print()
zf("…………", "text")

for i in range(z_amount):
    if z_amount == 1:
        z_x.append(zs(zf("角色起始纵坐标？（X 从 0 开始）", "inp"), 0, 9))
        z_y.append(zs(zf("角色起始横坐标？（Y 从 0 开始）", "inp"), 0, 9))
        z_sx[i].thp = zs(zf("角色起始 HP？", "inp"), 1, float("inf"))
    else:
        z_x.append(zs(zf(f"第 {i + 1} 位角色的起始纵坐标？（X 从 0 开始）", "inp"), 0, 9))
        z_y.append(zs(zf(f"第 {i + 1} 位角色的起始横坐标？（Y 从 0 开始）", "inp"), 0, 9))
        z_sx[i].thp = zs(zf(f"第 {i + 1} 位角色的起始 HP？", "inp"), 1, float("inf"))
    z_sx[i].hp = z_sx[i].thp        

zf("…………", "text")
for j in range(d_amount):
    if d_amount == 1:
        d_sx[j].thp = zs(zf("看守者起始 HP？", "inp"), 1, float("inf"))
    else:
        d_sx[j].thp = zs(zf(f"第 {j + 1} 位看守者的起始 HP？", "inp"), 1, float("inf"))
    d_sx[j].hp = d_sx[j].thp

os.system("cls")

maze = [
    ["| . |", "| . |", "| . |", "| . |", "| . |", "| . |", "| . |", "| . |", "| . |", "| . |"],
    ["| . |", "| . |", "| . |", "| . |", "| . |", "| . |", "| . |", "| . |", "| . |", "| . |"],
    ["| . |", "| . |", "| . |", "| . |", "| . |", "| . |", "| . |", "| . |", "| . |", "| . |"],
    ["| . |", "| . |", "| . |", "| . |", "| . |", "| . |", "| . |", "| . |", "| . |", "| . |"],
    ["| . |", "| . |", "| . |", "| . |", "| . |", "| . |", "| . |", "| . |", "| . |", "| . |"],
    ["| . |", "| . |", "| . |", "| . |", "| . |", "| . |", "| . |", "| . |", "| . |", "| . |"],
    ["| . |", "| . |", "| . |", "| . |", "| . |", "| . |", "| . |", "| . |", "| . |", "| . |"],
    ["| . |", "| . |", "| . |", "| . |", "| . |", "| . |", "| . |", "| . |", "| . |", "| . |"],
    ["| . |", "| . |", "| . |", "| . |", "| . |", "| . |", "| . |", "| . |", "| . |", "| . |"],
    ["| . |", "| . |", "| . |", "| . |", "| . |", "| . |", "| . |", "| . |", "| . |", "| . |"],
]

for i in range(z_amount):
    maze[z_x[i]][z_y[i]] = f"| Z - {i} |"

for ls_1 in range(d_amount): # 随机分配监视者的位置
    while True:
        ls_x = randint(0, 9)
        ls_y = randint(0, 9)
        if maze[ls_x][ls_y] == "| . |":
            maze[ls_x][ls_y] = f"| D - {ls_1} |"
            d_x.append(ls_x)
            d_y.append(ls_y)
            break
        
player_caught = 0
monitor_killed = 0
player_step = 0

def z_move(num):
    global player_caught, player_step

    os.system("cls")
    player_step += 1
    print("""| Z | 表示你的位置，| D | 表示看守者的位置。
    使用方向键控制角色，按 ESC 暂停，按 F1 跳过本回合。""")
    print(f"""{f'第 {player_step} 步，共 {limit_steps} 步，还有 {limit_steps - player_step} 步要走' if limit_steps > player_step else '这是最后一步'}。
    {f'已有 {player_caught} 名角色被捕' if player_caught > 0 else '无角色被捕'}，{f'已有 {monitor_killed} 名监视者出局' if monitor_killed > 0 else '无看守者出局'}。""")

    for i in range(10):
        for j in range(10):
            print(maze[i][j], end=" ")
        print()

    print()
    print(f"现在移动 Z - {num}。")
    while True:
        time.sleep(0.1)
        if kb.is_pressed("up"):
            if 0 <= z_x[num] - 1 <= 9:
                if "D" in maze[z_x[num] - 1][z_y[num]]:
                    ls_dord = maze[z_x[num] - 1][z_y[num]].replace("|", "").replace(" ", "").replace("D-", "")
                    zf(f"Z - {num} 被 D - {ls_dord} 捕获。", "癸")
                    z_sx[num].zdz = int(ls_dord)
                    d_sx[int(ls_dord)].zdz = num
                    return
                else:
                    maze[z_x[num]][z_y[num]] = "| . |"
                    z_x[num] -= 1
                    maze[z_x[num]][z_y[num]] = f"| Z - {num} |"
                    break
            else:
                zf("向上走不通。", "error")
        elif kb.is_pressed("down"):
            if 0 <= z_x[num] + 1 <= 9:
                if "D" in maze[z_x[num] + 1][z_y[num]]:
                    ls_dord = maze[z_x[num] + 1][z_y[num]].replace("|", "").replace(" ", "").replace("D-", "")
                    zf(f"Z - {num} 被 D - {ls_dord} 捕获。", "癸")
                    z_sx[num].zdz = int(ls_dord)
                    d_sx[int(ls_dord)].zdz = num
                    return
                else:
                    maze[z_x[num]][z_y[num]] = "| . |"
                    z_x[num] += 1
                    maze[z_x[num]][z_y[num]] = f"| Z - {num} |"
                    break
            else:
                zf("向下走不通。", "error")
        elif kb.is_pressed("left"):
            if 0 <= z_y[num] - 1 <= 9:
                if "D" in maze[z_x[num]][z_y[num] - 1]:
                    ls_dord = maze[z_x[num]][z_y[num] - 1].replace("|", "").replace(" ", "").replace("D-", "")
                    zf(f"Z - {num} 被 D - {ls_dord} 捕获。", "癸")
                    z_sx[num].zdz = int(ls_dord)
                    d_sx[int(ls_dord)].zdz = num
                    return
                else:
                    maze[z_x[num]][z_y[num]] = "| . |"
                    z_y[num] -= 1
                    maze[z_x[num]][z_y[num]] = f"| Z - {num} |"
                    break
            else:
                zf("向左走不通。", "error")
        elif kb.is_pressed("right"):
            if 0 <= z_y[num] + 1 <= 9:
                if "D" in maze[z_x[num]][z_y[num] + 1]:
                    ls_dord = maze[z_x[num]][z_y[num] + 1].replace("|", "").replace(" ", "").replace("D-", "")
                    zf(f"Z - {num} 被 D - {ls_dord} 捕获。", "癸")
                    z_sx[num].zdz = int(ls_dord)
                    d_sx[int(ls_dord)].zdz = num
                    return
                else:
                    maze[z_x[num]][z_y[num]] = "| . |"
                    z_y[num] += 1
                    maze[z_x[num]][z_y[num]] = f"| Z - {num} |"
                    break
            else:
                zf("向右走不通。", "error")
        elif kb.is_pressed("esc"):
            ls_res = xz("是否退出？", ["是。", "否。"])
            if ls_res == 1:
                sys.exit(0)
            else:
                zf("继续游戏，本回合跳过。", "text")
                break
        elif kb.is_pressed("f1"):
            zf("本回合跳过。", "text")
            break

def d_move(num):
    os.system("cls")
    global player_caught
    x_change = True
    ls_caughtzf = ""

    while True:
        ls_cx = randint(-1, 1)
        ls_cy = randint(-1, 1)
        if 0 <= ls_cx + d_x[num] <= 9 and 0 <= ls_cy + d_y[num] <= 9:
            if ls_cx == 0:
                inf_x = "没有纵向移动"
                x_change = False
            elif ls_cx > 0:
                inf_x = f"向下移动了 {abs(ls_cx)} 格"
            else:
                inf_x = f"向上移动了 {abs(ls_cx)} 格"

            if ls_cy == 0:
                inf_y = f"{'却' if x_change else '也'}没有横向移动"
            elif ls_cy > 0:
                inf_y = f"{'也' if x_change else '却'}向右移动了 {abs(ls_cy)} 格"
            else:
                inf_y = f"{'也' if x_change else '却'}向左移动了 {abs(ls_cy)} 格"
            
            if "Z" in maze[d_x[num] + ls_cx][d_y[num] + ls_cy]:
                ls_zord = maze[d_x[num] + ls_cx][d_y[num] + ls_cy].replace("|", "").replace(" ", "").replace("Z-", "")
                ls_caughtzf = f"D - {num} 将 Z - {ls_zord} 捕获。"
                z_sx[int(ls_zord)].zdz = num
                d_sx[num].zdz = int(ls_zord)
            maze[d_x[num]][d_y[num]] = "| . |"
            d_x[num] += ls_cx
            d_y[num] += ls_cy
            maze[d_x[num]][d_y[num]] = f"| D - {num} |"
            
            print("看守者移动。")
            print()
            for i in range(10):
                for j in range(10):
                    print(maze[i][j], end=" ")
                print()

            print()
            zf(f"D - {num} {inf_x}，{inf_y}。", "text")
            if len(ls_caughtzf) > 0:
                zf(ls_caughtzf, "癸")
            break

while player_caught < z_amount and monitor_killed < d_amount:
    for a in range(z_amount):
        if z_sx[a].exist and z_sx[a].zdz == -1:
            z_move(a)
        elif z_sx[a].zdz != -1:
            os.system("cls")
            gj(a, z_sx[a].zdz)

    for b in range(d_amount):
        if d_sx[b].exist and d_sx[b].zdz == -1:
            d_move(b)
        elif d_sx[b].zdz != -1:
            os.system("cls")
            gj(d_sx[b].zdz, b)

    if player_step == limit_steps or monitor_killed == d_amount:
        zf("你赢了！", "甲")
        sys.exit(0)

if player_caught == z_amount:
    zf("你输了！", "癸")
else:
    zf(f"{player_step} / {limit_steps}，{player_caught} / {z_amount}，{monitor_killed} / {d_amount}。", "error")