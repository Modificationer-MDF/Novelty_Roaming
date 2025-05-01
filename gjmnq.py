# -*- coding: utf-8 -*-
from random import *
from rich.progress import *
from rich.console import Console
import os
import time
import sys
import math

cs = Console()
ba = 7  # 基础攻击力。
bd = 15  # 基础防御力。

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

sk_hp = [61, 64, 69, 75, 82, 88, 94, 99, 103, 109, 114, 119, 126, 132, 138, 145] # Sklif
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

m_hp = [429, 768, 1022, 1444, 1888, 2367, 3025, 3778, 4400, 5123, 5907, 6666, 7288, 8311, 9298, 1e4] # Modificationer
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

color = {
    "F+": "#00ff00", # Fabulous +
    "E+": "#9acd32", # Excellent +
    "E": "#98fb98", # Excellent
    "E-": "#8fbc8f", # Excellent -
    "G+": "#66cdaa", # Good +
    "G": "#20b2aa", # Good
    "G-": "#40e0d0", # Good -
    "D": "#00ffff", # Decent
    "D-": "#00bfff", # Decent -
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
    "Di-": "#ff0000", # Disaster -
    "error": "#8b1a1a",
    "inp": "#ffd700",
    "default": "#ffffff",
}

try:
    def zf(text, cl):
        if not isinstance(text, str):
            text = str(text)
    
        if "\n" in text:
            text = "\\/ " + text + "/\\"
        else:
            text = "\\/ " + text

        if cl == "error":
            text = "[Error] " + text

        for i in text:
            cs.print(i, style=color[cl], end="")
            time.sleep(0.007)
        return input()

    def jdt(current, total, lost, recovered, js, typ):
        column = [
            TextColumn("{task.description}"),
            BarColumn(),
            TaskProgressColumn(text_format="{task.percentage:.3f}%"),
        ]
        with Progress(*column) as progress:
            t_color: str = ""
            if js == char and typ == "hp":
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
                    t_color = "D"
                elif 0.55 * total <= current < 0.6 * total:
                    t_color = "D-"
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
                elif 0 < current < 0.05 * total:
                    t_color = "Di-"
                else:
                    t_color = "error"
            elif js == char and typ == "energy":
                if current >= 0.9 * total:
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
                elif 0 < current < 0.1 * total:
                    t_color = "Di-"
                else:
                    t_color = "error"
            elif js == name and typ == "hp":
                if current >= 0.95 * total:
                    t_color = "Di-"
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
                    t_color = "D-"
                elif 0.35 * total <= current < 0.4 * total:
                    t_color = "D"
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
                elif 0 < current < 0.05 * total:
                    t_color = "F+"
                else:
                    t_color = "error"
            elif js == name and typ == "energy":
                if current >= 0.9 * total:
                    t_color = "Di-"
                elif 0.8 * total <= current < 0.9 * total:
                    t_color = "N-"
                elif 0.7 * total <= current < 0.8 * total:
                    t_color = "N"
                elif 0.6 * total <= current < 0.7 * total:
                    t_color = "C-"
                elif 0.5 * total <= current < 0.6 * total:
                    t_color = "C"
                elif 0.4 * total <= current < 0.5 * total:
                    t_color = "S-"
                elif 0.3 * total <= current < 0.4 * total:
                    t_color = "S"
                elif 0.2 * total <= current < 0.3 * total:
                    t_color = "P-"
                elif 0.1 * total <= current < 0.2 * total:
                    t_color = "P"
                elif 0 < current < 0.1 * total:
                    t_color = "A-"
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
                        js: str = "Zyxa Wvub"
                    case 5:
                        js: str = "Sklif"
                    case 6:
                        js: str = "It Rains"
                    case 7:
                        js: str = "Lin Xi"
                    case 8:
                        js: str = "Modificationer"
                    case 9:
                        js: str = "Xusu Ziye"
                    case _:
                        js: str = char

            column.append(TextColumn(f"[{color[t_color]}]{js} {typ.upper()}： {current:.3f} / {total:.3f}。 | -{lost:.3f} | +{recovered:.3f}（{t_color}）"))
            task = progress.add_task("", total=total)
            progress.update(task, completed=current)
            progress.console.print(f"[{color[t_color]}]{js} {typ.upper()}： {current:.3f} / {total:.3f}。 | -{lost:.3f} | +{recovered:.3f}（{t_color}）")


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
            global zs_hp
            global zs_energy
            global ds_hp
            global ds_energy
            global dt_hp
            global dt_energy
            global d_num
            global jd
            global qr1
            global d_jc
            global d_atk
            global d_crit
            global d_fy

            act = zf("饶恕还是攻击？（R / G）", "inp")
            act = act.replace(" ", "").lower()
            if act == "r":
                r, d, m = randint(1, 10), randint(1, 10), randint(1, 3)
                zf("你选择饶恕。", "default")
                if (r != d) and (r > d) and (r - d >= m):
                    zf(f"{name} 接受了你的饶恕。（E）", "E")
                    sys.exit(0)
                else:
                    zf(f"{name} 不为所动。（N-）", "N-")
                    print()
            elif act == "g":
                if (char != 8 and char != 9):
                    critical = randint(1, 10)
                else:
                    critical = 5
                c = randint(1, 10)

                damage1 = ba + zj_atk
                damage2 = ba + d_atk

                if 4 <= critical <= 6:
                    zf(f"太幸运了！直中中心。本次攻击所造成的伤害将增加至原先的 {100 + 100 * zj_crit}% 。（E-）", "E-")
                    damage1 *= (1 + max(zj_crit, critical / 10))
                if 4 <= c <= 6:
                    zf(f"糟糕！{name} 这次的攻击会更加猛烈：增加至 {100 + 10 * d_crit}% 。（C-）", "C-")
                    damage2 *= (1 + d_crit / 10)

                if critical < 4 or critical > 6:
                    zf(f"你打偏了，打到了 {name} 旁边 {(abs(5 - critical) / 3):.3f} 米处 。（S-）", "S-")
                if c < 4 or c > 6:
                    zf(f"{name} 打偏了，打到了你旁边 {(abs(5 - c) / 3):.3f} 米处 。（D）", "D")

                d_check = (d_jc * 3.306) - d_fy # 敌人 JC - 敌人防御。
                z_check = (zj_jc * 3.306) - zj_fy # 角色 JC - 角色防御。

                if d_check <= 0:
                    zf("这次攻击没有造成任何伤害。（S）", "S")
                else:
                    damage1 *= (d_check / 10) * 1.1
                    zf(f"你造成了 {max(damage1, 0):.3f} HP 伤害。", "default")
                    ds_hp -= damage1

                if z_check <= 0:
                    zf("你没有受到任何伤害。（E）", "E")
                else:
                    damage2 *= (z_check / 10) * 1.1
                    zf(f"你受到了 {max(damage2, 0):.3f} HP 伤害。", "default")
                    zs_hp -= damage2

                d_recover = uniform(0.07, 0.17) * dt_hp 
                d_recover = round(d_recover, 3)
                z_recover = uniform(0.07, 0.17) * zt_hp
                z_recover = round(z_recover, 3)

                print()
                zf("几秒过去了……", "default")
                print()
                if ds_energy - d_recover >= 0:
                    ds_hp += d_recover
                    ds_energy -= d_recover
                    zf(f"{name} 恢复了 {d_recover} HP。", "Di-")
                else:
                    d_recover = 0
                    zf(f"{name} 没有精力了。", "S-")

                if zs_energy - z_recover >= 0:
                    zs_hp += z_recover
                    zs_energy -= z_recover
                    zf(f"你恢复了 {z_recover} HP。", "F+")
                else:
                    z_recover = 0
                    zf("你没有精力了。", "S-")

                if (ds_hp <= 0) and (jd == 1) and (qr1 == "m") and (10 <= d_num <= 20):
                    zf(f"{name} 没有屈服。（Di-）", "Di-")
                    match d_num:
                        case 10:
                            ds_hp = aka_f_hp[1]
                            dt_hp = ds_hp
                            ds_energy = aka_f_energy[1]
                            dt_energy = ds_energy
                            d_atk = aka_f_atk[1]
                            d_crit = aka_f_crit[1]
                            d_fy = aka_f_fy[1]
                            d_jc = aka_f_jc[1]
                        case 11:
                            ds_hp = aka_k_hp[1]
                            dt_hp = ds_hp
                            ds_energy = aka_k_energy[1]
                            dt_energy = ds_energy
                            d_atk = aka_k_atk[1]
                            d_crit = aka_k_crit[1]
                            d_fy = aka_k_fy[1]
                            d_jc = aka_k_jc[1]
                        case 12:
                            ds_hp = aka_y_hp[1]
                            dt_hp = ds_hp
                            ds_energy = aka_y_energy[1]
                            dt_energy = ds_energy
                            d_atk = aka_y_atk[1]
                            d_crit = aka_y_crit[1]
                            d_fy = aka_y_fy[1]
                            d_jc = aka_y_jc[1]
                        case 13:
                            ds_hp = aoi_sa_hp[1]
                            dt_hp = ds_hp
                            ds_energy = aoi_sa_energy[1]
                            dt_energy = ds_energy
                            d_atk = aoi_sa_atk[1]
                            d_crit = aoi_sa_crit[1]
                            d_fy = aoi_sa_fy[1]
                            d_jc = aoi_sa_jc[1]
                        case 14:
                            ds_hp = aoi_sh_hp[1]
                            dt_hp = ds_hp
                            ds_energy = aoi_sh_energy[1]
                            dt_energy = ds_energy
                            d_atk = aoi_sh_atk[1]
                            d_crit = aoi_sh_crit[1]
                            d_fy = aoi_sh_fy[1]
                            d_jc = aoi_sh_jc[1]
                        case 15:
                            ds_hp = aoi_l_hp[1]
                            dt_hp = ds_hp
                            ds_energy = aoi_l_energy[1]
                            dt_energy = ds_energy
                            d_atk = aoi_l_atk[1]
                            d_crit = aoi_l_crit[1]
                            d_fy = aoi_l_fy[1]
                            d_jc = aoi_l_jc[1]
                        case 16:
                            ds_hp = bei_hp[1]
                            dt_hp = ds_hp
                            ds_energy = bei_energy[1]
                            dt_energy = ds_energy
                            d_atk = bei_atk[1]
                            d_crit = bei_crit[1]
                            d_fy = bei_fy[1]
                            d_jc = bei_jc[1]
                        case 17:
                            ds_hp = era_hp[1]
                            dt_hp = ds_hp
                            ds_energy = era_energy[1]
                            dt_energy = ds_energy
                            d_atk = era_atk[1]
                            d_crit = era_crit[1]
                            d_fy = era_fy[1]
                            d_jc = era_jc[1]
                        case 18:
                            ds_hp = ert_hp[1]
                            dt_hp = ds_hp
                            ds_energy = ert_energy[1]
                            dt_energy = ds_energy
                            d_atk = ert_atk[1]
                            d_crit = ert_crit[1]
                            d_fy = ert_fy[1]
                            d_jc = ert_jc[1]
                        case 19:
                            ds_hp = he_hp[1]
                            dt_hp = ds_hp
                            ds_energy = he_energy[1]
                            dt_energy = ds_energy
                            d_atk = he_atk[1]
                            d_crit = he_crit[1]
                            d_fy = he_fy[1]
                            d_jc = he_jc[1]
                        case 20:
                            ds_hp = ichi_hp[1]
                            dt_hp = ds_hp
                            ds_energy = ichi_energy[1]
                            dt_energy = ds_energy
                            d_atk = ichi_atk[1]
                            d_crit = ichi_crit[1]
                            d_fy = ichi_fy[1]
                            d_jc = ichi_jc[1]

                    jd = 2
                else:
                    if ds_hp <= 0:
                        print()
                        zf(f"{name} 败下阵来。（F+）", "F+")
                        jd = 3
                
                if zs_hp <= 0:
                    zf("你被打败了。（Di-）", "Di-")
                    jd = 3
                else:
                    if jd != 3:
                        print()
                        print(f"第 {count} 回合结束，角色状态。")
                        jdt(zs_hp, zt_hp, damage2, z_recover, char, "hp")
                        jdt(zs_energy, zt_energy, z_recover, 0, char, "energy")
                        print()
                        jdt(ds_hp, dt_hp, damage1, d_recover, name, "hp")
                        jdt(ds_energy, dt_energy, d_recover, 0, name, "energy")
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
            zf(f"发生错误： {e}。跳过本次攻击。", "error")
            print()

    def moren(): # 默认设置。
        global char # 角色编号。
        global zs_hp # 角色 HP。
        global zt_hp # 角色总 HP。
        global zs_energy # 角色能量。
        global zt_energy # 角色总能量。
        global zj_atk # 角色攻击力。
        global zj_crit # 角色暴击率。
        global zj_fy # 角色防御力。
        global zj_jc # 角色 JC。

        zf(r"""
    角色列表：
    1 - Feng_Noti；
    2 - With_Kout；
    3 - Tsian_Ca；
    4 - Zyxa Wvub；
    5 - Sklif；
    6 - It Rains；
    7 - Lin Xi；
    8 - Modificationer；
    9 - Xusu Ziye。
""", "default")
        char = zf("请选择角色：", "inp")
        char = zs(char, 1, 9)

        z_ml = zf("请输入角色 ML ：", "inp")
        z_ml = zs(z_ml, 0, 15)

        zf("角色的 HP 、 JC 、 攻击力、防御力等将随 ML 而变化。", "default")
        match char:
            case 1:
                zs_hp = f_hp[z_ml]
                zt_hp = zs_hp
                zs_energy = f_energy[z_ml]
                zt_energy = zs_energy
                zj_atk = f_atk[z_ml]
                zj_crit = f_crit[z_ml]
                zj_fy = f_fy[z_ml]
                zj_jc = f_jc[z_ml]
            case 2:
                zs_hp = w_hp[z_ml]
                zt_hp = zs_hp
                zs_energy = w_energy[z_ml]
                zt_energy = zs_energy
                zj_atk = w_atk[z_ml]
                zj_crit = w_crit[z_ml]
                zj_fy = w_fy[z_ml]
                zj_jc = w_jc[z_ml]
            case 3:
                zs_hp = t_hp[z_ml]
                zt_hp = zs_hp
                zs_energy = t_energy[z_ml]
                zt_energy = zs_energy
                zj_atk = t_atk[z_ml]
                zj_crit = t_crit[z_ml]
                zj_fy = t_fy[z_ml]
                zj_jc = t_jc[z_ml]
            case 4:
                zs_hp = z_hp[z_ml]
                zt_hp = zs_hp
                zs_energy = z_energy[z_ml]
                zt_energy = zs_energy
                zj_atk = z_atk[z_ml]
                zj_crit = z_crit[z_ml]
                zj_fy = z_fy[z_ml]
                zj_jc = z_jc[z_ml]
            case 5:
                zs_hp = sk_hp[z_ml]
                zt_hp = zs_hp
                zs_energy = sk_energy[z_ml]
                zt_energy = zs_energy
                zj_atk = sk_atk[z_ml]
                zj_crit = sk_crit[z_ml]
                zj_fy = sk_fy[z_ml]
                zj_jc = sk_jc[z_ml]
            case 6:
                zs_hp = ir_hp[z_ml]
                zt_hp = zs_hp
                zs_energy = ir_energy[z_ml]
                zt_energy = zs_energy
                zj_atk = ir_atk[z_ml]
                zj_crit = ir_crit[z_ml]
                zj_fy = ir_fy[z_ml]
                zj_jc = ir_jc[z_ml]
            case 7:
                zs_hp = lin_xi_hp[z_ml]
                zt_hp = zs_hp
                zs_energy = lin_xi_energy[z_ml]
                zt_energy = zs_energy
                zj_atk = lin_xi_atk[z_ml]
                zj_crit = lin_xi_crit[z_ml]
                zj_fy = lin_xi_fy[z_ml]
                zj_jc = lin_xi_jc[z_ml]
            case 8:
                zs_hp = m_hp[z_ml]
                zt_hp = zs_hp
                zs_energy = m_energy[z_ml]
                zt_energy = zs_energy
                zj_atk = m_atk[z_ml]
                zj_crit = m_crit[z_ml]
                zj_fy = m_fy[z_ml]
                zj_jc = m_jc[z_ml]
            case 9:
                zs_hp = x_hp[z_ml]
                zt_hp = zs_hp
                zs_energy = x_energy[z_ml]
                zt_energy = zs_energy
                zj_atk = x_atk[z_ml]
                zj_crit = x_crit[z_ml]
                zj_fy = x_fy[z_ml]
                zj_jc = x_jc[z_ml]

    def ziding(): # 自定义设置。
        global char # 角色编号。
        global zs_hp # 角色 HP。
        global zt_hp # 角色总 HP。
        global zs_energy # 角色能量。
        global zt_energy # 角色总能量。
        global zj_fy # 角色防御力。
        global zj_atk # 角色攻击力。
        global zj_crit # 角色暴击率。
        global zj_jc # 角色 JC。

        char = zf("请输入角色名称：", "inp")
        zs_hp = zf("请输入角色 HP ：", "inp")
        zs_hp = fd(zs_hp, 0, float("inf"))
        zt_hp = zs_hp

        zs_energy = zf("请输入角色能量 ：", "inp")
        zs_energy = zs(zs_energy, 0, float("inf"))
        zt_energy = zs_energy

        zj_fy = zf("请输入角色防御力 ：", "inp")
        zj_fy = zs(zj_fy, 0, float("inf"))

        zj_atk = zf("请输入角色攻击力 ：", "inp")
        zj_atk = zs(zj_atk, 0, float("inf"))

        zj_weapon = zf("请输入武器攻击力 ：", "inp")
        zj_weapon = zs(zj_weapon, 0, float("inf"))
        zj_atk += zj_weapon

        zj_crit = zf("请输入角色暴击率 ：（0 ~ 1 之间的数字）", "inp")
        zj_crit = fd(zj_crit, 0, 1)

        zj_jc = zf("请输入角色 JC ：", "inp")
        zj_jc = zs(zj_jc, 0, float("inf"))

    # 程序开始。
    os.system("cls")
    while True:
        sz = zf(r"使用默认配置还是自定义设置？（M / Z）", "inp")
        sz = sz.lower().replace(" ", "")
        if sz != "m" and sz != "z":
            zf(f"非法字符：“{sz}”。请重新输入。", "error")
            print()
        else:
            break

    os.system("cls")
    while True:
        qr1 = zf("接下来你将输入敌人信息。使用默认角色信息还是自定义敌人信息？（M / Z）", "inp")
        qr1 = qr1.replace(" ", "").lower()
        if qr1 != "m" and qr1 != "z":
            zf(f"非法字符：“{qr1}”。请重新输入。", "error")
            print()
        else:
            break

    if qr1 == "m":
        zf("""
    敌人列表：
    1 - Feng_Noti；
    2 - With_Kout；
    3 - Tsian_Ca；
    4 - Zyxa Wvub；
    5 - Sklif；
    6 - It Rains；
    7 - Lin Xi；
    8 - Modificationer；
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
""", "default")
        name = zf("请选择敌人：", "inp")
        name = zs(name, 1, 20)
        d_num = name
        if 1 <= name <= 9:
            d_ml = zf("你还需要输入敌人的 ML：", "inp") # 敌人 ML。
            d_ml = zs(d_ml, 0, 15)

        match name:
            case 1:
                name = "Feng_Noti"
                ds_hp = f_hp[d_ml] # 敌人 HP。
                dt_hp = ds_hp # 敌人总 HP。
                ds_energy = f_energy[d_ml] # 敌人能量。
                dt_energy = ds_energy # 敌人总能量。
                d_atk = f_atk[d_ml] # 敌人攻击力。
                d_fy = f_fy[d_ml] # 敌人防御力。
                d_crit = f_crit[d_ml] # 敌人暴击率。
                d_jc = f_jc[d_ml] # 敌人 JC。
            case 2:
                name = "With_Kout"
                ds_hp = w_hp[d_ml]
                dt_hp = ds_hp
                ds_energy = w_energy[d_ml]
                dt_energy = ds_energy
                d_atk = w_atk[d_ml]
                d_fy = w_fy[d_ml]
                d_crit = w_crit[d_ml]
                d_jc = w_jc[d_ml]
            case 3:
                name = "Tsian_Ca"
                ds_hp = t_hp[d_ml]
                dt_hp = ds_hp
                ds_energy = t_energy[d_ml]
                dt_energy = ds_energy
                d_atk = t_atk[d_ml]
                d_fy = t_fy[d_ml]
                d_crit = t_crit[d_ml]
                d_jc = t_jc[d_ml]
            case 4:
                name = "Zyxa Wvub"
                ds_hp = z_hp[d_ml]
                dt_hp = ds_hp
                ds_energy = z_energy[d_ml]
                dt_energy = ds_energy
                d_atk = z_atk[d_ml]
                d_fy = z_fy[d_ml]
                d_crit = z_crit[d_ml]
                d_jc = z_jc[d_ml]
            case 5:
                name = "Sklif"
                ds_hp = sk_hp[d_ml]
                dt_hp = ds_hp
                ds_energy = sk_energy[d_ml]
                dt_energy = ds_energy
                d_atk = sk_atk[d_ml]
                d_fy = sk_fy[d_ml]
                d_crit = sk_crit[d_ml]
                d_jc = sk_jc[d_ml]
            case 6:
                name = "It Rains"
                ds_hp = ir_hp[d_ml]
                dt_hp = ds_hp
                ds_energy = ir_energy[d_ml]
                dt_energy = ds_energy
                d_atk = ir_atk[d_ml]
                d_fy = ir_fy[d_ml]
                d_crit = ir_crit[d_ml]
                d_jc = ir_jc[d_ml]
            case 7:
                name = "Lin Xi"
                ds_hp = lin_xi_hp[d_ml]
                dt_hp = ds_hp
                ds_energy = lin_xi_energy[d_ml]
                dt_energy = ds_energy
                d_atk = lin_xi_atk[d_ml]
                d_fy = lin_xi_fy[d_ml]
                d_crit = lin_xi_crit[d_ml]
                d_jc = lin_xi_jc[d_ml]
            case 8:
                name = "Modificationer"
                ds_hp = m_hp[d_ml]
                dt_hp = ds_hp
                ds_energy = m_energy[d_ml]
                dt_energy = ds_energy
                d_atk = m_atk[d_ml]
                d_fy = m_fy[d_ml]
                d_crit = m_crit[d_ml]
                d_jc = m_jc[d_ml]
            case 9:
                name = "Xusu Ziye"
                ds_hp = x_hp[d_ml]
                dt_hp = ds_hp
                ds_energy = x_energy[d_ml]
                dt_energy = ds_energy
                d_atk = x_atk[d_ml]
                d_fy = x_fy[d_ml]
                d_crit = x_crit[d_ml]
                d_jc = x_jc[d_ml]
            case 10:
                name = "Aka Fū"
                ds_hp = aka_f_hp[0]
                dt_hp = ds_hp
                ds_energy = aka_f_energy[0]
                dt_energy = ds_energy
                d_atk = aka_f_atk[0]
                d_fy = aka_f_fy[0]
                d_crit = aka_f_crit[0]
                d_jc = aka_f_jc[0]
            case 11:
                name = "Aka Ka"
                ds_hp = aka_k_hp[0]
                dt_hp = ds_hp
                ds_energy = aka_k_energy[0]
                dt_energy = ds_energy
                d_atk = aka_k_atk[0]
                d_fy = aka_k_fy[0]
                d_crit = aka_k_crit[0]
                d_jc = aka_k_jc[0]
            case 12:
                name = "Aka Yan"
                ds_hp = aka_y_hp[0]
                dt_hp = ds_hp
                ds_energy = aka_y_energy[0]
                dt_energy = ds_energy
                d_atk = aka_y_atk[0]
                d_fy = aka_y_fy[0]
                d_crit = aka_y_crit[0]
                d_jc = aka_y_jc[0]
            case 13:
                name = "Aoi Sa"
                ds_hp = aoi_sa_hp[0]
                dt_hp = ds_hp
                ds_energy = aoi_sa_energy[0]
                dt_energy = ds_energy
                d_atk = aoi_sa_atk[0]
                d_fy = aoi_sa_fy[0]
                d_crit = aoi_sa_crit[0]
                d_jc = aoi_sa_jc[0]
            case 14:
                name = "Aoi Shui"
                ds_hp = aoi_sh_hp[0]
                dt_hp = ds_hp
                ds_energy = aoi_sh_energy[0]
                dt_energy = ds_energy
                d_atk = aoi_sh_atk[0]
                d_fy = aoi_sh_fy[0]
                d_crit = aoi_sh_crit[0]
                d_jc = aoi_sh_jc[0]
            case 15:
                name = "Aoi Lan"
                ds_hp = aoi_l_hp[0]
                dt_hp = ds_hp
                ds_energy = aoi_l_energy[0]
                dt_energy = ds_energy
                d_atk = aoi_l_atk[0]
                d_fy = aoi_l_fy[0]
                d_crit = aoi_l_crit[0]
                d_jc = aoi_l_jc[0]
            case 16:
                name = "Bei Hua"
                ds_hp = bei_hp[0]
                dt_hp = ds_hp
                ds_energy = bei_energy[0]
                dt_energy = ds_energy
                d_atk = bei_atk[0]
                d_fy = bei_fy[0]
                d_crit = bei_crit[0]
                d_jc = bei_jc[0]
            case 17:
                name = "Era"
                ds_hp = era_hp[0]
                dt_hp = ds_hp
                ds_energy = era_energy[0]
                dt_energy = ds_energy
                d_atk = era_atk[0]
                d_fy = era_fy[0]
                d_crit = era_crit[0]
                d_jc = era_jc[0]
            case 18:
                name = "Ert"
                ds_hp = ert_hp[0]
                dt_hp = ds_hp
                ds_energy = ert_energy[0]
                dt_energy = ds_energy
                d_atk = ert_atk[0]
                d_fy = ert_fy[0]
                d_crit = ert_crit[0]
                d_jc = ert_jc[0]
            case 19:
                name = "Hello14"
                ds_hp = he_hp[0]
                dt_hp = ds_hp
                ds_energy = he_energy[0]
                dt_energy = ds_energy
                d_atk = he_atk[0]
                d_fy = he_fy[0]
                d_crit = he_crit[0]
                d_jc = he_jc[0]
            case 20:
                name = "Ichi Ryū"
                ds_hp = ichi_hp[0]
                dt_hp = ds_hp
                ds_energy = ichi_energy[0]
                dt_energy = ds_energy
                d_atk = ichi_atk[0]
                d_fy = ichi_fy[0]
                d_crit = ichi_crit[0]
                d_jc = ichi_jc[0]

    elif qr1.lower == "z":
        name = zf("请输入敌人名称：", "inp")

        ds_hp = zf(f"请输入 {name} 的 HP ：", "inp")
        dt_hp = fd(ds_hp, 0, float("inf"))
        dt_hp = ds_hp

        d_fy = zf(f"请输入 {name} 的防御力 ：", "inp")
        d_fy = zs(d_fy, 0, float("inf"))

        d_atk = zf(f"请输入 {name} 的攻击力 ：", "inp")
        d_atk = zs(d_atk, 0, float("inf"))

        d_crit = zf(f"请输入 {name} 的暴击率 ：（0 ~ 1 之间的数字）", "inp")
        d_crit = fd(d_crit, 0, 1)

        d_jc = zf(f"请输入 {name} 的 JC ：", "inp")
        d_jc = zs(d_jc, 0, float("inf"))

    if sz == "m":
        moren()
    else:
        ziding()

    os.system("cls")
    wuqi = """
    武器列表
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
    护身符列表
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
        zf(wuqi, "default")
        zf(hushenfu, "default")
        print()
        w = zf("请选择合适的武器：", "inp")
        w = zs(w, 0, 35)
        h = zf("请选择合适的护身符：", "inp")
        h = zs(h, 0, 11)
        if (h == 7):
            zf("这会使你的 JC 增加 6 点。", "default")
            z_jc += 6
        zj_atk += wq_z[w]
        zj_fy += hsf_z[h]
    else:
        w = zf("我们可以提供可用的武器列表和护身符列表，是否查看？（是 / 否）", "inp")
        if w.upper() == "是":
            zf("以下可供参考。", "default")
            zf(wuqi, "default")
            zf(hushenfu, "default")

    os.system("cls")

    print("初始状态。")
    print()
    jdt(zs_hp, zt_hp, 0, 0, char, "hp") # 显示角色 HP 信息。
    jdt(zs_energy, zt_energy, 0, 0, char, "energy") # 显示角色 ENERGY 信息。
    print()
    jdt(ds_hp, dt_hp, 0, 0, name, "hp") # 显示敌人 HP 信息。
    jdt(ds_energy, dt_energy, 0, 0, name, "energy") # 显示敌人 ENERGY 信息。
    print()

    count = 0

    jd = 1 # 1：敌人处于 1 阶段；2：敌人处于 2 阶段；3：敌人或者角色被击败。

    while jd != 3:
        count += 1
        zf(f"第 {count} 回合。", "default")
        print()
        gj()
except EOFError as e:
    zf("发生了 EOF 错误。你可能按下了 Ctrl + Z 组合键。", "error")
except KeyboardInterrupt:
    print()
    zf("此次运行被键盘中断。", "error")