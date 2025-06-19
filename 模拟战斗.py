# -*- coding: utf-8 -*-
# Made by Modificationer Satelliti.
from random import *
from rich.progress import *
from rich.console import Console
import os
import time
import sys
import math
import webbrowser as wb
import keyboard as kb
cs = Console()

f_hp = [60, 66, 71, 77, 83, 90, 96, 102, 108, 114, 120, 124, 130, 135, 141, 150] # Feng Noti
f_energy = [30, 32, 35, 40, 43, 48, 52, 56, 60, 66, 70, 75, 79, 84, 90, 95] # 精力。
f_fy = [2, 3, 4, 5, 6, 7, 8, 9, 8, 8, 9, 10, 12, 13, 15, 17] # 防御力。
f_atk = [3, 3, 5, 7, 7, 8, 9, 10, 9, 10, 9, 10, 10, 11, 13, 15, 18, 22] # 攻击力。
f_crit = [0.2, 0.21, 0.24, 0.27, 0.3, 0.33, 0.37, 0.4, 0.4, 0.42, 0.43, 0.45, 0.5, 0.5, 0.5, 0.55] # 暴击率。
f_jc = [14, 14, 13, 12, 12, 11, 10, 9, 9, 8, 8, 8, 8, 8, 8, 8] # JC。

w_hp = [57, 59, 62, 65, 69, 72, 75, 79, 83, 87, 90, 94, 97, 100, 103, 107] # Weiz Kaxuan
w_energy = [34, 37, 40, 45, 50, 54, 60, 65, 70, 74, 78, 83, 90, 96, 102, 107]
w_fy = [3, 4, 4, 5, 6, 7, 8, 9, 10, 12, 14, 15, 16, 17, 19, 22]
w_atk = [2, 2, 3, 5, 5, 5, 5, 6, 7, 7, 7, 8, 9, 10, 11, 11]
w_crit = [0.15, 0.15, 0.16, 0.19, 0.2, 0.22, 0.24, 0.25, 0.25, 0.27, 0.28, 0.28, 0.3, 0.3, 0.3, 0.3]
w_jc = [13, 13, 12, 11, 10, 10, 10, 9, 9, 8, 8, 8, 8, 7, 7, 7]

t_hp = [64, 70, 73, 81, 88, 93, 100, 104, 110, 114, 122, 128, 135, 143, 150, 161] # Tsian Cha
t_energy = [25, 26, 28, 30, 33, 36, 41, 48, 50, 55, 60, 65, 73, 68, 73, 76]
t_fy = [2, 3, 4, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 14, 15]
t_atk = [5, 7, 7, 8, 8, 9, 9, 10, 11, 12, 12, 13, 14, 15, 18, 25]
t_crit = [0.5, 0.52, 0.53, 0.54, 0.55, 0.58, 0.6, 0.62, 0.62, 0.65, 0.68, 0.7, 0.75, 0.65, 0.67, 0.7]
t_jc = [16, 15, 14, 13, 13, 12, 12, 11, 11, 11, 10, 10, 10, 10, 10, 10]

z_hp = [59, 62, 65, 68, 72, 76, 80, 84, 88, 93, 98, 102, 108, 113, 116, 120] # Zyxa Wvub
z_energy = [28, 30, 33, 36, 41, 46, 50, 53, 58, 62, 69, 73, 78, 81, 85, 92]
z_fy = [4, 5, 6, 6, 6, 7, 7, 8, 9, 10, 11, 11, 12, 13, 14, 17]
z_atk = [3, 3, 5, 6, 7, 7, 8, 8, 9, 9, 10, 11, 11, 12, 14, 16]
z_crit = [0.26, 0.27, 0.27, 0.3, 0.32, 0.33, 0.35, 0.37, 0.4, 0.4, 0.4, 0.4, 0.42, 0.44, 0.47, 0.5]
z_jc = [15, 15, 13, 12, 12, 11, 11, 9, 9, 9, 9, 9, 9, 9, 9, 9]

sk_hp = [61, 64, 69, 75, 82, 88, 94, 99, 103, 109, 114, 119, 126, 132, 138, 145] # Chala Sklif
sk_energy = [30, 32, 35, 40, 43, 48, 52, 56, 60, 66, 70, 75, 79, 84, 90, 95]
sk_fy = [3, 5, 5, 6, 7, 8, 9, 10, 11, 11, 13, 14, 15, 16, 17, 18]
sk_atk = [4, 5, 5, 6, 8, 8, 9, 9, 10, 11, 11, 12, 12, 12, 14, 15]
sk_crit = [0.3, 0.32, 0.33, 0.36, 0.39, 0.4, 0.43, 0.44, 0.47, 0.5, 0.51, 0.54, 0.56, 0.58, 0.6, 0.6]
sk_jc = [15, 15, 14, 14, 14, 13, 13, 12, 11, 10, 9, 9, 9, 8, 8, 8]

ir_hp = [58, 63, 67, 72, 78, 84, 89, 95, 100, 106, 111, 118, 127, 134, 141, 147] # It Rains
ir_energy = [27, 29, 32, 35, 38, 42, 47, 51, 55, 61, 67, 70, 76, 81, 86, 93]
ir_fy = [4, 5, 6, 6, 7, 9, 9, 10, 10, 11, 13, 14, 15, 15, 17, 18]
ir_atk = [3, 4, 5, 5, 6, 7, 7, 8, 9, 11, 12, 14, 15, 17, 18, 19]
ir_crit = [0.24, 0.26, 0.29, 0.31, 0.34, 0.38, 0.4, 0.42, 0.43, 0.44, 0.46, 0.47, 0.49, 0.5, 0.52, 0.54]
ir_jc = [14, 13, 13, 13, 13, 12, 12, 11, 11, 11, 10, 10, 10, 9, 9, 9]

lin_xi_hp = [62, 65, 70, 74, 80, 86, 91, 97, 102, 105, 109, 116, 121, 127, 133, 140] # Lin Xi
lin_xi_energy = [29, 31, 34, 37, 42, 49, 50, 55, 58, 62, 67, 72, 75, 79, 84, 90]
lin_xi_fy = [6, 8, 9, 9, 10, 12, 13, 13, 14, 16, 17, 17, 18, 20, 21, 22]
lin_xi_atk = [1, 3, 5, 6, 7, 8, 9, 10, 11, 11, 12, 13, 13, 14, 15, 16]
lin_xi_crit = [0.2, 0.21, 0.23, 0.25, 0.27, 0.29, 0.3, 0.32, 0.33, 0.35, 0.37, 0.38, 0.4, 0.42, 0.44, 0.45]
lin_xi_jc = [14, 14, 14, 13, 13, 13, 12, 12, 11, 11, 11, 11, 10, 10, 9, 9]

m_hp = [429, 768, 1022, 1444, 1888, 2367, 3025, 3778, 4400, 5123, 5907, 6666, 7288, 8311, 9298, 1e4] # Modificationer + Satelliti
m_energy = [250, 399, 681, 879, 1000, 1555, 1899, 2467, 3478, 4181, 4777, 5123, 5786, 6539, 7311, 8000]
m_fy = [50, 60, 72, 87, 99, 116, 132, 148, 166, 180, 199, 219, 240, 263, 285, 310]
m_atk = [39, 47, 58, 69, 80, 94, 106, 124, 139, 156, 173, 190, 210, 230, 252, 270]
m_crit = [0.93, 0.94, 0.95, 0.96, 0.97, 0.98, 0.99, 1, 1, 1, 1, 1, 1, 1, 1, 1]
m_jc = [3, 3, 3, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]

x_hp = [188, 267, 381, 495, 599, 708, 826, 934, 1024, 1111, 1209, 1345, 1474, 1589, 1700, 1840] # Xusu Ziye
x_energy = [100, 172, 260, 345, 412, 578, 665, 781, 887, 989, 1090, 1154, 1291, 1401, 1500, 1646]
x_fy = [28, 38, 49, 61, 70, 82, 91, 100, 110, 120, 131, 143, 155, 167, 180, 195]
x_atk = [20, 28, 39, 50, 62, 71, 79, 88, 98, 107, 119, 132, 145, 159, 174, 190]
x_crit = [0.71, 0.74, 0.76, 0.79, 0.81, 0.81, 0.83, 0.85, 0.87, 0.87, 0.9, 0.9, 0.92, 0.93, 0.94, 0.95]
x_jc = [6, 6, 6, 5, 5, 5, 5, 4, 4, 4, 4, 4, 3, 3, 3, 3]

aka_f_hp = [108] # Chi Feng
aka_f_energy = [66]
aka_f_fy = [12]
aka_f_atk = [11]
aka_f_crit = [0.44]
aka_f_jc = [10]

aka_k_hp = [106] # Chi Huo
aka_k_energy = [65]
aka_k_fy = [10]
aka_k_atk = [12]
aka_k_crit = [0.58]
aka_k_jc = [12]

aka_y_hp = [113] # Chi Yan
aka_y_energy = [72]
aka_y_fy = [11]
aka_y_atk = [10]
aka_y_crit = [0.48]
aka_y_jc = [11]

aoi_sa_hp = [103] # Qing Sa
aoi_sa_energy = [67]
aoi_sa_fy = [11]
aoi_sa_atk = [12]
aoi_sa_crit = [0.42]
aoi_sa_jc = [11]

aoi_sh_hp = [123] # Qing Shui
aoi_sh_energy = [81]
aoi_sh_fy = [14]
aoi_sh_atk = [13]
aoi_sh_crit = [0.66]
aoi_sh_jc = [9]

aoi_l_hp = [107] # Qing Lan
aoi_l_energy = [65]
aoi_l_fy = [11]
aoi_l_atk = [11]
aoi_l_crit = [0.48]
aoi_l_jc = [12]

bei_hp = [101] # Bei Hua
bei_energy = [66]
bei_fy = [11]
bei_atk = [13]
bei_crit = [0.51]
bei_jc = [12]

era_hp = [118] # Era
era_energy = [70]
era_fy = [13]
era_atk = [13]
era_crit = [0.59]
era_jc = [12]

ert_hp = [99] # Ert
ert_energy = [68]
ert_fy = [10]
ert_atk = [11]
ert_crit = [0.49]
ert_jc = [12]

he_hp = [94] # Hello14
he_energy = [56]
he_fy = [9]
he_atk = [9]
he_crit = [0.36]
he_jc = [10]

ichi_hp = [105] # Ichi Ryū
ichi_energy = [65]
ichi_fy = [11]
ichi_atk = [11]
ichi_crit = [0.41]
ichi_jc = [11]

# Lin Hua
lin_hua_hp = [104]
lin_hua_energy = [70]
lin_hua_fy = [13]
lin_hua_atk = [10]
lin_hua_crit = [0.51]
lin_hua_jc = [12]

# Notification Withdrawer
n_hp = [404]
n_energy = [404]
n_fy = [24]
n_atk = [40]
n_crit = [0.80]
n_jc = [8]

# Opportunity
o_hp = [139]
o_energy = [92]
o_fy = [16]
o_atk = [18]
o_crit = [0.76]
o_jc = [9]

# Ricky Nanmuzhi
ri_hp = [109]
ri_energy = [74]
ri_fy = [13]
ri_atk = [14]
ri_crit = [0.54]
ri_jc = [11]

people_text = [
    "没有人在身边。",
    "有几个人因我们的对立而前来围观。",
    "有些人在身旁议论着什么。",
    "一些人正在饶有兴致地观看我们的争执。",
    "路旁站满了群众，人们争先恐后地拍照。",
    "有人报警了，警方已经出动。",
]

people_grade = [
    "E+",
    "G-",
    "A",
    "S-",
    "N",
    "DI-",
]

all_names = [
    "Feng Noti",
    "Weiz Kaxuan",
    "Tsian Cha",
    "Zyxa Wvub",
    "Chala Sklif",
    "It Rains",
    "Lin Xi",
    "Modificationer + Satelliti",
    "Xusu Ziye",
    "Chi Feng",
    "Chi Huo",
    "Chi Yan",
    "Qing Sa",
    "Qing Shui",
    "Qing Lan",
    "Bei Hua",
    "Era",
    "Ert",
    "Hello14",
    "Ichi Ryū",
    "Lin Hua",
    "Notification Withdrawer",
    "Opportunity",
    "Ricky Nanmuzhi",
]

color = {
    "F+": "#00ff00", # Fabulous +
    "E+": "#9acd32", # Excellent +
    "E": "#98fb98", # Excellent
    "E-": "#8fbc8f", # Excellent -
    "G+": "#66cdaa", # Good +
    "G": "#20b2aa", # Good
    "G-": "#40e0d0", # Good -
    "DE": "#00ffff", # Decent
    "DE-": "#00bfff", # Decent -
    "A": "#0080ff", # Average
    "A-": "#8470ff", # Average -
    "P": "#a020f0", # Poor
    "P-": "#ba55d3", # Poor -
    "S": "#da70d6", # Serious
    "S-": "#dd20dd", # Serious -
    "C": "#ff00ff", # Critical
    "C-": "#ff69b4", # Critical -
    "N": "#ff1493", # Nightmare
    "N-": "#b03060", # Nightmare -
    "DI-": "#ff0000", # Disaster -
    "DOWN": "#8b1a1a", # Down
    "error": "#8b1a1a",
    "inp": "#ffd700",
    "text": "#ffffff",
}

z_name = [] # 角色名称。
zs_hp = [] # 角色 HP。
zt_hp = [] # 角色总 HP。
zs_energy = [] # 角色精力。
zt_energy = [] # 角色总精力。
zj_atk = [] # 角色攻击力。
zj_crit = [] # 角色暴击率。
zj_fy = [] # 角色防御力。
zj_jc = [] # 角色 JC。

d_name = [] # 敌人名称。
ds_hp = [] # 敌人 HP。
dt_hp = [] # 敌人总 HP。
ds_energy = [] # 敌人精力。
dt_energy = [] # 敌人总精力。
d_atk = [] # 敌人攻击力。
d_fy = [] # 敌人防御力。
d_crit = [] # 敌人暴击率。
d_jc = [] # 敌人 JC。

police_caught = [] # 被警察押走的角色和敌人。
pc_string = ""


turns = 0
police_join = False

try:
    def zf(text, cl):
        if not isinstance(text, str):
            text = str(text)
    
        if "\n" in text:
            text = "\\/ " + text + "/\\"
        else:
            text = "\\/ " + text
            
        text = f"[{cl.upper()}] " + text

        for i in text:
            cs.print(i, style=color[cl], end="")
            time.sleep(0.003)
        return input()

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
                if current >= 0.95 * total:
                    t_color = "F+"
                elif 0.9 * total <= current < 0.95 * total:
                    t_color = "E+"
                elif 0.85 * total <= current < 0.9 * total:
                    t_color = "E"
                elif 0.8 * total <= current < 0.85 * total:
                    t_color = "E-"
                elif 0.75 * total <= current < 0.8 * total:
                    t_color = "G+"
                elif 0.7 * total <= current < 0.75 * total:
                    t_color = "G"
                elif 0.65 * total <= current < 0.7 * total:
                    t_color = "G-"
                elif 0.6 * total <= current < 0.65 * total:
                    t_color = "DE"
                elif 0.55 * total <= current < 0.6 * total:
                    t_color = "DE-"
                elif 0.5 * total <= current < 0.55 * total:
                    t_color = "A"
                elif 0.45 * total <= current < 0.5 * total:
                    t_color = "A-"
                elif 0.4 * total <= current < 0.45 * total:
                    t_color = "P"
                elif 0.35 * total <= current < 0.4 * total:
                    t_color = "P-"
                elif 0.3 * total <= current < 0.35 * total:
                    t_color = "S"
                elif 0.25 * total <= current < 0.3 * total:
                    t_color = "S-"
                elif 0.2 * total <= current < 0.25 * total:
                    t_color = "C"
                elif 0.15 * total <= current < 0.2 * total:
                    t_color = "C-"
                elif 0.1 * total <= current < 0.15 * total:
                    t_color = "N"
                elif 0.05 * total <= current < 0.1 * total:
                    t_color = "N-"
                elif 0 <= current < 0.05 * total:
                    t_color = "DI-"
                else:
                    t_color = "DOWN"
            elif side == "me" and typ == "energy":
                if current > total:
                    t_color = "A"
                elif 0.9 * total <= current <= total:
                    t_color = "A-"
                elif 0.8 * total <= current < 0.9 * total:
                    t_color = "P"
                elif 0.7 * total <= current < 0.8 * total:
                    t_color = "P-"
                elif 0.6 * total <= current < 0.7 * total:
                    t_color = "S"
                elif 0.5 * total <= current < 0.6 * total:
                    t_color = "S-"
                elif 0.4 * total <= current < 0.5 * total:
                    t_color = "C"
                elif 0.3 * total <= current < 0.4 * total:
                    t_color = "C-"
                elif 0.2 * total <= current < 0.3 * total:
                    t_color = "N"
                elif 0.1 * total <= current < 0.2 * total:
                    t_color = "N-"
                elif 0 <= current < 0.1 * total:
                    t_color = "DI-"
                else:
                    t_color = "DOWN"
            elif side == "enemy" and typ == "hp":
                if current >= 0.95 * total:
                    t_color = "DI-"
                elif 0.9 * total <= current < 0.95 * total:
                    t_color = "N-"
                elif 0.85 * total <= current < 0.9 * total:
                    t_color = "N"
                elif 0.8 * total <= current < 0.85 * total:
                    t_color = "C-"
                elif 0.75 * total <= current < 0.8 * total:
                    t_color = "C"
                elif 0.7 * total <= current < 0.75 * total:
                    t_color = "S-"
                elif 0.65 * total <= current < 0.7 * total:
                    t_color = "S"
                elif 0.6 * total <= current < 0.65 * total:
                    t_color = "P-"
                elif 0.55 * total <= current < 0.6 * total:
                    t_color = "P"
                elif 0.5 * total <= current < 0.55 * total:
                    t_color = "A-"
                elif 0.45 * total <= current < 0.5 * total:
                    t_color = "A"
                elif 0.4 * total <= current < 0.45 * total:
                    t_color = "DE-"
                elif 0.35 * total <= current < 0.4 * total:
                    t_color = "DE"
                elif 0.3 * total <= current < 0.35 * total:
                    t_color = "G-"
                elif 0.25 * total <= current < 0.3 * total:
                    t_color = "G"
                elif 0.2 * total <= current < 0.25 * total:
                    t_color = "G+"
                elif 0.15 * total <= current < 0.2 * total:
                    t_color = "E-"
                elif 0.1 * total <= current < 0.15 * total:
                    t_color = "E"
                elif 0.05 * total <= current < 0.1 * total:
                    t_color = "E+"
                elif 0 <= current < 0.05 * total:
                    t_color = "F+"
                else:
                    t_color = "DOWN"
            elif side == "enemy" and typ == "energy":
                if current > total:
                    t_color = "DI-"
                elif 0.9 * total <= current <= total:
                    t_color = "N-"
                elif 0.8 * total <= current < 0.9 * total:
                    t_color = "N"
                elif 0.7 * total <= current < 0.8 * total:
                    t_color = "C-"
                elif 0.6 * total <= current < 0.7 * total:
                    t_color = "C"
                elif 0.5 * total <= current < 0.6 * total:
                    t_color = "S-"
                elif 0.4 * total <= current < 0.5 * total:
                    t_color = "S"
                elif 0.3 * total <= current < 0.4 * total:
                    t_color = "P-"
                elif 0.2 * total <= current < 0.3 * total:
                    t_color = "P"
                elif 0.1 * total <= current < 0.2 * total:
                    t_color = "A-"
                elif 0 <= current < 0.1 * total:
                    t_color = "A"
                else:
                    t_color = "DOWN"

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
                    raise ValueError("不可以输入无穷大。（Infinity）")
                if p <= var <= q:
                    return var
                else:
                    raise ValueError(f"无效输入。请输入一个在 {p} 和 {q} 之间的数字")
            except Exception as e:
                var = zf("请重新输入一个浮点数：", "error")

    def mz():
        ls_string = list("....................")
        ls_range = len(ls_string)

        sys.stdout.write("".join(ls_string))
        sys.stdout.flush()

        l = 0

        for i in range(ls_range):
            if l > 0:
                ls_string[l - 1] = "."
            ls_string[l] = "|"

            sys.stdout.write("\r" + "".join(ls_string))
            sys.stdout.flush()

            l = (l + 1) % ls_range
            time.sleep(0.05)

            if kb.is_pressed("z"):
                break

        return ceil(l / 2)

    def gj():
        try:
            global people_interest, police_join, jd, ls_zord, hushenfu_ord, z_amount, d_amount, zs_energy, ds_energy, zt_energy, dt_energy, zs_hp, ds_hp

            people_interest = False
            mercy_refuse = False
            z_xz = []  # 我方选择敌方编号。
            d_xz = []  # 敌方选择我方编号。
            z_acc = []  # 我方打击精准度。
            d_acc = []  # 敌方打击精准度。
            z_damage = []  # 角色对敌人造成的伤害。
            d_damage = []  # 被选中的敌人对角色造成的伤害。
            z_check = []
            d_check = []
            z_hfhp = []  # 我方恢复的 HP。
            d_hfhp = []  # 敌方恢复的 HP。
            z_hfnl = []  # 我方恢复的能量。
            d_hfnl = []  # 敌方恢复的能量。
            z_skill = []  # 我方使用的技能。
            d_skill = []  # 敌方使用的技能。

            # 初始随机事件。
            if people_interest:
                people_rand = randint(2, 5)
            else:
                people_rand = randint(0, 5)

            zf(people_text[people_rand], people_grade[people_rand])
            match people_rand:
                case 3:
                    people_interest = True
                case 4:
                    zf("**也许我明天就会成为新闻热搜的对象呢！**", "DI-")
                    people_interest = True
                case 5:
                    zf("看来警方已经介入，最好还是快点离开这个地方。", "S")
                    police_join = True
            print()

            # 饶恕 / 攻击选择。
            act = zf("饶恕 / 攻击？（R / G ，默认为 “G”）", "inp")
            act = act.replace(" ", "").lower()
            if act == "r":
                r, d, m = randint(1, 10), randint(1, 10), randint(1, 3)
                zf("你选择饶恕。", "text")
                if (r != d) and (r > d) and (r - d >= m):
                    d_getmercy_ord = randint(0, len(d_name) - 1)
                    zf(f"{d_name[d_getmercy_ord]} 接受了你的饶恕。", "E")
                    print()
                    for lst in [d_name, ds_hp, dt_hp, ds_energy, dt_energy, d_atk, d_crit, d_fy, d_jc]:
                        lst.append(lst.pop(d_getmercy_ord))
                    d_amount -= 1
                    if d_amount == 0:
                        zf("模拟结束。你成功地饶恕了所有敌人。", "F+")
                        sys.exit(0)
                else:
                    zf("敌人不为所动。看来你不得不与其战斗……", "N-")
                    mercy_refuse = True

            if act == "g" or act == "" or mercy_refuse == True:
                print()
                zf("我方选择攻击目标。", "text")
                for i in range(z_amount):
                    xz_zt = zf(f"{i} - {z_name[i]} 要攻击谁？", "inp")
                    xz_zt = zs(xz_zt, 0, d_amount - 1)
                    z_xz.append(xz_zt)
                    zf(f"其决定攻击 {xz_zt} - {d_name[z_xz[i]]}。", "text")

                print()
                zf("敌方选择攻击目标。", "text")
                for j in range(d_amount):
                    xz_dt = zf(f"{j} - {d_name[j]} 要攻击谁？", "inp")
                    xz_dt = zs(xz_dt, 0, z_amount - 1)
                    d_xz.append(xz_dt)
                    zf(f"其决定攻击 {xz_dt} - {z_name[d_xz[j]]}。", "text")

                z_check = [zj_jc[k1] * 3.306 - zj_fy[k1] for k1 in range(z_amount)]
                d_check = [d_jc[l1] * 3.306 - d_fy[l1] for l1 in range(d_amount)]

                # 模拟攻击。
                print()
                for k in range(z_amount):
                    z_damage.append(randint(6, 9) + zj_atk[k])
                    if z_name[k] == "Modificationer + Satelliti" or z_name[k] == "Xusu Ziye":
                        z_acc.append(5)
                        zf(f"{k} - {z_name[k]} 打出了精准的一招，这对其来说并不是什么难事。", "F+")
                        z_damage[k] *= (1 + zj_crit[k] / 10)
                    else:
                        ls_zacc = mz()
                        if 4 <= ls_zacc <= 6:
                            zf(f"{k} - {z_name[k]} 打出了精准的一招。", "E-")
                            z_damage[k] *= (1 + zj_crit[k] / 10)
                        else:
                            zf(f"{k} - {z_name[k]} 未能精准命中。", "A")
                        z_acc.append(ls_zacc)

                print()
                for l in range(d_amount):
                    d_damage.append(randint(6, 9) + d_atk[l])
                    if d_name[l] == "Modificationer + Satelliti" or d_name[l] == "Xusu Ziye":
                        d_acc.append(5)
                        zf(f"{l} - {d_name[l]} 打出了精准的一招，这对其来说并不是什么难事。", "DI-")
                        d_damage[l] *= (1 + d_crit[l] / 10)
                    else:
                        ls_dacc = mz()
                        if 4 <= ls_dacc <= 6:
                            zf(f"{l} - {d_name[l]} 打出了精准的一招。", "C-")
                            d_damage[l] *= (1 + d_crit[l] / 10)
                        else:
                            zf(f"{l} - {d_name[l]} 未能精准命中。", "A-")
                        d_acc.append(ls_dacc)

                print()
                # 计算实际造成的伤害。
                for m in range(z_amount):
                    if d_check[z_xz[m]] <= 0:
                        z_damage[m] = 0
                    z_damage[m] *= (d_check[z_xz[m]] / 10) * uniform(0.95, 1.05)
                    zf(f"{m} - {z_name[m]} 对 {z_xz[m]} - {d_name[z_xz[m]]} 造成了 {max(abs(z_damage[m]), 0):.3f} HP 伤害。", "text")
                    ds_hp[z_xz[m]] -= z_damage[m]

                print()
                for n in range(d_amount):
                    if z_check[d_xz[n]] <= 0:
                        d_damage[n] = 0
                    d_damage[n] *= (z_check[d_xz[n]] / 10) * uniform(0.95, 1.05)
                    zf(f"{n} - {d_name[n]} 对 {d_xz[n]} - {z_name[d_xz[n]]} 造成了 {max(abs(d_damage[n]), 0):.3f} HP 伤害。", "text")
                    zs_hp[d_xz[n]] -= d_damage[n]

                # 恢复阶段。
                for a in range(100):
                    z_hfnl.append(0)
                    d_hfnl.append(0)

                print()
                for o1 in range(d_amount):
                    if d_damage[o1] == 0:
                        if z_hfnl[d_xz[o1]] == 0:
                            z_hfnl[d_xz[o1]] = round(uniform(0.05, 0.11) * zt_energy[d_xz[o1]], 3)
                            zs_energy[d_xz[o1]] += z_hfnl[d_xz[o1]]
                            zf(f"{o1} - {z_name[d_xz[o1]]} 没有受到伤害，恢复了 {z_hfnl[d_xz[o1]]:.3f} ENERGY。", "E+")

                for o in range(z_amount):
                    if zs_energy[o] > 0:
                        z_hfhp.append(round(uniform(0.05, 0.11) * zt_hp[o], 3))
                        if zs_hp[o] == zt_hp[o]:
                            zf(f"{o} - {z_name[o]} HP 已满，恢复了 {z_hfhp[o]:.3f} ENERGY。", "E+")
                            zs_energy[o] += z_hfhp[o]
                            z_hfnl[o] += z_hfhp[o]
                            z_hfhp[o] = 0
                        else:
                            if zs_hp[o] + z_hfhp[o] > zt_hp[o] and zs_energy[o] - z_hfhp[o] > 0:
                                zs_hp[o] = zt_hp[o]
                                z_hfhp[o] -= (zt_hp[o] - zs_hp[o])
                                zs_energy[o] -= z_hfhp[o]
                                zf(f"{o} - {z_name[o]} 恢复了 {z_hfhp[o]:.3f} HP。", "E")
                            elif zs_energy[o] - z_hfhp[o] <= 0:
                                z_hfhp[o] -= abs(zs_energy[o] - z_hfhp[o])
                                zs_energy[o] = 0
                                zf(f"{o} - {z_name[o]} 虽恢复了 {z_hfhp[o]:.3f} HP，但再也没有任何精力了。", "A-")
                            else:
                                zs_hp[o] += z_hfhp[o]
                                zs_energy[o] -= z_hfhp[o]
                                zf(f"{o} - {z_name[o]} 恢复了 {z_hfhp[o]:.3f} HP。", "G")
                    else:
                        z_hfhp.append(0)

                print()
                for p1 in range(z_amount):
                    if z_damage[p1] == 0:
                        if d_hfnl[z_xz[p1]] == 0:
                            d_hfnl[z_xz[p1]] = round(uniform(0.05, 0.11) * dt_energy[z_xz[p1]], 3)
                            ds_energy[z_xz[p1]] += d_hfnl[z_xz[p1]]
                            zf(f"{p1} - {d_name[z_xz[p1]]} 没有受到伤害，恢复了 {d_hfnl[z_xz[p1]]:.3f} ENERGY。", "N-")

                for p in range(d_amount):
                    if ds_energy[p] > 0:
                        d_hfhp.append(round(uniform(0.05, 0.11) * dt_hp[p], 3))
                        if ds_hp[p] == dt_hp[p]:
                            zf(f"{p} - {d_name[p]} HP 已满，恢复了 {d_hfhp[p]:.3f} ENERGY。", "N-")
                            ds_energy[p] += d_hfhp[p]
                            d_hfnl[p] += d_hfhp[p]
                            d_hfhp[p] = 0
                        else:
                            if ds_hp[p] + d_hfhp[p] > dt_hp[p] and ds_energy[p] - d_hfhp[p] > 0:
                                ds_hp[p] = dt_hp[p]
                                d_hfhp[p] -= (dt_hp[p] - ds_hp[p])
                                ds_energy[p] -= d_hfhp[p]
                                zf(f"{p} - {d_name[p]} 恢复了 {d_hfhp[p]:.3f} HP。", "S")
                            elif ds_energy[p] - d_hfhp[p] <= 0:
                                d_hfhp[p] -= abs(ds_energy[p] - d_hfhp[p])
                                ds_energy[p] = 0
                                zf(f"{p} - {d_name[p]} 虽恢复了 {d_hfhp[p]:.3f} HP，但再也没有任何精力了。", "A")
                            else:
                                ds_hp[p] += d_hfhp[p]
                                ds_energy[p] -= d_hfhp[p]
                                zf(f"{p} - {d_name[p]} 恢复了 {d_hfhp[p]:.3f} HP。", "C-")
                    else:
                        d_hfhp.append(0)

                # 检查敌人状态。
                for s in range(len(d_xz) - 1, -1, -1):
                    if ds_hp[s] <= 0:
                        print()
                        zf(f"{s} - {d_name[s]} 败下阵来。", "F+")
                        for lst in [d_name, ds_hp, dt_hp, ds_energy, dt_energy, d_atk, d_crit, d_fy, d_jc]:
                            lst.pop(s)
                        d_amount -= 1
                        if d_amount == 0:
                            zf("模拟结束。你成功地打败了所有敌人。", "F+")
                            jd = 3
                            sys.exit(0)

                # 检查角色状态。
                for t in range(len(z_xz) - 1, -1, -1):
                    if zs_hp[t] <= 0:
                        print()
                        zf(f"{t} - {z_name[t]} 败下阵来。", "DI-")
                        for lst in [z_name, zs_hp, zt_hp, zs_energy, zt_energy, z_atk, z_crit, z_fy, z_jc]:
                            lst.pop(t)
                        z_amount -= 1
                        if z_amount == 0:
                            zf("模拟结束。你被敌人全部击败。", "DI-")
                            jd = 2
                            sys.exit(0)

                if jd != 3:
                    print()
                    print(f"第 {turns} 回合结束，角色状态。")
                    print(f"我方阵营：还剩 {z_amount} 名角色。")
                    for u in range(z_amount):
                        jdt(zs_hp[u], zt_hp[u], f"{u} - {z_name[u]}", "hp", "me")
                        jdt(zs_energy[u], zt_energy[u], f"{u} - {z_name[u]}", "energy", "me")
                        print()

                    print(f"敌方阵营：还剩 {d_amount} 名角色。")
                    for v in range(d_amount):
                        jdt(ds_hp[v], dt_hp[v], f"{v} - {d_name[v]}", "hp", "enemy")
                        jdt(ds_energy[v], dt_energy[v], f"{v} - {d_name[v]}", "energy", "enemy")
                        print()

                    zs_energy = [round(e, 3) for e in zs_energy]
                    ds_energy = [round(e, 3) for e in ds_energy]

        except KeyboardInterrupt:
            zf("此次运行被键盘中断。跳过本次攻击。", "error")
            print()
        except ValueError:
            zf("无效输入。跳过本次攻击。", "error")
            print()

    # 程序开始。
    os.system("cls")
    try:
        start = input("""注意！

        在运行本程序前，确保你至少安装了 Python 3.10 和 rich 库。
        若 Python 版本低于 3.10，请输入 “0”；
        若没有安装 rich 库或 keyboard 库，请输入 “1”；
        若没有需求，请按下 Enter 键继续。

        接下来是本程序的一些说明。
        以 “\/ [INP]” 开头的文字需要你输入。
        本程序的所有输入内容均不区分大小写。（输入角色和敌人名称时除外）
        以 “\/ [ERROR]” 开头的文字表示程序运行时出现错误。

        \/ [INP] 等待操作：""")
        if start == "0":
            os.system("python -m pip install --upgrade pip")
            wb.open("https://www.python.org/downloads/")
            print()
            zf("在下载完成后请重新运行本程序。按任意键退出程序。", "text")
            sys.exit(0)
        elif start == "1":
            os.system("pip install rich")
            os.system("python -m pip install --upgrade rich")
            os.system("pip install keyboard")
            os.system("python -m pip install --upgrade keyboard")
            print()
            zf("接下来请重新运行本程序。按任意键退出程序。", "text")
            sys.exit(0)
    except KeyboardInterrupt:
        sys.exit(0)
    except EOFError:
        sys.exit(0)

    os.system("cls")
    while True:
        sz = zf(r"对于角色的信息，使用内置的配置还是自行输入信息？（M / Z）", "inp")
        sz = sz.lower().replace(" ", "")
        if sz != "m" and sz != "z":
            zf(f"非法字符：“{sz}”。请重新输入。", "error")
            print()
        else:
            break

    print()
    while True:
        qr1 = zf("接下来你将输入敌人信息。使用内置的配置还是自行输入敌人信息？（M / Z）", "inp")
        qr1 = qr1.replace(" ", "").lower()
        if qr1 != "m" and qr1 != "z":
            zf(f"非法字符：“{qr1}”。请重新输入。", "error")
            print()
        else:
            break

    print()
    if qr1 == "m":
        zf("""
    敌人列表：
    1 - Feng Noti；
    2 - Weiz Kaxuan；
    3 - Tsian Cha；
    4 - Zyxa Wvub；
    5 - Chala Sklif；
    6 - It Rains；
    7 - Lin Xi；
    8 - Modificationer + Satelliti；
    9 - Xusu Ziye；
    10 - Chi Feng；
    11 - Chi Huo；
    12 - Chi Yan；
    13 - Qing Sa；
    14 - Qing Shui；
    15 - Qing Lan；
    16 - Bei Hua；
    17 - Era；
    18 - Ert；
    19 - Hello14；
    20 - Ichi Ryū；
    21 - Lin Hua；
    22 - Notification Withdrawer；
    23 - Opportunity；
    24 - Ricky Nanmuzhi。
""", "text")

        d_amount = zf("请输入敌人数量：（该数值上限为 9）", "inp")
        d_amount = zs(d_amount, 1, 9)
        for i in range(d_amount):
            d_num = zf(f"请选择第 {i + 1} 个敌人：", "inp")
            d_num = zs(d_num, 1, 24)
            d_name.append(all_names[d_num - 1])
    
            if 1 <= d_num <= 9:
                ls_dml = zf("你还需要输入敌人的 ML：", "inp")  # 敌人 ML。
                ls_dml = zs(ls_dml, 0, 15)
            else:
                ls_dml = 0
    
            match d_num:
                case 1:
                    ds_hp.append(f_hp[ls_dml])  # 敌人 HP。
                    dt_hp.append(ds_hp[i])  # 敌人总 HP。
                    ds_energy.append(f_energy[ls_dml])  # 敌人精力。
                    dt_energy.append(ds_energy[i])  # 敌人总精力。
                    d_atk.append(f_atk[ls_dml])  # 敌人攻击力。
                    d_fy.append(f_fy[ls_dml])  # 敌人防御力。
                    d_crit.append(f_crit[ls_dml])  # 敌人暴击率。
                    d_jc.append(f_jc[ls_dml])  # 敌人 JC。
                case 2:
                    ds_hp.append(w_hp[ls_dml])
                    dt_hp.append(ds_hp[i])
                    ds_energy.append(w_energy[ls_dml])
                    dt_energy.append(ds_energy[i])
                    d_atk.append(w_atk[ls_dml])
                    d_fy.append(w_fy[ls_dml])
                    d_crit.append(w_crit[ls_dml])
                    d_jc.append(w_jc[ls_dml])
                case 3:
                    ds_hp.append(t_hp[ls_dml])
                    dt_hp.append(ds_hp[i])
                    ds_energy.append(t_energy[ls_dml])
                    dt_energy.append(ds_energy[i])
                    d_atk.append(t_atk[ls_dml])
                    d_fy.append(t_fy[ls_dml])
                    d_crit.append(t_crit[ls_dml])
                    d_jc.append(t_jc[ls_dml])
                case 4:
                    ds_hp.append(z_hp[ls_dml])
                    dt_hp.append(ds_hp[i])
                    ds_energy.append(z_energy[ls_dml])
                    dt_energy.append(ds_energy[i])
                    d_atk.append(z_atk[ls_dml])
                    d_fy.append(z_fy[ls_dml])
                    d_crit.append(z_crit[ls_dml])
                    d_jc.append(z_jc[ls_dml])
                case 5:
                    ds_hp.append(sk_hp[ls_dml])
                    dt_hp.append(ds_hp[i])
                    ds_energy.append(sk_energy[ls_dml])
                    dt_energy.append(ds_energy[i])
                    d_atk.append(sk_atk[ls_dml])
                    d_fy.append(sk_fy[ls_dml])
                    d_crit.append(sk_crit[ls_dml])
                    d_jc.append(sk_jc[ls_dml])
                case 6:
                    ds_hp.append(ir_hp[ls_dml])
                    dt_hp.append(ds_hp[i])
                    ds_energy.append(ir_energy[ls_dml])
                    dt_energy.append(ds_energy[i])
                    d_atk.append(ir_atk[ls_dml])
                    d_fy.append(ir_fy[ls_dml])
                    d_crit.append(ir_crit[ls_dml])
                    d_jc.append(ir_jc[ls_dml])
                case 7:
                    ds_hp.append(lin_xi_hp[ls_dml])
                    dt_hp.append(ds_hp[i])
                    ds_energy.append(lin_xi_energy[ls_dml])
                    dt_energy.append(ds_energy[i])
                    d_atk.append(lin_xi_atk[ls_dml])
                    d_fy.append(lin_xi_fy[ls_dml])
                    d_crit.append(lin_xi_crit[ls_dml])
                    d_jc.append(lin_xi_jc[ls_dml])
                case 8:
                    ds_hp.append(m_hp[ls_dml])
                    dt_hp.append(ds_hp[i])
                    ds_energy.append(m_energy[ls_dml])
                    dt_energy.append(ds_energy[i])
                    d_atk.append(m_atk[ls_dml])
                    d_fy.append(m_fy[ls_dml])
                    d_crit.append(m_crit[ls_dml])
                    d_jc.append(m_jc[ls_dml])
                case 9:
                    ds_hp.append(x_hp[ls_dml])
                    dt_hp.append(ds_hp[i])
                    ds_energy.append(x_energy[ls_dml])
                    dt_energy.append(ds_energy[i])
                    d_atk.append(x_atk[ls_dml])
                    d_fy.append(x_fy[ls_dml])
                    d_crit.append(x_crit[ls_dml])
                    d_jc.append(x_jc[ls_dml])
                case 10:
                    ds_hp.append(aka_f_hp[ls_dml])
                    dt_hp.append(ds_hp[i])
                    ds_energy.append(aka_f_energy[ls_dml])
                    dt_energy.append(ds_energy[i])
                    d_atk.append(aka_f_atk[ls_dml])
                    d_fy.append(aka_f_fy[ls_dml])
                    d_crit.append(aka_f_crit[ls_dml])
                    d_jc.append(aka_f_jc[ls_dml])
                case 11:
                    ds_hp.append(aka_k_hp[ls_dml])
                    dt_hp.append(ds_hp[i])
                    ds_energy.append(aka_k_energy[ls_dml])
                    dt_energy.append(ds_energy[i])
                    d_atk.append(aka_k_atk[ls_dml])
                    d_fy.append(aka_k_fy[ls_dml])
                    d_crit.append(aka_k_crit[ls_dml])
                    d_jc.append(aka_k_jc[ls_dml])
                case 12:
                    ds_hp.append(aka_y_hp[ls_dml])
                    dt_hp.append(ds_hp[i])
                    ds_energy.append(aka_y_energy[ls_dml])
                    dt_energy.append(ds_energy[i])
                    d_atk.append(aka_y_atk[ls_dml])
                    d_fy.append(aka_y_fy[ls_dml])
                    d_crit.append(aka_y_crit[ls_dml])
                    d_jc.append(aka_y_jc[ls_dml])
                case 13:
                    ds_hp.append(aoi_sa_hp[ls_dml])
                    dt_hp.append(ds_hp[i])
                    ds_energy.append(aoi_sa_energy[ls_dml])
                    dt_energy.append(ds_energy[i])
                    d_atk.append(aoi_sa_atk[ls_dml])
                    d_fy.append(aoi_sa_fy[ls_dml])
                    d_crit.append(aoi_sa_crit[ls_dml])
                    d_jc.append(aoi_sa_jc[ls_dml])
                case 14:
                    ds_hp.append(aoi_sh_hp[ls_dml])
                    dt_hp.append(ds_hp[i])
                    ds_energy.append(aoi_sh_energy[ls_dml])
                    dt_energy.append(ds_energy[i])
                    d_atk.append(aoi_sh_atk[ls_dml])
                    d_fy.append(aoi_sh_fy[ls_dml])
                    d_crit.append(aoi_sh_crit[ls_dml])
                    d_jc.append(aoi_sh_jc[ls_dml])
                case 15:
                    ds_hp.append(aoi_l_hp[ls_dml])
                    dt_hp.append(ds_hp[i])
                    ds_energy.append(aoi_l_energy[ls_dml])
                    dt_energy.append(ds_energy[i])
                    d_atk.append(aoi_l_atk[ls_dml])
                    d_fy.append(aoi_l_fy[ls_dml])
                    d_crit.append(aoi_l_crit[ls_dml])
                    d_jc.append(aoi_l_jc[ls_dml])
                case 16:
                    ds_hp.append(bei_hp[ls_dml])
                    dt_hp.append(ds_hp[i])
                    ds_energy.append(bei_energy[ls_dml])
                    dt_energy.append(ds_energy[i])
                    d_atk.append(bei_atk[ls_dml])
                    d_fy.append(bei_fy[ls_dml])
                    d_crit.append(bei_crit[ls_dml])
                    d_jc.append(bei_jc[ls_dml])
                case 17:
                    ds_hp.append(era_hp[ls_dml])
                    dt_hp.append(ds_hp[i])
                    ds_energy.append(era_energy[ls_dml])
                    dt_energy.append(ds_energy[i])
                    d_atk.append(era_atk[ls_dml])
                    d_fy.append(era_fy[ls_dml])
                    d_crit.append(era_crit[ls_dml])
                    d_jc.append(era_jc[ls_dml])
                case 18:
                    ds_hp.append(ert_hp[ls_dml])
                    dt_hp.append(ds_hp[i])
                    ds_energy.append(ert_energy[ls_dml])
                    dt_energy.append(ds_energy[i])
                    d_atk.append(ert_atk[ls_dml])
                    d_fy.append(ert_fy[ls_dml])
                    d_crit.append(ert_crit[ls_dml])
                    d_jc.append(ert_jc[ls_dml])
                case 19:
                    ds_hp.append(he_hp[ls_dml])
                    dt_hp.append(ds_hp[i])
                    ds_energy.append(he_energy[ls_dml])
                    dt_energy.append(ds_energy[i])
                    d_atk.append(he_atk[ls_dml])
                    d_fy.append(he_fy[ls_dml])
                    d_crit.append(he_crit[ls_dml])
                    d_jc.append(he_jc[ls_dml])
                case 20:
                    ds_hp.append(ichi_hp[ls_dml])
                    dt_hp.append(ds_hp[i])
                    ds_energy.append(ichi_energy[ls_dml])
                    dt_energy.append(ds_energy[i])
                    d_atk.append(ichi_atk[ls_dml])
                    d_fy.append(ichi_fy[ls_dml])
                    d_crit.append(ichi_crit[ls_dml])
                    d_jc.append(ichi_jc[ls_dml])
                case 21:
                    ds_hp.append(lin_hua_hp[ls_dml])
                    dt_hp.append(ds_hp[i])
                    ds_energy.append(lin_hua_energy[ls_dml])
                    dt_energy.append(ds_energy[i])
                    d_atk.append(lin_hua_atk[ls_dml])
                    d_fy.append(lin_hua_fy[ls_dml])
                    d_crit.append(lin_hua_crit[ls_dml])
                    d_jc.append(lin_hua_jc[ls_dml])
                case 22:
                    ds_hp.append(n_hp[ls_dml])
                    dt_hp.append(ds_hp[i])
                    ds_energy.append(n_energy[ls_dml])
                    dt_energy.append(ds_energy[i])
                    d_atk.append(n_atk[ls_dml])
                    d_fy.append(n_fy[ls_dml])
                    d_crit.append(n_crit[ls_dml])
                    d_jc.append(n_jc[ls_dml])
                case 23:
                    ds_hp.append(o_hp[ls_dml])
                    dt_hp.append(ds_hp[i])
                    ds_energy.append(o_energy[ls_dml])
                    dt_energy.append(ds_energy[i])
                    d_atk.append(o_atk[ls_dml])
                    d_fy.append(o_fy[ls_dml])
                    d_crit.append(o_crit[ls_dml])
                    d_jc.append(o_jc[ls_dml])
                case 24:
                    ds_hp.append(ri_hp[ls_dml])
                    dt_hp.append(ds_hp[i])
                    ds_energy.append(ri_energy[ls_dml])
                    dt_energy.append(ds_energy[i])
                    d_atk.append(ri_atk[ls_dml])
                    d_fy.append(ri_fy[ls_dml])
                    d_crit.append(ri_crit[ls_dml])
                    d_jc.append(ri_jc[ls_dml])
        os.system("cls")

    else:
        d_amount = zf("请输入敌人数量：（该数值上限为 9）", "inp")
        d_amount = zs(d_amount, 1, 9)
        for j in range(d_amount):
            d_name.append(zf("请输入敌人名称：", "inp"))

            ls_dhp = zf(f"请输入 {d_name[j]} 的 HP ：", "inp")
            ls_dhp = fd(ls_dhp, 1, float("inf"))
            ds_hp.append(ls_dhp)
            dt_hp.append(ls_dhp)
        
            ls_denergy = zf(f"请输入 {d_name[j]} 的 ENERGY：", "inp")
            ls_denergy = fd(ls_denergy, 1, float("inf"))
            ds_energy.append(ls_denergy)
            dt_energy.append(ls_denergy)

            ls_dfy = zf(f"请输入 {d_name[j]} 的防御力 ：", "inp")
            ls_dfy = zs(ls_dfy, 1, float("inf"))
            d_fy.append(ls_dfy)

            ls_datk = zf(f"请输入 {d_name[j]} 的攻击力 ：", "inp")
            ls_datk = zs(ls_datk, 1, float("inf"))
            d_atk.append(ls_datk)

            ls_dcrit = zf(f"请输入 {d_name[j]} 的暴击率 ：", "inp")
            ls_dcrit = fd(ls_dcrit, 0.01, 1)
            d_crit.append(ls_dcrit)

            ls_djc = zf(f"请输入 {d_name[j]} 的 JC ：", "inp")
            ls_djc = zs(ls_djc, 1, float("inf"))
            d_jc.append(ls_djc)

            print()
        os.system("cls")

    if sz == "m":
        zf("角色的 HP 、 JC 、 攻击力、防御力等将随 ML 而变化。", "text")
        zf(r"""
    角色列表：
    1 - Feng Noti；
    2 - Weiz Kaxuan；
    3 - Tsian Cha；
    4 - Zyxa Wvub；
    5 - Chala Sklif；
    6 - It Rains；
    7 - Lin Xi；
    8 - Modificationer + Satelliti；
    9 - Xusu Ziye；
    10 - Chi Feng；
    11 - Chi Huo；
    12 - Chi Yan；
    13 - Qing Sa；
    14 - Qing Shui；
    15 - Qing Lan；
    16 - Bei Hua；
    17 - Era；
    18 - Ert；
    19 - Hello14；
    20 - Ichi Ryū；
    21 - Lin Hua；
    22 - Notification Withdrawer；
    23 - Opportunity；
    24 - Ricky Nanmuzhi。
""", "text")

        z_amount = zf("请输入角色数量：（该数值上限为 9）", "inp")
        z_amount = zs(z_amount, 1, 9)
        for i in range(z_amount):
            z_num = zf(f"请输入第 {i + 1} 个角色的编号：", "inp")
            z_num = zs(z_num, 1, 24)
            z_name.append(all_names[z_num - 1])

            if 1 <= z_num <= 9:
                ls_zml = zf("你还需要输入角色的 ML ：", "inp")
                ls_zml = zs(ls_zml, 0, 15)
            else:
                ls_zml = 0

            match z_num:
                case 1:
                    zs_hp.append(f_hp[ls_zml])
                    zt_hp.append(f_hp[ls_zml])
                    zs_energy.append(f_energy[ls_zml])
                    zt_energy.append(f_energy[ls_zml])
                    zj_atk.append(f_atk[ls_zml])
                    zj_crit.append(f_crit[ls_zml])
                    zj_fy.append(f_fy[ls_zml])
                    zj_jc.append(f_jc[ls_zml])
                case 2:
                    zs_hp.append(w_hp[ls_zml])
                    zt_hp.append(w_hp[ls_zml])
                    zs_energy.append(w_energy[ls_zml])
                    zt_energy.append(w_energy[ls_zml])
                    zj_atk.append(w_atk[ls_zml])
                    zj_crit.append(w_crit[ls_zml])
                    zj_fy.append(w_fy[ls_zml])
                    zj_jc.append(w_jc[ls_zml])
                case 3:
                    zs_hp.append(t_hp[ls_zml])
                    zt_hp.append(t_hp[ls_zml])
                    zs_energy.append(t_energy[ls_zml])
                    zt_energy.append(t_energy[ls_zml])
                    zj_atk.append(t_atk[ls_zml])
                    zj_crit.append(t_crit[ls_zml])
                    zj_fy.append(t_fy[ls_zml])
                    zj_jc.append(t_jc[ls_zml])
                case 4:
                    zs_hp.append(z_hp[ls_zml])
                    zt_hp.append(z_hp[ls_zml])
                    zs_energy.append(z_energy[ls_zml])
                    zt_energy.append(z_energy[ls_zml])
                    zj_atk.append(z_atk[ls_zml])
                    zj_crit.append(z_crit[ls_zml])
                    zj_fy.append(z_fy[ls_zml])
                    zj_jc.append(z_jc[ls_zml])
                case 5:
                    zs_hp.append(sk_hp[ls_zml])
                    zt_hp.append(sk_hp[ls_zml])
                    zs_energy.append(sk_energy[ls_zml])
                    zt_energy.append(sk_energy[ls_zml])
                    zj_atk.append(sk_atk[ls_zml])
                    zj_crit.append(sk_crit[ls_zml])
                    zj_fy.append(sk_fy[ls_zml])
                    zj_jc.append(sk_jc[ls_zml])
                case 6:
                    zs_hp.append(ir_hp[ls_zml])
                    zt_hp.append(ir_hp[ls_zml])
                    zs_energy.append(ir_energy[ls_zml])
                    zt_energy.append(ir_energy[ls_zml])
                    zj_atk.append(ir_atk[ls_zml])
                    zj_crit.append(ir_crit[ls_zml])
                    zj_fy.append(ir_fy[ls_zml])
                    zj_jc.append(ir_jc[ls_zml])
                case 7:
                    zs_hp.append(lin_xi_hp[ls_zml])
                    zt_hp.append(lin_xi_hp[ls_zml])
                    zs_energy.append(lin_xi_energy[ls_zml])
                    zt_energy.append(lin_xi_energy[ls_zml])
                    zj_atk.append(lin_xi_atk[ls_zml])
                    zj_crit.append(lin_xi_crit[ls_zml])
                    zj_fy.append(lin_xi_fy[ls_zml])
                    zj_jc.append(lin_xi_jc[ls_zml])
                case 8:
                    zs_hp.append(m_hp[ls_zml])
                    zt_hp.append(m_hp[ls_zml])
                    zs_energy.append(m_energy[ls_zml])
                    zt_energy.append(m_energy[ls_zml])
                    zj_atk.append(m_atk[ls_zml])
                    zj_crit.append(m_crit[ls_zml])
                    zj_fy.append(m_fy[ls_zml])
                    zj_jc.append(m_jc[ls_zml])
                case 9:
                    zs_hp.append(x_hp[ls_zml])
                    zt_hp.append(x_hp[ls_zml])
                    zs_energy.append(x_energy[ls_zml])
                    zt_energy.append(x_energy[ls_zml])
                    zj_atk.append(x_atk[ls_zml])
                    zj_crit.append(x_crit[ls_zml])
                    zj_fy.append(x_fy[ls_zml])
                    zj_jc.append(x_jc[ls_zml])
                case 10:
                    zs_hp.append(aka_f_hp[ls_zml])
                    zt_hp.append(aka_f_hp[ls_zml])
                    zs_energy.append(aka_f_energy[ls_zml])
                    zt_energy.append(aka_f_energy[ls_zml])
                    zj_atk.append(aka_f_atk[ls_zml])
                    zj_crit.append(aka_f_crit[ls_zml])
                    zj_fy.append(aka_f_fy[ls_zml])
                    zj_jc.append(aka_f_jc[ls_zml])
                case 11:
                    zs_hp.append(aka_k_hp[ls_zml])
                    zt_hp.append(aka_k_hp[ls_zml])
                    zs_energy.append(aka_k_energy[ls_zml])
                    zt_energy.append(aka_k_energy[ls_zml])
                    zj_atk.append(aka_k_atk[ls_zml])
                    zj_crit.append(aka_k_crit[ls_zml])
                    zj_fy.append(aka_k_fy[ls_zml])
                    zj_jc.append(aka_k_jc[ls_zml])
                case 12:
                    zs_hp.append(aka_y_hp[ls_zml])
                    zt_hp.append(aka_y_hp[ls_zml])
                    zs_energy.append(aka_y_energy[ls_zml])
                    zt_energy.append(aka_y_energy[ls_zml])
                    zj_atk.append(aka_y_atk[ls_zml])
                    zj_crit.append(aka_y_crit[ls_zml])
                    zj_fy.append(aka_y_fy[ls_zml])
                    zj_jc.append(aka_y_jc[ls_zml])
                case 13:
                    zs_hp.append(aoi_sa_hp[ls_zml])
                    zt_hp.append(aoi_sa_hp[ls_zml])
                    zs_energy.append(aoi_sa_energy[ls_zml])
                    zt_energy.append(aoi_sa_energy[ls_zml])
                    zj_atk.append(aoi_sa_atk[ls_zml])
                    zj_crit.append(aoi_sa_crit[ls_zml])
                    zj_fy.append(aoi_sa_fy[ls_zml])
                    zj_jc.append(aoi_sa_jc[ls_zml])
                case 14:
                    zs_hp.append(aoi_sh_hp[ls_zml])
                    zt_hp.append(aoi_sh_hp[ls_zml])
                    zs_energy.append(aoi_sh_energy[ls_zml])
                    zt_energy.append(aoi_sh_energy[ls_zml])
                    zj_atk.append(aoi_sh_atk[ls_zml])
                    zj_crit.append(aoi_sh_crit[ls_zml])
                    zj_fy.append(aoi_sh_fy[ls_zml])
                    zj_jc.append(aoi_sh_jc[ls_zml])
                case 15:
                    zs_hp.append(aoi_l_hp[ls_zml])
                    zt_hp.append(aoi_l_hp[ls_zml])
                    zs_energy.append(aoi_l_energy[ls_zml])
                    zt_energy.append(aoi_l_energy[ls_zml])
                    zj_atk.append(aoi_l_atk[ls_zml])
                    zj_crit.append(aoi_l_crit[ls_zml])
                    zj_fy.append(aoi_l_fy[ls_zml])
                    zj_jc.append(aoi_l_jc[ls_zml])
                case 16:
                    zs_hp.append(bei_hp[ls_zml])
                    zt_hp.append(bei_hp[ls_zml])
                    zs_energy.append(bei_energy[ls_zml])
                    zt_energy.append(bei_energy[ls_zml])
                    zj_atk.append(bei_atk[ls_zml])
                    zj_crit.append(bei_crit[ls_zml])
                    zj_fy.append(bei_fy[ls_zml])
                    zj_jc.append(bei_jc[ls_zml])
                case 17:
                    zs_hp.append(era_hp[ls_zml])
                    zt_hp.append(era_hp[ls_zml])
                    zs_energy.append(era_energy[ls_zml])
                    zt_energy.append(era_energy[ls_zml])
                    zj_atk.append(era_atk[ls_zml])
                    zj_crit.append(era_crit[ls_zml])
                    zj_fy.append(era_fy[ls_zml])
                    zj_jc.append(era_jc[ls_zml])
                case 18:
                    zs_hp.append(ert_hp[ls_zml])
                    zt_hp.append(ert_hp[ls_zml])
                    zs_energy.append(ert_energy[ls_zml])
                    zt_energy.append(ert_energy[ls_zml])
                    zj_atk.append(ert_atk[ls_zml])
                    zj_crit.append(ert_crit[ls_zml])
                    zj_fy.append(ert_fy[ls_zml])
                    zj_jc.append(ert_jc[ls_zml])
                case 19:
                    zs_hp.append(he_hp[ls_zml])
                    zt_hp.append(he_hp[ls_zml])
                    zs_energy.append(he_energy[ls_zml])
                    zt_energy.append(he_energy[ls_zml])
                    zj_atk.append(he_atk[ls_zml])
                    zj_crit.append(he_crit[ls_zml])
                    zj_fy.append(he_fy[ls_zml])
                    zj_jc.append(he_jc[ls_zml])
                case 20:
                    zs_hp.append(ichi_hp[ls_zml])
                    zt_hp.append(ichi_hp[ls_zml])
                    zs_energy.append(ichi_energy[ls_zml])
                    zt_energy.append(ichi_energy[ls_zml])
                    zj_atk.append(ichi_atk[ls_zml])
                    zj_crit.append(ichi_crit[ls_zml])
                    zj_fy.append(ichi_fy[ls_zml])
                    zj_jc.append(ichi_jc[ls_zml])
                case 21:
                    zs_hp.append(lin_hua_hp[ls_zml])
                    zt_hp.append(lin_hua_hp[ls_zml])
                    zs_energy.append(lin_hua_energy[ls_zml])
                    zt_energy.append(lin_hua_energy[ls_zml])
                    zj_atk.append(lin_hua_atk[ls_zml])
                    zj_crit.append(lin_hua_crit[ls_zml])
                    zj_fy.append(lin_hua_fy[ls_zml])
                    zj_jc.append(lin_hua_jc[ls_zml])
                case 22:
                    zs_hp.append(n_hp[ls_zml])
                    zt_hp.append(n_hp[ls_zml])
                    zs_energy.append(n_energy[ls_zml])
                    zt_energy.append(n_energy[ls_zml])
                    zj_atk.append(n_atk[ls_zml])
                    zj_crit.append(n_crit[ls_zml])
                    zj_fy.append(n_fy[ls_zml])
                    zj_jc.append(n_jc[ls_zml])
                case 23:
                    zs_hp.append(o_hp[ls_zml])
                    zt_hp.append(o_hp[ls_zml])
                    zs_energy.append(o_energy[ls_zml])
                    zt_energy.append(o_energy[ls_zml])
                    zj_atk.append(o_atk[ls_zml])
                    zj_crit.append(o_crit[ls_zml])
                    zj_fy.append(o_fy[ls_zml])
                    zj_jc.append(o_jc[ls_zml])
                case 24:
                    zs_hp.append(ri_hp[ls_zml])
                    zt_hp.append(ri_hp[ls_zml])
                    zs_energy.append(ri_energy[ls_zml])
                    zt_energy.append(ri_energy[ls_zml])
                    zj_atk.append(ri_atk[ls_zml])
                    zj_crit.append(ri_crit[ls_zml])
                    zj_fy.append(ri_fy[ls_zml])
                    zj_jc.append(ri_jc[ls_zml])
        os.system("cls")

    else:
        z_amount = zf("请输入角色数量：（该数值上限为 9）", "inp")
        z_amount = zs(z_amount, 1, 9)
        for i in range(z_amount):
            z_name.append(zf(f"请输入第 {i + 1} 个角色的名称：", "inp"))
            
            ls_hp = zf(f"请输入第 {i + 1} 个角色的 HP ：", "inp")
            ls_hp = fd(ls_hp, 1, float("inf"))
            zs_hp.append(ls_hp)
            zt_hp.append(ls_hp)

            ls_energy = zf(f"请输入第 {i + 1} 个角色的 ENERGY ：", "inp")
            ls_energy = fd(ls_energy, 1, float("inf"))
            zs_energy.append(ls_energy)
            zt_energy.append(ls_energy)

            ls_fy = zf(f"请输入第 {i + 1} 个角色的防御力 ：", "inp")
            ls_fy = zs(ls_fy, 1, float("inf"))
            zj_fy.append(ls_fy)

            ls_hsf = zf(f"请输入其护身符防御力 ：", "inp")
            ls_hsf = zs(ls_hsf, 1, float("inf"))
            zj_fy[i] += ls_hsf

            ls_atk = zf(f"请输入第 {i + 1} 个角色的攻击力 ：", "inp")
            ls_atk = zs(ls_atk, 1, float("inf"))
            zj_atk.append(ls_atk)

            ls_weapon = zf(f"请输入其武器攻击力 ：", "inp")
            ls_weapon = zs(ls_weapon, 1, float("inf"))
            zj_atk[i] += ls_weapon

            ls_crit = zf(f"请输入第 {i + 1} 个角色的暴击率 ：", "inp")
            ls_crit = fd(ls_crit, 0.01, 1)
            zj_crit.append(ls_crit)

            ls_jc = zf(f"请输入第 {i + 1} 个角色的 JC ：", "inp")
            ls_jc = zs(ls_jc, 1, float("inf"))
            zj_jc.append(ls_jc)

            print()

    os.system("cls")
    os.system(r'start notepad.exe "%cd%\武器和护身符.txt"')
    wq_z = [1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 6, 6, 7, 7, 7, 7, 7, 8, 8, 9, 9, 10, 11, 12, 13, 16, 18, 20, 31, 63, 127, 0]
    hsf_z = [1, 2, 2, 3, 4, 5, 5, 6, 6, 7, 8, 8, 10, 11, 13, 15, 20, 31, 63, 127, 0]
    if sz.upper() == "M":
        zf("刚才打开了武器和护身符的文本文件，请查看。", "text")
        print()
        zf("现在为我方角色选择武器和护身符，接下来请输入相应的序号。", "text")
        for i in range(z_amount):
            ls_zord = zf(f"请为 {z_name[i]} 选择合适的武器：", "inp")
            ls_zord = zs(ls_zord, 0, 36)
            hushenfu_ord = zf("请为其选择合适的护身符：", "inp")
            hushenfu_ord = zs(hushenfu_ord, 0, 20)
            if (ls_zord == 36):
                if z_name[i] == "Modificationer + Satelliti" or z_name[i] == "Xusu Ziye":
                    ls_wuqi = randint(21, 127)
                else:
                    ls_wuqi = randint(1, 20)
                zf(f"这会使其攻击力增加 {ls_wuqi}。", "text")
                zj_atk[i] += ls_wuqi
            if (hushenfu_ord == 15):
                zf("这会使其 JC 增加 5。", "text")
                z_jc[i] += 5
            elif (hushenfu_ord == 20):
                if z_name[i] == "Modificationer + Satelliti" or z_name[i] == "Xusu Ziye":
                    ls_hushenfu = randint(21, 127)
                else:
                    ls_hushenfu = randint(1, 20)
                zf(f"这会使其 DEF 增加 {ls_hushenfu}。", "text")
                zj_fy[i] += ls_hushenfu
            zj_atk[i] += wq_z[ls_zord]
            zj_fy[i] += hsf_z[hushenfu_ord]
            print()

        print()
        zf("现在为敌方角色选择武器和护身符，接下来请输入相应的序号。", "text")
        for j in range(d_amount):
            ls_dord = zf(f"请为 {d_name[j]} 选择合适的武器：", "inp")
            ls_dord = zs(ls_dord, 0, 36)
            hushenfu_ord = zf("请为其选择合适的护身符：", "inp")
            hushenfu_ord = zs(hushenfu_ord, 0, 20)
            if (ls_dord == 36):
                if d_name[j] == "Modificationer + Satelliti" or d_name[j] == "Xusu Ziye":
                    ls_wuqi = randint(21, 127)
                else:
                    ls_wuqi = randint(1, 20)
                zf(f"这会使其攻击力增加 {ls_wuqi}。", "text")
                d_atk[j] += ls_wuqi
            if (hushenfu_ord == 15):
                zf("这会使其 JC 增加 5。", "text")
                d_jc[j] += 5
            elif (hushenfu_ord == 20):
                if d_name[j] == "Modificationer + Satelliti" or d_name[j] == "Xusu Ziye":
                    ls_hushenfu = randint(21, 127)
                else:
                    ls_hushenfu = randint(1, 20)
                zf(f"这会使其 DEF 增加 {ls_hushenfu}。", "text")
                d_fy[j] += ls_hushenfu
            d_atk[j] += wq_z[ls_dord]
            d_fy[j] += hsf_z[hushenfu_ord]
            print()
    else:
        w = zf("我们可以提供可用的武器列表和护身符列表，是否查看？（是 / 否）", "inp")
        if w.upper() == "是":
            zf("刚才打开了武器和护身符的文本文件，请查看。", "text")
            os.system('start notepad.exe "%cd%\武器和护身符.txt"')

    os.system("cls")

    print("初始状态。")
    print()
    print("我方阵营。")
    for k in range(z_amount):
        jdt(zs_hp[k], zt_hp[k], f"{k} - {z_name[k]}", "hp", "me") # 显示角色 HP 信息。
        jdt(zs_energy[k], zt_energy[k], f"{k} - {z_name[k]}", "energy", "me") # 显示角色 ENERGY 信息。
        print()

    print("敌方阵营。")
    for l in range(d_amount):
        jdt(ds_hp[l], dt_hp[l], f"{l} - {d_name[l]}", "hp", "enemy") # 显示敌人 HP 信息。
        jdt(ds_energy[l], dt_energy[l], f"{l} - {d_name[l]}", "energy", "enemy") # 显示敌人 ENERGY 信息。
        print()

    jd = 1 # 1：敌人处于 1 阶段；2：敌人处于 2 阶段；3：敌人或者角色被击败。

    while jd != 3 :
        if (turns >= 5 and police_join == True):
            os.system("cls")
            zf("“你们不要再打了，最好束手就擒！” Opportunity 带领着警方团队出现，拉起了警戒线，驱散观众离开。", "DI-")
            for b in range(z_amount):
                if z_name[b] == "Modificationer + Satelliti":
                    zf("Modificationer 和 Satelliti 拿出终端，敲击了一下，瞬间消失。", "text")
                    for lst in [z_name, zs_hp, zt_hp, zs_energy, zt_energy, zj_atk, zj_crit, zj_fy, zj_jc]:
                        lst.pop(b)
                        z_amount -= 1
                elif z_name[b] == "Xusu Ziye":
                    zf("Xusu Ziye 见状，慌忙从衣褂里拿出 Figure_Out OS 开发证明。Opportunity 点了点头，放她走了。", "text")
                    for lst in [z_name, zs_hp, zt_hp, zs_energy, zt_energy, zj_atk, zj_crit, zj_fy, zj_jc]:
                        lst.pop(b)
                        z_amount -= 1
                elif z_name[b] == "Opportunity":
                    zf("你看了看四周，发现 Opportunity 不站在身边，而是站在警察前面。", "DI-")
                    for lst in [z_name, zs_hp, zt_hp, zs_energy, zt_energy, zj_atk, zj_crit, zj_fy, zj_jc]:
                        lst.pop(b)
                        z_amount -= 1
                else:
                    police_caught.append(z_name[b])
            for c in range(d_amount):
                if d_name[c] == "Modificator + Satelliti":
                    zf("Modificator 和 Satelliti 拿出终端，敲击了一下，瞬间消失。", "DI-")
                    for lst in [d_name, ds_hp, dt_hp, ds_energy, dt_energy, d_atk, d_crit, d_fy, d_jc]:
                        lst.pop(c)
                        d_amount -= 1
                elif d_name[c] == "Xusu Ziye":
                    zf("Xusu Ziye 见状，慌忙从衣褂里拿出 Figure_Out OS 开发证明。Opportunity 点了点头，放她走了。", "DI-")
                    for lst in [d_name, ds_hp, dt_hp, ds_energy, dt_energy, d_atk, d_crit, d_fy, d_jc]:
                        lst.pop(c)
                        d_amount -= 1
                elif d_name[c] == "Opportunity":
                    zf("你看了看四周，发现 Opportunity 不站在对面，而是站在警察前面。", "DI-")
                    for lst in [d_name, ds_hp, dt_hp, ds_energy, dt_energy, d_atk, d_crit, d_fy, d_jc]:
                        lst.pop(c)
                        d_amount -= 1
                else:
                    police_caught.append(d_name[c])
            
            pc_string = "、".join(police_caught)
            zf(f"“{pc_string}，你们被逮捕了！” Opportunity 严肃地通知你们。", "DI-")

            print()
            zf("模拟结束。未完待续。", "text")
            sys.exit(0)
        turns += 1
        zf(f"第 {turns} 回合。", "text")
        print()
        gj()
except EOFError as e:
    zf("发生了 EOF 错误。你可能按下了 Ctrl + Z 组合键。", "error")
except KeyboardInterrupt:
    print()
    zf("此次运行被键盘中断。", "error")