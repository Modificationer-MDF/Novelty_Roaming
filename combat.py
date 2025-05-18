# -*- coding: utf-8 -*-
# Made by Modificationer Satelliti.
from random import *
from rich.progress import *
from rich.console import Console
import os
import time
import sys
import math
cs = Console()

f_hp = [60, 66, 71, 77, 83, 90, 96, 102, 108, 114, 120, 124, 130, 135, 141, 150] # Feng_Noti
f_energy = [30, 32, 35, 40, 43, 48, 52, 56, 60, 66, 70, 75, 79, 84, 90, 95] # 精力。
f_fy = [2, 3, 4, 5, 6, 7, 8, 9, 8, 8, 9, 10, 12, 13, 15, 17] # 防御力。
f_atk = [3, 3, 5, 7, 7, 8, 9, 10, 9, 10, 9, 10, 10, 11, 13, 15, 18, 22] # 攻击力。
f_crit = [0.2, 0.21, 0.24, 0.27, 0.3, 0.33, 0.37, 0.4, 0.4, 0.42, 0.43, 0.45, 0.5, 0.5, 0.5, 0.55] # 暴击率。
f_jc = [14, 14, 13, 12, 12, 11, 10, 9, 9, 8, 8, 8, 8, 8, 8, 8] # JC。

w_hp = [57, 59, 62, 65, 69, 72, 75, 79, 83, 87, 90, 94, 97, 100, 103, 107] # With_Kout
w_energy = [34, 37, 40, 45, 50, 54, 60, 65, 70, 74, 78, 83, 90, 96, 102, 107]
w_fy = [3, 4, 4, 5, 6, 7, 8, 9, 10, 12, 14, 15, 16, 17, 19, 22]
w_atk = [2, 2, 3, 5, 5, 5, 5, 6, 7, 7, 7, 8, 9, 10, 11, 11]
w_crit = [0.15, 0.15, 0.16, 0.19, 0.2, 0.22, 0.24, 0.25, 0.25, 0.27, 0.28, 0.28, 0.3, 0.3, 0.3, 0.3]
w_jc = [13, 13, 12, 11, 10, 10, 10, 9, 9, 8, 7, 7, 7, 7, 6, 6]

t_hp = [64, 70, 73, 81, 88, 93, 100, 104, 110, 114, 122, 128, 135, 143, 150, 161] # Tsian_Ca
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

aka_f_hp = [87, 41] # Aka Fū
aka_f_energy = [47, 19]
aka_f_fy = [9, 11]
aka_f_atk = [9, 7]
aka_f_crit = [0.4, 0.33]
aka_f_jc = [11, 17]

aka_k_hp = [92, 44] # Aka Ka
aka_k_energy = [44, 21]
aka_k_fy = [8, 11]
aka_k_atk = [14, 10]
aka_k_crit = [0.6, 0.51]
aka_k_jc = [13, 18]

aka_y_hp = [95, 48] # Aka Yan
aka_y_energy = [50, 22]
aka_y_fy = [9, 12]
aka_y_atk = [10, 10]
aka_y_crit = [0.45, 0.38]
aka_y_jc = [12, 17]

anei_hp = [81, 52] # Anei
anei_energy = [40, 25]
anei_fy = [7, 12]
anei_atk = [7, 10]
anei_crit = [0.3, 0.42]
anei_jc = [11, 20]

aoi_sa_hp = [93, 40] # Aoi Sa
aoi_sa_energy = [48, 19]
aoi_sa_fy = [9, 11]
aoi_sa_atk = [12, 10]
aoi_sa_crit = [0.4, 0.42]
aoi_sa_jc = [12, 17]

aoi_sh_hp = [94, 49] # Aoi Shui
aoi_sh_energy = [51, 28]
aoi_sh_fy = [11, 14]
aoi_sh_atk = [12, 11]
aoi_sh_crit = [0.44, 0.5]
aoi_sh_jc = [10, 13]

aoi_l_hp = [96, 41] # Aoi Lan
aoi_l_energy = [46, 19]
aoi_l_fy = [9, 11]
aoi_l_atk = [10, 10]
aoi_l_crit = [0.38, 0.41]
aoi_l_jc = [13, 17]

bei_hp = [89, 50] # Bei Hua
bei_energy = [38, 28]
bei_fy = [8, 11]
bei_atk = [9, 13]
bei_crit = [0.41, 0.5]
bei_jc = [13, 15]

era_hp = [94, 44] # Era
era_energy = [47, 22]
era_fy = [10, 13]
era_atk = [11, 11]
era_crit = [0.42, 0.5]
era_jc = [13, 17]

ert_hp = [90, 42] # Ert
ert_energy = [45, 25]
ert_fy = [8, 10]
ert_atk = [11, 14]
ert_crit = [0.41, 0.46]
ert_jc = [12, 18]

he_hp = [78, 39] # Hello14
he_energy = [37, 19]
he_fy = [7, 10]
he_atk = [7, 9]
he_crit = [0.28, 0.33]
he_jc = [10, 15]

ichi_hp = [91, 41] # Ichi Ryū
ichi_energy = [44, 21]
ichi_fy = [11, 11]
ichi_atk = [11, 11]
ichi_crit = [0.41, 0.41]
ichi_jc = [11, 16]

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

characters_names = [
    "Feng_Noti",
    "With_Kout",
    "Tsian_Ca",
    "Zyxa Wvub",
    "Chala Sklif",
    "It Rains",
    "Lin Xi",
    "Modificationer + Satelliti",
    "Xusu Ziye",
]

enemy_names = [
    "Feng_Noti",
    "With_Kout",
    "Tsian_Ca",
    "Zyxa Wvub",
    "Chala Sklif",
    "It Rains",
    "Lin Xi",
    "Modificationer + Satelliti",
    "Xusu Ziye",
    "Aka Fū",
    "Aka Ka",
    "Aka Yan",
    "Aoi Sa",
    "Aoi Shui",
    "Aoi Lan",
    "Bei Hua",
    "Era",
    "Ert",
    "Hello14",
    "Ichi Ryū",
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
d_ml = [] # 敌人 ML。
ds_hp = [] # 敌人 HP。
dt_hp = [] # 敌人总 HP。
ds_energy = [] # 敌人精力。
dt_energy = [] # 敌人总精力。
d_atk = [] # 敌人攻击力。
d_fy = [] # 敌人防御力。
d_crit = [] # 敌人暴击率。
d_jc = [] # 敌人 JC。

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

    def jdt(current, total, recovered, lost, char, typ, side): 
        # current：当前值；total：总值；recovered：恢复值；lost：损失值；char：角色；typ：属性；side：阵营。
        column = [
            TextColumn("{task.description}"),
            BarColumn(),
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
                if current >= total:
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
                if current >= total:
                    t_color = "DI-"
                if current >= 0.9 * total:
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

            column.append(TextColumn(f"[{color[t_color]}][{t_color}] {char} {typ.upper()}： {current:.3f} / {total:.3f}。（+{recovered:.3f} | -{lost:.3f}）"))
            task = progress.add_task("", total=total)
            progress.update(task, completed=current)
            progress.console.print(f"[{color[t_color]}][{t_color}] {char} {typ.upper()}： {current:.3f} / {total:.3f}。（+{recovered:.3f} | -{lost:.3f}）")

    def zs(var, p, q):
        while True:
            try:
                var = int(var)
                if p <= var <= q:
                    return var
                else:
                    raise ValueError(f"无效输入。请输入一个在 {p} 和 {q} 之间的数字")
            except Exception as e:
                var = zf(f"{e}。请重新输入一个整数：", "error")

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
                var = zf(f"{e}。请重新输入一个浮点数：", "error")

    def gj():
        try:
            global people_interest, police_join, jd, wuqi_ord, hushenfu_ord, z_amount, d_amount, zs_energy, ds_energy, zt_energy, dt_energy, zs_hp, ds_hp

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
                    for lst in [d_name, ds_hp, ds_energy, d_atk, d_crit, d_fy, d_jc]:
                        lst.append(lst.pop(d_getmercy_ord))
                    d_amount -= 1
                    if d_amount == 0:
                        zf("模拟结束。你成功地饶恕了所有敌人。", "F+")
                        sys.exit(0)
                else:
                    zf("敌人不为所动。看来你不得不与其战斗……", "N-")
                    mercy_refuse = True
                    print()

            if act == "g" or act == "" or mercy_refuse == True:
                print()
                zf("我方选择。", "text")
                for i in range(z_amount):
                    xz_zt = zf(f"{i} - {z_name[i]} 要攻击谁？", "inp")
                    xz_zt = zs(xz_zt, 0, d_amount - 1)
                    z_xz.append(xz_zt)
                    zf(f"其决定攻击 {xz_zt} - {d_name[z_xz[i]]}。", "text")

                print()
                zf("敌方选择。", "text")
                for j in range(d_amount):
                    xz_dt = zf(f"{j} - {d_name[j]} 要攻击谁？", "inp")
                    xz_dt = zs(xz_dt, 0, z_amount - 1)
                    d_xz.append(xz_dt)
                    zf(f"其决定攻击 {xz_dt} - {z_name[d_xz[j]]}。", "text")

                # 计算攻击精准度和伤害。
                # 生成 z_check 和 d_check 列表，确保其长度与角色和敌人数量一致。
                z_check = [zj_jc[k] * 3.306 - zj_fy[k] for k in range(z_amount)]
                d_check = [d_jc[l] * 3.306 - d_fy[l] for l in range(d_amount)]

                # 计算攻击伤害。
                print()
                for k in range(z_amount):
                    z_damage.append(randint(6, 9) + zj_atk[k])
                    z_acc.append(randint(1, 10))
                    if z_name[k] == "Modificationer + Satelliti" or z_name[k] == "Xusu Ziye":
                        z_acc[k] = 5
                        zf(f"{k} - {z_name[k]} 打出了精准的一招，这对其来说并不是什么难事。", "F+")
                        z_damage[k] *= (1 + zj_crit[k] / 10)
                    elif 4 <= z_acc[k] <= 6:
                        zf(f"{k} - {z_name[k]} 打出了精准的一招。", "E-")
                        z_damage[k] *= (1 + zj_crit[k] / 10)
                    else:
                        zf(f"{k} - {z_name[k]} 打出了普通的一招。", "A")

                print()
                for l in range(d_amount):
                    d_damage.append(randint(6, 9) + d_atk[l])
                    d_acc.append(randint(1, 10))
                    if d_name[l] == "Modificationer + Satelliti" or d_name[l] == "Xusu Ziye":
                        d_acc[l] = 5
                        zf(f"{l} - {d_name[l]} 打出了精准的一招，这对其来说并不是什么难事。", "DI-")
                        d_damage[l] *= (1 + d_crit[l] / 10)
                    elif 4 <= d_acc[l] <= 6:
                        zf(f"{l} - {d_name[l]} 打出了精准的一招。", "C-")
                        d_damage[l] *= (1 + d_crit[l] / 10)
                    else:
                        zf(f"{l} - {d_name[l]} 打出了普通的一招。", "P")

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
                for o in range(d_amount):
                    if d_damage[o] == 0:
                        if z_hfnl[d_xz[o]] == 0:
                            z_hfnl[d_xz[o]] = round(uniform(0.05, 0.11) * zt_energy[d_xz[o]], 3)
                            zs_energy[d_xz[o]] += z_hfnl[d_xz[o]]
                            zf(f"{o} - {z_name[d_xz[o]]} 没有受到伤害，恢复了 {z_hfnl[d_xz[o]]:.3f} ENERGY。", "E+")

                for o in range(z_amount):
                    if zs_energy[o] > 0:
                        z_hfhp.append(round(uniform(0.05, 0.11) * zt_hp[o], 3))
                        if zs_hp[o] == zt_hp[o]:
                            zf(f"{o} - {z_name[o]} HP 已满，又恢复了 {z_hfhp[o]:.3f} ENERGY。", "E+")
                            zs_energy[o] += z_hfhp[o]
                            z_hfnl[o] += z_hfhp[o]
                            z_hfhp[o] = 0
                        else:
                            if zs_hp[o] + z_hfhp[o] > zt_hp[o] and zs_energy[o] - z_hfhp[o] > 0:
                                zs_hp[o] = zt_hp[o]
                                z_hfhp[o] -= (zt_hp[o] - zs_hp[o])
                                zf(f"{o} - {z_name[o]} 恢复了 {z_hfhp[o]:.3f} HP。", "E")
                            elif zs_energy[o] - z_hfhp[o] <= 0:
                                z_hfhp[o] -= abs(zs_energy[o] - z_hfhp[o])
                                zs_energy[o] = 0
                                zf(f"{o} - {z_name[o]} 虽恢复了 {z_hfhp[o]:.3f} HP，但再也没有任何精力了。", "A-")
                            else:
                                zs_hp[o] += z_hfhp[o]
                                zf(f"{o} - {z_name[o]} 恢复了 {z_hfhp[o]:.3f} HP。", "G")
                    else:
                        z_hfhp.append(0)

                print()
                for p in range(z_amount):
                    if z_damage[p] == 0:
                        if d_hfnl[z_xz[p]] == 0:
                            d_hfnl[z_xz[p]] = round(uniform(0.05, 0.11) * dt_energy[z_xz[p]], 3)
                            ds_energy[z_xz[p]] += d_hfnl[z_xz[p]]
                            zf(f"{p} - {d_name[z_xz[p]]} 没有受到伤害，恢复了 {d_hfnl[z_xz[p]]:.3f} ENERGY。", "N-")

                for p in range(d_amount):
                    if ds_energy[p] > 0:
                        d_hfhp.append(round(uniform(0.05, 0.11) * dt_hp[p], 3))
                        if ds_hp[p] == dt_hp[p]:
                            zf(f"{p} - {d_name[p]} HP 已满，又恢复了 {d_hfhp[p]:.3f} ENERGY。", "N-")
                            ds_energy[p] += d_hfhp[p]
                            d_hfnl[p] += d_hfhp[p]
                            d_hfhp[p] = 0
                        else:
                            if ds_hp[p] + d_hfhp[p] > dt_hp[p] and ds_energy[p] - d_hfhp[p] > 0:
                                ds_hp[p] = dt_hp[p]
                                d_hfhp[p] -= (dt_hp[p] - ds_hp[p])
                                zf(f"{p} - {d_name[p]} 恢复了 {d_hfhp[p]:.3f} HP。", "S")
                            elif ds_energy[p] - d_hfhp[p] <= 0:
                                d_hfhp[p] -= abs(ds_energy[p] - d_hfhp[p])
                                ds_energy[p] = 0
                                zf(f"{p} - {d_name[p]} 虽恢复了 {d_hfhp[p]:.3f} HP，但再也没有任何精力了。", "A")
                            else:
                                ds_hp[p] += d_hfhp[p]
                                zf(f"{p} - {d_name[p]} 恢复了 {d_hfhp[p]:.3f} HP。", "C-")
                    else:
                        d_hfhp.append(0)

                # 检查敌人状态。
                for s in range(len(d_xz) - 1, -1, -1):
                    if ds_hp[s] <= 0:
                        print()
                        zf(f"{s} - {d_name[s]} 败下阵来。", "F+")
                        for lst in [d_name, ds_hp, ds_energy, d_atk, d_crit, d_fy, d_jc, z_damage]:
                            lst.append(lst.pop(s))
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
                        for lst in [z_name, zs_hp, zs_energy, z_atk, z_crit, z_fy, z_jc, d_damage]:
                            lst.append(lst.pop(t))
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
                        jdt(zs_hp[u], zt_hp[u], abs(z_hfhp[u]), abs(d_damage[u] if u < len(d_damage) else 0), f"{u} - {z_name[u]}", "hp", "me")
                        jdt(zs_energy[u], zt_energy[u], abs(z_hfnl[u]), abs(z_hfhp[u]), f"{u} - {z_name[u]}", "energy", "me")
                        print()

                    print(f"敌方阵营：还剩 {d_amount} 名角色。")
                    for v in range(d_amount):
                        jdt(ds_hp[v], dt_hp[v], abs(d_hfhp[v]), abs(z_damage[v] if v < len(z_damage) else 0), f"{v} - {d_name[v]}", "hp", "enemy")
                        jdt(ds_energy[v], dt_energy[v], abs(d_hfnl[v]), abs(d_hfhp[v]), f"{v} - {d_name[v]}", "energy", "enemy")
                        print()

                    zs_energy = [round(e, 3) for e in zs_energy]
                    ds_energy = [round(e, 3) for e in ds_energy]

        except KeyboardInterrupt:
            zf("此次运行被键盘中断。跳过本次攻击。", "error")
            print()
        except ValueError:
            zf("无效输入。跳过本次攻击。", "error")
            print()

    def moren(): # 默认设置。
        global z_amount

        zf("角色的 HP 、 JC 、 攻击力、防御力等将随 ML 而变化。", "text")
        zf(r"""
    角色列表：
    1 - Feng_Noti；
    2 - With_Kout；
    3 - Tsian_Ca；
    4 - Zyxa Wvub；
    5 - Chala Sklif；
    6 - It Rains；
    7 - Lin Xi；
    8 - Modificationer + Satelliti；
    9 - Xusu Ziye。
""", "text")

        z_amount = zf("请输入角色数量：", "inp")
        z_amount = zs(z_amount, 1, 9)
        for i in range(z_amount):
            z_num = zf(f"请输入第 {i + 1} 个角色的编号：", "inp")
            z_num = zs(z_num, 1, 9)
            z_name.append(characters_names[z_num - 1])

            z_ml = zf("请输入角色 ML ：", "inp")
            z_ml = zs(z_ml, 0, 15)

            match z_num:
                case 1:
                    zs_hp.append(f_hp[z_ml])
                    zt_hp.append(f_hp[z_ml])
                    zs_energy.append(f_energy[z_ml])
                    zt_energy.append(f_energy[z_ml])
                    zj_atk.append(f_atk[z_ml])
                    zj_crit.append(f_crit[z_ml])
                    zj_fy.append(f_fy[z_ml])
                    zj_jc.append(f_jc[z_ml])
                case 2:
                    zs_hp.append(w_hp[z_ml])
                    zt_hp.append(w_hp[z_ml])
                    zs_energy.append(w_energy[z_ml])
                    zt_energy.append(w_energy[z_ml])
                    zj_atk.append(w_atk[z_ml])
                    zj_crit.append(w_crit[z_ml])
                    zj_fy.append(w_fy[z_ml])
                    zj_jc.append(w_jc[z_ml])
                case 3:
                    zs_hp.append(t_hp[z_ml])
                    zt_hp.append(t_hp[z_ml])
                    zs_energy.append(t_energy[z_ml])
                    zt_energy.append(t_energy[z_ml])
                    zj_atk.append(t_atk[z_ml])
                    zj_crit.append(t_crit[z_ml])
                    zj_fy.append(t_fy[z_ml])
                    zj_jc.append(t_jc[z_ml])
                case 4:
                    zs_hp.append(z_hp[z_ml])
                    zt_hp.append(z_hp[z_ml])
                    zs_energy.append(z_energy[z_ml])
                    zt_energy.append(z_energy[z_ml])
                    zj_atk.append(z_atk[z_ml])
                    zj_crit.append(z_crit[z_ml])
                    zj_fy.append(z_fy[z_ml])
                    zj_jc.append(z_jc[z_ml])
                case 5:
                    zs_hp.append(sk_hp[z_ml])
                    zt_hp.append(sk_hp[z_ml])
                    zs_energy.append(sk_energy[z_ml])
                    zt_energy.append(sk_energy[z_ml])
                    zj_atk.append(sk_atk[z_ml])
                    zj_crit.append(sk_crit[z_ml])
                    zj_fy.append(sk_fy[z_ml])
                    zj_jc.append(sk_jc[z_ml])
                case 6:
                    zs_hp.append(ir_hp[z_ml])
                    zt_hp.append(ir_hp[z_ml])
                    zs_energy.append(ir_energy[z_ml])
                    zt_energy.append(ir_energy[z_ml])
                    zj_atk.append(ir_atk[z_ml])
                    zj_crit.append(ir_crit[z_ml])
                    zj_fy.append(ir_fy[z_ml])
                    zj_jc.append(ir_jc[z_ml])
                case 7:
                    zs_hp.append(lin_xi_hp[z_ml])
                    zt_hp.append(lin_xi_hp[z_ml])
                    zs_energy.append(lin_xi_energy[z_ml])
                    zt_energy.append(lin_xi_energy[z_ml])
                    zj_atk.append(lin_xi_atk[z_ml])
                    zj_crit.append(lin_xi_crit[z_ml])
                    zj_fy.append(lin_xi_fy[z_ml])
                    zj_jc.append(lin_xi_jc[z_ml])
                case 8:
                    zs_hp.append(m_hp[z_ml])
                    zt_hp.append(m_hp[z_ml])
                    zs_energy.append(m_energy[z_ml])
                    zt_energy.append(m_energy[z_ml])
                    zj_atk.append(m_atk[z_ml])
                    zj_crit.append(m_crit[z_ml])
                    zj_fy.append(m_fy[z_ml])
                    zj_jc.append(m_jc[z_ml])
                case 9:
                    zs_hp.append(x_hp[z_ml])
                    zt_hp.append(x_hp[z_ml])
                    zs_energy.append(x_energy[z_ml])
                    zt_energy.append(x_energy[z_ml])
                    zj_atk.append(x_atk[z_ml])
                    zj_crit.append(x_crit[z_ml])
                    zj_fy.append(x_fy[z_ml])
                    zj_jc.append(x_jc[z_ml])

    def ziding(): # 自定义设置。
        global z_amount

        z_amount = zf("请输入角色数量：", "inp")
        z_amount = zs(z_amount, 1, 9)
        for i in range(z_amount):
            while True:
                z_name = zf(f"请输入第 {i + 1} 个角色的名称：", "inp")
                if z_name == d_name:
                    zf("角色名不能与敌人名相同。", "error")
                else:
                    break
            
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

            ls_atk = zf(f"请输入第 {i + 1} 个角色的攻击力 ：", "inp")
            ls_atk = zs(ls_atk, 1, float("inf"))
            zj_atk.append(ls_atk)

            ls_weapon = zf(f"请输入第 {i + 1} 个角色的武器的攻击力 ：", "inp")
            ls_weapon = zs(ls_weapon, 1, float("inf"))
            zj_atk[i] += ls_weapon

            ls_crit = zf(f"请输入第 {i + 1} 个角色的暴击率 ：（0 ~ 1 之间的数字）", "inp")
            ls_crit = fd(ls_crit, 0.01, 1)
            zj_crit.append(ls_crit)

            ls_jc = zf(f"请输入第 {i + 1} 个角色的 JC ：", "inp")
            ls_jc = zs(ls_jc, 1, float("inf"))
            zj_jc.append(ls_jc)

    # 程序开始。
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
    1 - Feng_Noti；
    2 - With_Kout；
    3 - Tsian_Ca；
    4 - Zyxa Wvub；
    5 - Chala Sklif；
    6 - It Rains；
    7 - Lin Xi；
    8 - Modificationer + Satelliti；
    9 - Xusu Ziye；
    10 - Aka Fū；
    11 - Aka Ka；
    12 - Aka Yan；
    13 - Aoi Sa；
    14 - Aoi Shui；
    15 - Aoi Lan；
    16 - Bei Hua；
    17 - Era；
    18 - Ert；
    19 - Hello14；
    20 - Ichi Ryū。
""", "text")

        d_amount = zf("请输入敌人数量：", "inp")
        d_amount = zs(d_amount, 1, 9)
        for i in range(d_amount):
            d_num = zf(f"请选择第 {i + 1} 个敌人：", "inp")
            d_num = zs(d_num, 1, 20)
            d_name.append(enemy_names[d_num - 1])
    
            if 1 <= d_num <= 9:
                d_ml_val = zf("你还需要输入敌人的 ML：", "inp")  # 敌人 ML。
                d_ml_val = zs(d_ml_val, 0, 15)
            else:
                d_ml_val = 0
    
            d_ml.append(d_ml_val)
    
            match d_num:
                case 1:
                    ds_hp.append(f_hp[d_ml_val])  # 敌人 HP。
                    dt_hp.append(ds_hp[i])  # 敌人总 HP。
                    ds_energy.append(f_energy[d_ml_val])  # 敌人精力。
                    dt_energy.append(ds_energy[i])  # 敌人总精力。
                    d_atk.append(f_atk[d_ml_val])  # 敌人攻击力。
                    d_fy.append(f_fy[d_ml_val])  # 敌人防御力。
                    d_crit.append(f_crit[d_ml_val])  # 敌人暴击率。
                    d_jc.append(f_jc[d_ml_val])  # 敌人 JC。
                case 2:
                    ds_hp.append(w_hp[d_ml_val])
                    dt_hp.append(ds_hp[i])
                    ds_energy.append(w_energy[d_ml_val])
                    dt_energy.append(ds_energy[i])
                    d_atk.append(w_atk[d_ml_val])
                    d_fy.append(w_fy[d_ml_val])
                    d_crit.append(w_crit[d_ml_val])
                    d_jc.append(w_jc[d_ml_val])
                case 3:
                    ds_hp.append(t_hp[d_ml_val])
                    dt_hp.append(ds_hp[i])
                    ds_energy.append(t_energy[d_ml_val])
                    dt_energy.append(ds_energy[i])
                    d_atk.append(t_atk[d_ml_val])
                    d_fy.append(t_fy[d_ml_val])
                    d_crit.append(t_crit[d_ml_val])
                    d_jc.append(t_jc[d_ml_val])
                case 4:
                    ds_hp.append(z_hp[d_ml_val])
                    dt_hp.append(ds_hp[i])
                    ds_energy.append(z_energy[d_ml_val])
                    dt_energy.append(ds_energy[i])
                    d_atk.append(z_atk[d_ml_val])
                    d_fy.append(z_fy[d_ml_val])
                    d_crit.append(z_crit[d_ml_val])
                    d_jc.append(z_jc[d_ml_val])
                case 5:
                    ds_hp.append(sk_hp[d_ml_val])
                    dt_hp.append(ds_hp[i])
                    ds_energy.append(sk_energy[d_ml_val])
                    dt_energy.append(ds_energy[i])
                    d_atk.append(sk_atk[d_ml_val])
                    d_fy.append(sk_fy[d_ml_val])
                    d_crit.append(sk_crit[d_ml_val])
                    d_jc.append(sk_jc[d_ml_val])
                case 6:
                    ds_hp.append(ir_hp[d_ml_val])
                    dt_hp.append(ds_hp[i])
                    ds_energy.append(ir_energy[d_ml_val])
                    dt_energy.append(ds_energy[i])
                    d_atk.append(ir_atk[d_ml_val])
                    d_fy.append(ir_fy[d_ml_val])
                    d_crit.append(ir_crit[d_ml_val])
                    d_jc.append(ir_jc[d_ml_val])
                case 7:
                    ds_hp.append(lin_xi_hp[d_ml_val])
                    dt_hp.append(ds_hp[i])
                    ds_energy.append(lin_xi_energy[d_ml_val])
                    dt_energy.append(ds_energy[i])
                    d_atk.append(lin_xi_atk[d_ml_val])
                    d_fy.append(lin_xi_fy[d_ml_val])
                    d_crit.append(lin_xi_crit[d_ml_val])
                    d_jc.append(lin_xi_jc[d_ml_val])
                case 8:
                    ds_hp.append(m_hp[d_ml_val])
                    dt_hp.append(ds_hp[i])
                    ds_energy.append(m_energy[d_ml_val])
                    dt_energy.append(ds_energy[i])
                    d_atk.append(m_atk[d_ml_val])
                    d_fy.append(m_fy[d_ml_val])
                    d_crit.append(m_crit[d_ml_val])
                    d_jc.append(m_jc[d_ml_val])
                case 9:
                    ds_hp.append(x_hp[d_ml_val])
                    dt_hp.append(ds_hp[i])
                    ds_energy.append(x_energy[d_ml_val])
                    dt_energy.append(ds_energy[i])
                    d_atk.append(x_atk[d_ml_val])
                    d_fy.append(x_fy[d_ml_val])
                    d_crit.append(x_crit[d_ml_val])
                    d_jc.append(x_jc[d_ml_val])
                case 10:
                    ds_hp.append(aka_f_hp[d_ml_val])
                    dt_hp.append(ds_hp[i])
                    ds_energy.append(aka_f_energy[d_ml_val])
                    dt_energy.append(ds_energy[i])
                    d_atk.append(aka_f_atk[d_ml_val])
                    d_fy.append(aka_f_fy[d_ml_val])
                    d_crit.append(aka_f_crit[d_ml_val])
                    d_jc.append(aka_f_jc[d_ml_val])
                case 11:
                    ds_hp.append(aka_k_hp[d_ml_val])
                    dt_hp.append(ds_hp[i])
                    ds_energy.append(aka_k_energy[d_ml_val])
                    dt_energy.append(ds_energy[i])
                    d_atk.append(aka_k_atk[d_ml_val])
                    d_fy.append(aka_k_fy[d_ml_val])
                    d_crit.append(aka_k_crit[d_ml_val])
                    d_jc.append(aka_k_jc[d_ml_val])
                case 12:
                    ds_hp.append(aka_y_hp[d_ml_val])
                    dt_hp.append(ds_hp[i])
                    ds_energy.append(aka_y_energy[d_ml_val])
                    dt_energy.append(ds_energy[i])
                    d_atk.append(aka_y_atk[d_ml_val])
                    d_fy.append(aka_y_fy[d_ml_val])
                    d_crit.append(aka_y_crit[d_ml_val])
                    d_jc.append(aka_y_jc[d_ml_val])
                case 13:
                    ds_hp.append(aoi_sa_hp[d_ml_val])
                    dt_hp.append(ds_hp[i])
                    ds_energy.append(aoi_sa_energy[d_ml_val])
                    dt_energy.append(ds_energy[i])
                    d_atk.append(aoi_sa_atk[d_ml_val])
                    d_fy.append(aoi_sa_fy[d_ml_val])
                    d_crit.append(aoi_sa_crit[d_ml_val])
                    d_jc.append(aoi_sa_jc[d_ml_val])
                case 14:
                    ds_hp.append(aoi_sh_hp[d_ml_val])
                    dt_hp.append(ds_hp[i])
                    ds_energy.append(aoi_sh_energy[d_ml_val])
                    dt_energy.append(ds_energy[i])
                    d_atk.append(aoi_sh_atk[d_ml_val])
                    d_fy.append(aoi_sh_fy[d_ml_val])
                    d_crit.append(aoi_sh_crit[d_ml_val])
                    d_jc.append(aoi_sh_jc[d_ml_val])
                case 15:
                    ds_hp.append(aoi_l_hp[d_ml_val])
                    dt_hp.append(ds_hp[i])
                    ds_energy.append(aoi_l_energy[d_ml_val])
                    dt_energy.append(ds_energy[i])
                    d_atk.append(aoi_l_atk[d_ml_val])
                    d_fy.append(aoi_l_fy[d_ml_val])
                    d_crit.append(aoi_l_crit[d_ml_val])
                    d_jc.append(aoi_l_jc[d_ml_val])
                case 16:
                    ds_hp.append(bei_hp[d_ml_val])
                    dt_hp.append(ds_hp[i])
                    ds_energy.append(bei_energy[d_ml_val])
                    dt_energy.append(ds_energy[i])
                    d_atk.append(bei_atk[d_ml_val])
                    d_fy.append(bei_fy[d_ml_val])
                    d_crit.append(bei_crit[d_ml_val])
                    d_jc.append(bei_jc[d_ml_val])
                case 17:
                    ds_hp.append(era_hp[d_ml_val])
                    dt_hp.append(ds_hp[i])
                    ds_energy.append(era_energy[d_ml_val])
                    dt_energy.append(ds_energy[i])
                    d_atk.append(era_atk[d_ml_val])
                    d_fy.append(era_fy[d_ml_val])
                    d_crit.append(era_crit[d_ml_val])
                    d_jc.append(era_jc[d_ml_val])
                case 18:
                    ds_hp.append(ert_hp[d_ml_val])
                    dt_hp.append(ds_hp[i])
                    ds_energy.append(ert_energy[d_ml_val])
                    dt_energy.append(ds_energy[i])
                    d_atk.append(ert_atk[d_ml_val])
                    d_fy.append(ert_fy[d_ml_val])
                    d_crit.append(ert_crit[d_ml_val])
                    d_jc.append(ert_jc[d_ml_val])
                case 19:
                    ds_hp.append(he_hp[d_ml_val])
                    dt_hp.append(ds_hp[i])
                    ds_energy.append(he_energy[d_ml_val])
                    dt_energy.append(ds_energy[i])
                    d_atk.append(he_atk[d_ml_val])
                    d_fy.append(he_fy[d_ml_val])
                    d_crit.append(he_crit[d_ml_val])
                    d_jc.append(he_jc[d_ml_val])
                case 20:
                    ds_hp.append(ichi_hp[d_ml_val])
                    dt_hp.append(ds_hp[i])
                    ds_energy.append(ichi_energy[d_ml_val])
                    dt_energy.append(ds_energy[i])
                    d_atk.append(ichi_atk[d_ml_val])
                    d_fy.append(ichi_fy[d_ml_val])
                    d_crit.append(ichi_crit[d_ml_val])
                    d_jc.append(ichi_jc[d_ml_val])
        os.system("cls")

    elif qr1 == "z":
        d_amount = zf("请输入敌人数量：", "inp")
        d_amount = zs(d_amount, 1, 9)
        for j in range(d_amount):
            d_name[j] = zf("请输入敌人名称：", "inp")

            ls_dhp = zf(f"请输入 {d_name[j]} 的 HP ：", "inp")
            ls_dhp = zs(ls_dhp, 1, float("inf"))
            ds_hp.append(ls_dhp)
            dt_hp.append(ls_dhp)
        
            ls_denergy = zf(f"请输入 {d_name[j]} 的 ENERGY：", "inp")
            ls_denergy = zs(ls_denergy, 1, float("inf"))
            ds_energy.append(ls_denergy)
            dt_energy.append(ls_denergy)

            ls_dfy = zf(f"请输入 {d_name[j]} 的防御力 ：", "inp")
            ls_dfy = zs(ls_dfy, 1, float("inf"))
            d_fy.append(ls_dfy)

            ls_datk = zf(f"请输入 {d_name[j]} 的攻击力 ：", "inp")
            ls_datk = zs(ls_datk, 1, float("inf"))
            d_atk.append(ls_datk)

            ls_dcrit = zf(f"请输入 {d_name[j]} 的暴击率 ：", "inp")
            ls_dcrit = zs(ls_dcrit, 0.01, 1)
            d_crit.append(ls_dcrit)

            ls_djc = zf(f"请输入 {d_name[j]} 的 JC ：", "inp")
            ls_djc = zs(ls_djc, 1, float("inf"))
            d_jc.append(ls_djc)

            print()
        os.system("cls")

    if sz == "m":
        moren()
    else:
        ziding()

    os.system("cls")
    wuqi = """
    武器列表
    0 - 手（攻击力 + 1）；
    1 - 笔（攻击力 + 2）；
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
    30 - 锯子（攻击力 + 16）；
    31 - 水果刀（攻击力 + 18）；
    32 - 枪（攻击力 + 20）；
    33 - 智能设备（攻击力 + 31）；
    34 - 状态遥控器（攻击力 + 63）；
    35 - 终端（攻击力 + 127）；
    36 - ATK+++---×××÷÷÷ （攻击力 + ？）。
"""
    hushenfu = """
    护身符列表
    0 - 无（防御力 + 1）；
    1 - 布衣（防御力 + 2）；
    2 - 雨衣（防御力 + 2）；
    3 - 防弹衣（防御力 + 3）；
    4 - 贴片（防御力 + 4）；
    5 - 面罩（防御力 + 5）；
    6 - 围巾（防御力 + 5）；
    7 - 皮帽（防御力 + 6）；
    8 - 手套（防御力 + 6）；
    9 - 革履（防御力 + 7）；
    10 - 木制盾牌（防御力 + 8）；
    11 - 盔甲（防御力 + 8）；
    12 - 铜制盾牌（防御力 + 10）；
    13 - 避邪符（防御力 + 11）；
    14 - 圣水（防御力 + 13）；
    15 - JC 服（防御力 + 15）；
    16 - 蛋形胶囊（防御力 + 20）；
    17 - 智能设备（防御力 + 31）；
    18 - 状态遥控器（防御力 + 63）；
    19 - 终端（防御力 + 127）。
    20 - DEF+++---×××÷÷÷ （防御力 + ？）。
"""
    wq_z = [1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 6, 6, 7, 7, 7, 7, 7, 8, 8, 9, 9, 10, 11, 12, 13, 16, 18, 20, 31, 63, 127, 0]
    hsf_z = [1, 2, 2, 3, 4, 5, 5, 6, 6, 7, 8, 8, 10, 11, 13, 15, 20, 31, 63, 127, 0]
    if sz.upper() == "M":
        zf(wuqi, "text")
        zf(hushenfu, "text")
        print()
        for i in range(z_amount):
            wuqi_ord = zf(f"请为 {z_name[i]} 选择合适的武器：", "inp")
            wuqi_ord = zs(wuqi_ord, 0, 36)
            hushenfu_ord = zf("请为其选择合适的护身符：", "inp")
            hushenfu_ord = zs(hushenfu_ord, 0, 20)
            if (wuqi_ord == 36):
                ls_wuqi = randint(1, 127)
                zf(f"这会使其攻击力增加 {ls_wuqi}。", "text")
                zj_atk[i] += ls_wuqi
            if (hushenfu_ord == 15):
                zf("这会使其 JC 增加 5。", "text")
                z_jc[i] += 5
            elif (hushenfu_ord == 20):
                ls_hushenfu = randint(1, 127)
                zf(f"这会使其 DEF 增加 {ls_hushenfu}。", "text")
                zj_fy[i] += ls_hushenfu
            zj_atk[i] += wq_z[wuqi_ord]
            zj_fy[i] += hsf_z[hushenfu_ord]
    else:
        w = zf("我们可以提供可用的武器列表和护身符列表，是否查看？（是 / 否）", "inp")
        if w.upper() == "是":
            zf("以下可供参考。", "text")
            print()
            zf(wuqi, "text")
            zf(hushenfu, "text")

    os.system("cls")

    print("初始状态。")
    print()
    print("我方阵营。")
    for k in range(z_amount):
        jdt(zs_hp[k], zt_hp[k], 0, 0, f"{k} - {z_name[k]}", "hp", "me") # 显示角色 HP 信息。
        jdt(zs_energy[k], zt_energy[k], 0, 0, f"{k} - {z_name[k]}", "energy", "me") # 显示角色 ENERGY 信息。
        print()

    print("敌方阵营。")
    for l in range(d_amount):
        jdt(ds_hp[l], dt_hp[l], 0, 0, f"{l} - {d_name[l]}", "hp", "enemy") # 显示敌人 HP 信息。
        jdt(ds_energy[l], dt_energy[l], 0, 0, f"{l} - {d_name[l]}", "energy", "enemy") # 显示敌人 ENERGY 信息。
        print()

    jd = 1 # 1：敌人处于 1 阶段；2：敌人处于 2 阶段；3：敌人或者角色被击败。

    while jd != 3:
        if (turns >= 5 and police_join == True):
            os.system("cls")
            zf("“你们不要再打了，最好束手就擒！” Opportunity 带领着警方团队出现，拉起了警戒线，驱散观众离开。", "DI-")
            if ("Modificationer + Satelliti" in d_name) or ("Modificationer + Satelliti" in z_name):
                zf("Modificationer 和 Satelliti 拿出终端，敲击了一下，瞬间消失。", "text")
            if ("Xusu Ziye" in d_name) or ("Xusu Ziye" in z_name):
                zf("Xusu Ziye 见状，慌忙拿出 Figure_Out OS 开发证明。Opportunity 点了点头，放她走了。", "text")
            zf("模拟结束。", "text")
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