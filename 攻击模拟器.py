# -*- coding: utf-8 -*-
from random import randint
from rich.progress import *
from rich.console import Console
import os
import time
import sys

cs = Console()
ba = 7  # 基础攻击力。
bd = 15  # 基础防御力。

f_hp = [60, 66, 71, 77, 83, 90, 96, 102, 108, 114, 120, 124, 130, 135, 141, 150]
w_hp = [57, 59, 62, 65, 69, 72, 75, 79, 83, 87, 90, 94, 97, 100, 103, 107]
t_hp = [64, 70, 73, 81, 88, 93, 100, 104, 110, 114, 122, 128, 135, 143, 150, 161]
z_hp = [59, 62, 65, 68, 72, 76, 80, 84, 88, 93, 98, 102, 108, 113, 116, 120]
m_hp = 429

f_atk = [3, 4, 5, 7, 7, 8, 7, 8, 9, 10, 10, 11, 13, 15, 18, 18] # 攻击力。
f_fy = [2, 3, 4, 5, 6, 7, 8, 8, 8, 8, 9, 10, 12, 13, 15, 17] # 防御力。
f_crit = [0.2, 0.21, 0.24, 0.27, 0.3, 0.33, 0.37, 0.4, 0.42, 0.43, 0.45, 0.5, 0.5, 0.55, 0.55, 0.55] # 暴击率。
f_jc = [14, 14, 13, 12, 12, 11, 11, 10, 9, 8, 8, 8, 8, 8, 8, 8] # JC。

w_atk = [2, 2, 3, 5, 5, 5, 5, 6, 7, 7, 8, 9, 9, 9, 11, 11]
w_fy = [3, 4, 4, 5, 6, 7, 8, 9, 10, 12, 14, 15, 16, 17, 19, 22]
w_crit = [0.15, 0.15, 0.16, 0.19, 0.2, 0.22, 0.24, 0.25, 0.25, 0.27, 0.28, 0.28, 0.3, 0.3, 0.3, 0.3]
w_jc = [13, 13, 12, 11, 10, 10, 10, 9, 9, 8, 7, 7, 7, 7, 6, 6]

t_atk = [5, 7, 7, 8, 8, 9, 9, 9, 11, 13, 14, 15, 17, 17, 18, 23]
t_fy = [2, 3, 4, 4, 5, 6, 7, 8, 8, 8, 8, 8, 10, 11, 12, 14]
t_crit = [0.5, 0.52, 0.53, 0.54, 0.55, 0.58, 0.6, 0.6, 0.62, 0.65, 0.65, 0.65, 0.65, 0.65, 0.67, 0.7]
t_jc = [16, 15, 14, 13, 13, 12, 12, 12, 10, 10, 10, 10, 10, 10, 10, 10]

z_atk = [4, 3, 5, 6, 5, 7, 5, 8, 9, 10, 10, 11, 12, 13, 16, 13]
z_fy = [4, 5, 6, 6, 6, 7, 7, 8, 8, 10, 11, 11, 12, 13, 14, 17]
z_crit = [0.26, 0.27, 0.27, 0.3, 0.27, 0.33, 0.27, 0.4, 0.4, 0.4, 0.4, 0.42, 0.44, 0.5, 0.4, 0.4]
z_jc = [15, 15, 13, 12, 12, 11, 11, 11, 9, 9, 9, 9, 9, 9, 9, 9]

m_atk = 39
m_fy = 50
m_crit = 0.93
m_jc = 3

color = {
    "perfect": "#20b2aa",  # 浅绿色。（完美）
    "fabulous": "#008080",  # 青绿色。（绝佳）
    "excellent": "#66cdaa",  # 中绿色。（优秀）
    "great": "#8fbc8f",  # 浅青绿色。（良好）
    "good": "#008000",  # 纯绿色。（好）
    "decent": "#ffd700",  # 金色。（体面）
    "fair": "#9acd32",  # 浅黄绿色。（合理）
    "average": "#98fb98",  # 浅绿色。（平均）
    "mild": "#40e0d0",  # 浅青色。（缓和）
    "moderate": "#add8e6",  # 浅蓝色。（适当）
    "mediocre": "#87cefa",  # 浅天蓝色。（一般）
    "poor": "#ee1289",  # 淡红色。（差）
    "awful": "#fa8072",  # 浅珊瑚色。（糟糕）
    "horrible": "#ff6347",  # 深珊瑚色。（可怕）
    "critical": "#f08080",  # 浅珊瑚红色。（严重）
    "severe": "#cd5c5c",  # 深珊瑚红色。（惨重）
    "fatal": "#8b008b",  # 深紫色。（致命）
    "nightmare": "#9932cc",  # 深紫色。（噩梦）
    "disaster": "#8b0000",  # 深红色。（灾难）
    "destruction": "#ff4500",  # 橙红色。（毁灭）
    "error": "#ff1493",  # 淡洋红色。（错误）
    "choice": "#ffffff",  # 白色。（选择）
}

def zf(text, cl):
    if not isinstance(text, str):
        text = str(text)
    
    if "\n" in text:
        text = "\\/ " + text + "/\\"
    else:
        text = "\\/ " + text

    for i in text:
        cs.print(i, style=color[cl], end="")
        time.sleep(0.007)
    return input()

def jdt(current_hp, total_hp, js):
    column = [
        TextColumn("{task.description}"),
        BarColumn(),
        TaskProgressColumn(text_format="{task.percentage:.3f}%"),
    ]
    with Progress(*column) as progress:
        t_color: str = ""
        if js == name:
            if current_hp >= 0.95 * total_hp:
                t_color = "destruction"
            elif 0.9 * total_hp <= current_hp < 0.95 * total_hp:
                t_color = "disaster"
            elif 0.85 * total_hp <= current_hp < 0.9 * total_hp:
                t_color = "nightmare"
            elif 0.8 * total_hp <= current_hp < 0.85 * total_hp:
                t_color = "fatal"
            elif 0.75 * total_hp <= current_hp < 0.8 * total_hp:
                t_color = "severe"
            elif 0.7 * total_hp <= current_hp < 0.75 * total_hp:
                t_color = "critical"
            elif 0.65 * total_hp <= current_hp < 0.7 * total_hp:
                t_color = "awful"
            elif 0.6 * total_hp <= current_hp < 0.65 * total_hp:
                t_color = "horrible"
            elif 0.55 * total_hp <= current_hp < 0.6 * total_hp:
                t_color = "poor"
            elif 0.5 * total_hp <= current_hp < 0.55 * total_hp:
                t_color = "mediocre"
            elif 0.45 * total_hp <= current_hp < 0.5 * total_hp:
                t_color = "moderate"
            elif 0.4 * total_hp <= current_hp < 0.45 * total_hp:
                t_color = "mild"
            elif 0.35 * total_hp <= current_hp < 0.4 * total_hp:
                t_color = "average"
            elif 0.3 * total_hp <= current_hp < 0.35 * total_hp:
                t_color = "fair"
            elif 0.25 * total_hp <= current_hp < 0.3 * total_hp:
                t_color = "decent"
            elif 0.2 * total_hp <= current_hp < 0.25 * total_hp:
                t_color = "good"
            elif 0.15 * total_hp <= current_hp < 0.2 * total_hp:
                t_color = "great"
            elif 0.1 * total_hp <= current_hp < 0.15 * total_hp:
                t_color = "excellent"
            elif 0.05 * total_hp <= current_hp < 0.1 * total_hp:
                t_color = "fabulous"
            elif 0 < current_hp < 0.05 * total_hp:
                t_color = "perfect"
            else:
                t_color = "error"
        elif js == char:
            if current_hp >= 0.95 * total_hp:
                t_color = "perfect"
            elif 0.9 * total_hp <= current_hp < 0.95 * total_hp:
                t_color = "fabulous"
            elif 0.85 * total_hp <= current_hp < 0.9 * total_hp:
                t_color = "excellent"
            elif 0.8 * total_hp <= current_hp < 0.85 * total_hp:
                t_color = "great"
            elif 0.75 * total_hp <= current_hp < 0.8 * total_hp:
                t_color = "good"
            elif 0.7 * total_hp <= current_hp < 0.75 * total_hp:
                t_color = "decent"
            elif 0.65 * total_hp <= current_hp < 0.7 * total_hp:
                t_color = "fair"
            elif 0.6 * total_hp <= current_hp < 0.65 * total_hp:
                t_color = "average"
            elif 0.55 * total_hp <= current_hp < 0.6 * total_hp:
                t_color = "mild"
            elif 0.5 * total_hp <= current_hp < 0.55 * total_hp:
                t_color = "moderate"
            elif 0.45 * total_hp <= current_hp < 0.5 * total_hp:
                t_color = "mediocre"
            elif 0.4 * total_hp <= current_hp < 0.45 * total_hp:
                t_color = "poor"
            elif 0.35 * total_hp <= current_hp < 0.4 * total_hp:
                t_color = "horrible"
            elif 0.3 * total_hp <= current_hp < 0.35 * total_hp:
                t_color = "awful"
            elif 0.25 * total_hp <= current_hp < 0.3 * total_hp:
                t_color = "critical"
            elif 0.2 * total_hp <= current_hp < 0.25 * total_hp:
                t_color = "severe"
            elif 0.15 * total_hp <= current_hp < 0.2 * total_hp:
                t_color = "fatal"
            elif 0.1 * total_hp <= current_hp < 0.15 * total_hp:
                t_color = "nightmare"
            elif 0.05 * total_hp <= current_hp < 0.1 * total_hp:
                t_color = "disaster"
            elif 0 < current_hp < 0.05 * total_hp:
                t_color = "destruction"
            else:
                t_color = "error"

        if js != name:
            match char:
                case 1:
                    js: str = "Feng_Noti"
                case 2:
                    js: str = "With_Kout"
                case 3:
                    js: str = "Tsian_Ca"
                case 4:
                    js: str = "Zyxa"
                case 5:
                    js: str = "Modificationer"

        column.append(TextColumn(f"[{color[t_color]}]{js} HP： {current_hp:.3f} / {total_hp:.3f}。"))
        task = progress.add_task("", total=total_hp)
        progress.update(task, completed=current_hp)
        progress.console.print(f"[{color[t_color]}]{js} HP： {current_hp:.3f} / {total_hp:.3f}。")


def zs(var, p, q):
    while True:
        try:
            var = int(var)
            if p <= var <= q:
                return var
            else:
                raise ValueError(f"无效输入。请重新输入一个在 {p} 和 {q} 之间的数字。")
        except ValueError as e:
            var = zf(f"{e}。请重新输入一个整数：", "error")

def fd(var, p, q):
    while True:
        try:
            var = float(var)
            if p <= var <= q:
                return var
            else:
                raise ValueError(f"无效输入。请重新输入一个在 {p} 和 {q} 之间的数字。")
        except ValueError as e:
            var = zf(f"{e}。请重新输入一个浮点数：", "error")


def z_gj(atk, crit, j):
    try:
        global d_hp
        global zs_hp
        global dt_hp

        act = zf("饶恕还是攻击？（R / G）", "choice")
        if act == "R" or act == "r":
            r, d, m = randint(1, 10), randint(1, 10), randint(1, 3)
            zf(f"你选择饶恕。（{r}）", "mild")
            if (r != d) and (r > d) and (r - d >= m):
                zf(f"{name} 接受了你的饶恕。（{d}，{m}）", "excellent")
                sys.exit(0)
            else:
                zf(f"{name} 不为所动。（{d}, {m}）", "horrible")
                print()
        elif act == "G" or act == "g":
            if (char != 5):
                critical = randint(1, 10)
            else:
                critical = 5
            c = randint(1, 10)

            weapon = int(zf("请输入武器攻击力 （int）： ", "choice"))
            defense = int(zf(f"请输入你的防御力 （int， JC：{j}。）： ", "choice"))
            enemyatk = int(zf(f"请输入 {name} 攻击力 （int）： ", "choice"))
            enemydef = int(zf(f"请输入 {name} 防御 （int， JC：{jc}。）： ", "choice"))

            damage1 = ba + (atk + weapon)
            damage2 = ba + enemyatk

            if 4 <= critical <= 6:
                zf(f"太幸运了！直中中心。本次攻击所造成的伤害将增加至原先的 {100 + 100 * crit}% 。", "perfect")
                damage1 *= (1 + (crit if crit >= critical / 10 else critical / 10))
            if 4 <= c <= 6:
                zf(f"糟糕！{name} 这次的攻击会更加猛烈：增加至 {100 + 10 * c}% 。", "fatal")
                damage2 *= (1 + c / 10)

            if critical < 4:
                zf(f"你打偏了，打到了 {name} 旁边 {(abs(5 - critical) / 3):.3f} 米处 。", "mild")
            elif critical > 6:
                zf(f"这一次你打偏了，打到了 {name} 旁边 {(abs(5 - critical) / 3):.3f} 米处 。", "mild")
            if c < 4 or c > 6:
                zf(f"{name} 打偏了，打到了你旁边 {(abs(5 - c) / 3):.3f} 米处 。", "average")

            check = (jc * 2.657) - enemydef  # 敌人 JC - 敌人防御。
            ch = (j * 2.657) - defense  # 角色 JC - 角色防御。

            if check <= 0:
                damage1 = 0
                zf("这次攻击没有造成任何伤害。", "awful")
            else:
                damage1 *= (check / 10) * 1.1
                zf(f"你造成了 {max(damage1, 0):.3f} HP 伤害。", "decent")
                d_hp -= damage1

            if ch <= 0:
                damage2 = 0
                zf("你没有受到任何伤害。", "great")
            else:
                damage2 *= (ch / 10) * 1.1
                zf(f"你受到了 {max(damage2, 0):.3f} HP 伤害。", "horrible")
                zs_hp -= damage2

            if d_hp <= 0:
                zf(f"{name} 败下阵来。", "perfect")
            elif zs_hp <= 0:
                zf("你被打败了。", "destruction")
            else:
                print()
                print(f"第 {count} 回合结束，角色状态。")
                jdt(d_hp, dt_hp, name)
                jdt(zs_hp, zt_hp, char)
                print()
        else:
            raise ValueError

    except KeyboardInterrupt:
        zf("此次运行被键盘中断。跳过本次攻击。", "error")
        print()
    except ValueError:
        zf("无效输入。跳过本次攻击。", "error")
        print()
    except Exception as e:
        zf(f"发生错误： {e} 。跳过本次攻击。", "error")
        print()

def m_gj(atk, crit, fy):
    try:
        global d_hp
        global zs_hp
        global dt_hp

        act = zf("饶恕还是攻击？（R / G）", "choice")
        if act == "R" or act == "r":
            r, d, m = randint(1, 10), randint(1, 10), randint(1, 3)
            zf(f"你选择饶恕。（{r}）", "mild")
            if (r != d) and (r > d) and (r - d >= m):
                zf(f"{name} 接受了你的饶恕。（{d}，{m}）", "excellent")
                sys.exit(0)
            else:
                zf(f"{name} 不为所动。（{d}, {m}）", "horrible")
                print()
        elif act == "G" or act == "g":
            if (char != 5):
                critical = randint(1, 10)
            else:
                critical = 5
            c = randint(1, 10)

            defense = fy
            enemyatk = int(zf(f"请输入 {name} 的攻击力 （int）： ", "choice"))
            enemydef = int(zf(f"请输入 {name} 的防御 （int， JC：{jc}。）： ", "choice"))

            damage1 = ba + atk
            damage2 = ba + enemyatk

            if 4 <= critical <= 6:
                zf(f"太幸运了！直中中心。本次攻击所造成的伤害将增加至原先的 {100 + 100 * crit}% 。", "perfect")
                damage1 *= (1 + (crit if crit >= critical / 10 else critical / 10))
            if 4 <= c <= 6:
                zf(f"糟糕！{name} 这次的攻击会更加猛烈：增加至 {100 + 10 * c}% 。", "fatal")
                damage2 *= (1 + c / 10)

            if critical < 4:
                zf(f"你打偏了，打到了 {name} 旁边 {(abs(5 - critical) / 3):.3f} 米处 。", "mild")
            elif critical > 6:
                zf(f"这一次你打偏了，打到了 {name} 旁边 {(abs(5 - critical) / 3):.3f} 米处 。", "mild")
            if c < 4 or c > 6:
                zf(f"{name} 打偏了，打到了你旁边 {(abs(5 - c) / 3):.3f} 米处 。", "average")

            check = (jc * 2.657) - enemydef  # 敌人 JC - 敌人防御。
            ch = (z_jc * 2.657) - defense  # 角色 JC - 角色防御。

            if check <= 0:
                damage1 = 0
                zf("这次攻击没有造成任何伤害。", "awful")
            else:
                damage1 *= (check / 10) * 1.1
                zf(f"你造成了 {max(damage1, 0):.3f} HP 伤害。", "decent")
                d_hp -= damage1

            if ch <= 0:
                damage2 = 0
                zf("你没有受到任何伤害。", "great")
            else:
                damage2 *= (ch / 10) * 1.1
                zf(f"你受到了 {max(damage2, 0):.3f} HP 伤害。", "horrible")
                zs_hp -= damage2

            if d_hp <= 0:
                zf(f"{name} 败下阵来。", "perfect")
            elif zs_hp <= 0:
                zf("你被打败了。", "destruction")
            else:
                print()
                print(f"第 {count} 回合结束，角色状态。")
                jdt(d_hp, dt_hp, name)
                jdt(zs_hp, zt_hp, char)
                print()
        else:
            raise ValueError

    except KeyboardInterrupt:
        zf("此次运行被键盘中断。跳过本次攻击。", "error")
        print()
    except ValueError:
        zf("无效输入。跳过本次攻击。", "error")
        print()
    except Exception as e:
        zf(f"发生错误： {e} 。跳过本次攻击。", "error")
        print()

def moren(): # 默认设置。
    global zs_hp
    global zt_hp
    global atk
    global crit
    global fy
    global z_jc

    zf("角色的 HP 、 JC 、 攻击力、防御力等将随 ML 而变化。", "mediocre")
    if char == 1:
        zs_hp = f_hp[ml]
        zt_hp = zs_hp
        atk = f_atk[ml]
        crit = f_crit[ml]
        fy = f_fy[ml]
        z_jc = f_jc[ml]
    elif char == 2:
        zs_hp = w_hp[ml]
        zt_hp = zs_hp
        atk = w_atk[ml]
        crit = w_crit[ml]
        fy = w_fy[ml]
        z_jc = w_jc[ml]
    elif char == 3:
        zs_hp = t_hp[ml]
        zt_hp = zs_hp
        atk = t_atk[ml]
        crit = t_crit[ml]
        fy = t_fy[ml]
        z_jc = t_jc[ml]
    elif char == 4:
        zs_hp = z_hp[ml]
        zt_hp = zs_hp
        atk = z_atk[ml]
        crit = z_crit[ml]
        fy = z_fy[ml]
        z_jc = z_jc[ml]
    elif char == 5:
        zs_hp = m_hp
        zt_hp = zs_hp
        atk = m_atk
        crit = m_crit
        fy = m_fy
        z_jc = m_jc

def ziding(): # 自定义设置。
    global zs_hp
    global zt_hp
    global atk
    global crit
    global z_jc

    zs_hp = zf("请输入角色 HP ：", "choice")
    zs_hp = fd(zs_hp, 0, float("inf"))
    zt_hp = zs_hp

    atk = zf("请输入角色攻击力 ：", "choice")
    atk = zs(atk, 0, float("inf"))

    crit = zf("请输入角色暴击率 ：（0 ~ 1 之间的小数）", "choice")
    crit = fd(crit, 0, 1)

    z_jc = zf("请输入角色 JC ：", "choice")
    z_jc = zs(z_jc, 0, float("inf"))

os.system("cls")
while True:
    sz = zf(r"使用默认配置还是自定义设置？（M / Z）", "choice")
    sz = sz.lower()
    if sz != "m" and sz != "z":
        zf(f"非法字符：“{sz}”。请重新输入。", "error")
        print()
    else:
        break

os.system("cls")
zf(r"""
    角色列表:
    1 - Feng_Noti
    2 - With_Kout
    3 - Tsian_Ca
    4 - Zyxa
    5 - Modificationer
""", "choice")

char = zf("请选择角色：", "choice")
char = zs(char, 1, 5)

name = zf("请输入敌人名称：", "choice")

jc = zf(f"请输入 {name} 的 JC ：", "choice")
jc = zs(jc, 0, float("inf"))

d_hp = zf(f"请输入 {name} 的 HP ：", "choice")
d_hp = fd(d_hp, 0, float("inf"))
dt_hp = d_hp # 敌人总 HP。

if (char != 5):
    ml = zf("请输入角色 ML ：", "choice")
    ml = zs(ml, 0, 15)

if sz == "m":
    moren()
else:
    ziding()

os.system("cls")
wuqi = """武器列表
    0 - 手（攻击力 + 1）；
    1 - 笔（攻击力 + 1）；
    2 - 木棍（攻击力 + 2）；
    3 - 鞋（攻击力 + 2）；
    4 - 笔袋（攻击力 + 2）；
    5 - 树枝（攻击力 + 3）；
    6 - 长绳（攻击力 + 3）；
    7 - 球（攻击力 + 3）；
    8 - 垃圾（攻击力 + 3）；
    9 - 斧头（攻击力 + 4）；
    10 - 铁制易拉罐（攻击力 + 4）；
    11 - 玩具刀（攻击力 + 4）；
    12 - 挂钩（攻击力 + 4）；
    13 - 硬帽（攻击力 + 5）；
    14 - 卷尺（攻击力 + 5）；
    15 - 戒尺（攻击力 + 6）；
    16 - 手套（攻击力 + 6）；
    17 - 玩具枪（攻击力 + 7）；
    18 - 重笔记本（攻击力 + 7）；
    19 - 围巾（攻击力 + 7）；
    20 - 茶壶（攻击力 + 7）；
    21 - 纸板（攻击力 + 7）；
    22 - 水枪（攻击力 + 8）；
    23 - 金球（攻击力 + 8）；
    24 - 电线（攻击力 + 9）；
    25 - 平底锅（攻击力 + 9）；
    26 - 电磁枪（攻击力 + 10）；
    27 - 电动木棍（攻击力 + 11）；
    28 - 刀（攻击力 + 12）；
    29 - 扳手（攻击力 + 13）；
    30 - 水果刀（攻击力 + 16）；
    31 - 枪（攻击力 + 18）；
    32 - 锯子（攻击力 + 20）；
    33 - 智能设备（攻击力 + 99）；
    34 - 状态遥控器（攻击力 + 99）；
    35 - 终端（攻击力 + 99）。
"""
hushenfu = """
    0 - 无（防御力 + 1）；
    1 - 布衣（防御力 + 2）；
    2 - 雨衣（防御力 + 3）；
    3 - 防弹衣（防御力 + 5）；
    4 - 圣水（防御力 + 7）；
    5 - 盔甲（防御力 + 8）；
    6 - 避邪符（防御力 + 9）；
    7 - JC 服（防御力 + 11）；
    8 - 蛋形胶囊（防御力 + 14）；
    9 - 智能设备（防御力 + 99）；
    10 - 状态遥控器（防御力 + 99）；
    11 - 终端（防御力 + 99）。
"""
wq_z = [1, 1, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 6, 6, 7, 7, 7, 7, 7, 8, 8, 9, 9, 10, 11, 12, 13, 16, 18, 20, 99, 99, 99]
hsf_z = [1, 2, 3, 5, 7, 8, 9, 11, 14, 99, 99, 99]
if sz.upper() == "M":
    zf(wuqi, "mild")
    zf(hushenfu, "mild")
    print()
    w = zf("请选择合适的武器。", "choice")
    w = zs(w, 0, 35)
    h = zf("请选择合适的护身符。", "choice")
    h = zs(h, 0, 11)
    if (h == 7):
        zf("这会使你的 JC 增加 6 点。", "critical")
        z_jc += 6
    atk += wq_z[w]
    fy += hsf_z[h]
else:
    w = zf("我们可以提供可用的武器列表和护身符列表，是否查看？（是 / 否）", "choice")
    if w.upper() == "是":
        zf("以下可供参考。", "mediocre")
        zf(wuqi, "mild")
        zf(hushenfu, "mild")

os.system("cls")

print("初始状态。")
print()
jdt(d_hp, dt_hp, name) # 显示敌人信息。
jdt(zs_hp, zt_hp, char) # 显示角色信息。
print()

count = 0
while d_hp > 0 and zs_hp > 0:
    count += 1
    zf(f"第 {count} 回合。", "mediocre")
    print()
    if sz == "m":
        m_gj(atk, crit, fy)
    else:
        z_gj(atk, crit, z_jc)
