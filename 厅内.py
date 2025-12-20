# -*- coding: utf-8 -*-
# Comb Mosha 2025。
from random import *
from re import M
from rich.progress import *
from rich.console import Console
import os
import time
import sys
import math
import webbrowser as wb
import keyboard as kb
cs = Console()

f_hp = [60, 66, 71, 77, 83, 90, 96, 102, 108, 114, 120, 124, 130, 135, 141, 150] # 凤灵诺提
f_energy = [30, 32, 35, 40, 43, 48, 52, 56, 60, 66, 70, 75, 79, 84, 90, 95] # 精力。
f_fy = [2, 3, 4, 5, 6, 7, 8, 9, 8, 8, 9, 10, 12, 13, 15, 17] # 防御力。
f_atk = [3, 3, 5, 7, 7, 8, 9, 10, 9, 10, 9, 10, 10, 11, 13, 15, 18, 22] # 攻击力。
f_crit = [0.2, 0.21, 0.24, 0.27, 0.3, 0.33, 0.37, 0.4, 0.4, 0.42, 0.43, 0.45, 0.5, 0.5, 0.5, 0.55] # 暴击率。
f_jc = [14, 14, 13, 12, 12, 11, 10, 9, 9, 8, 8, 8, 8, 8, 8, 8] # JC。

w_hp = [57, 59, 62, 65, 69, 72, 75, 79, 83, 87, 90, 94, 97, 100, 103, 107] # 惟兹卡玹
w_energy = [34, 37, 40, 45, 50, 54, 60, 65, 70, 74, 78, 83, 90, 96, 102, 107]
w_fy = [3, 4, 4, 5, 6, 7, 8, 9, 10, 12, 14, 15, 16, 17, 19, 22]
w_atk = [2, 2, 3, 5, 5, 5, 5, 6, 7, 7, 7, 8, 9, 10, 11, 11]
w_crit = [0.15, 0.15, 0.16, 0.19, 0.2, 0.22, 0.24, 0.25, 0.25, 0.27, 0.28, 0.28, 0.3, 0.3, 0.3, 0.3]
w_jc = [13, 13, 12, 11, 10, 10, 10, 9, 9, 8, 8, 8, 8, 7, 7, 7]

t_hp = [64, 70, 73, 81, 88, 93, 100, 104, 110, 114, 122, 128, 135, 143, 150, 161] # 千茶年又
t_energy = [25, 26, 28, 30, 33, 36, 41, 48, 50, 55, 60, 65, 73, 68, 73, 76]
t_fy = [2, 3, 4, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 14, 15]
t_atk = [5, 7, 7, 8, 8, 9, 9, 10, 11, 12, 12, 13, 14, 15, 18, 25]
t_crit = [0.5, 0.52, 0.53, 0.54, 0.55, 0.58, 0.6, 0.62, 0.62, 0.65, 0.68, 0.7, 0.75, 0.65, 0.67, 0.7]
t_jc = [16, 15, 14, 13, 13, 12, 12, 11, 11, 11, 10, 10, 10, 10, 10, 10]

z_hp = [59, 62, 65, 68, 72, 76, 80, 84, 88, 93, 98, 102, 108, 113, 116, 120] # 梓柯萨·无布
z_energy = [28, 30, 33, 36, 41, 46, 50, 53, 58, 62, 69, 73, 78, 81, 85, 92]
z_fy = [4, 5, 6, 6, 6, 7, 7, 8, 9, 10, 11, 11, 12, 13, 14, 17]
z_atk = [3, 3, 5, 6, 7, 7, 8, 8, 9, 9, 10, 11, 11, 12, 14, 16]
z_crit = [0.26, 0.27, 0.27, 0.3, 0.32, 0.33, 0.35, 0.37, 0.4, 0.4, 0.4, 0.4, 0.42, 0.44, 0.47, 0.5]
z_jc = [15, 15, 13, 12, 12, 11, 11, 9, 9, 9, 9, 9, 9, 9, 9, 9]

sk_hp = [61, 64, 69, 75, 82, 88, 94, 99, 103, 109, 114, 119, 126, 132, 138, 145] # 肆格莅覆
sk_energy = [30, 32, 35, 40, 43, 48, 52, 56, 60, 66, 70, 75, 79, 84, 90, 95]
sk_fy = [3, 5, 5, 6, 7, 8, 9, 10, 11, 11, 13, 14, 15, 16, 17, 18]
sk_atk = [4, 5, 5, 6, 8, 8, 9, 9, 10, 11, 11, 12, 12, 12, 14, 15]
sk_crit = [0.3, 0.32, 0.33, 0.36, 0.39, 0.4, 0.43, 0.44, 0.47, 0.5, 0.51, 0.54, 0.56, 0.58, 0.6, 0.6]
sk_jc = [15, 15, 14, 14, 14, 13, 13, 12, 11, 10, 9, 9, 9, 8, 8, 8]

ir_hp = [58, 63, 67, 72, 78, 84, 89, 95, 100, 106, 111, 118, 127, 134, 141, 147] # 雨落
ir_energy = [27, 29, 32, 35, 38, 42, 47, 51, 55, 61, 67, 70, 76, 81, 86, 93]
ir_fy = [4, 5, 6, 6, 7, 9, 9, 10, 10, 11, 13, 14, 15, 15, 17, 18]
ir_atk = [3, 4, 5, 5, 6, 7, 7, 8, 9, 11, 12, 14, 15, 17, 18, 19]
ir_crit = [0.24, 0.26, 0.29, 0.31, 0.34, 0.38, 0.4, 0.42, 0.43, 0.44, 0.46, 0.47, 0.49, 0.5, 0.52, 0.54]
ir_jc = [14, 13, 13, 13, 13, 12, 12, 11, 11, 11, 10, 10, 10, 9, 9, 9]

lin_xi_hp = [62, 65, 70, 74, 80, 86, 91, 97, 102, 105, 109, 116, 121, 127, 133, 140] # 林汐
lin_xi_energy = [29, 31, 34, 37, 42, 49, 50, 55, 58, 62, 67, 72, 75, 79, 84, 90]
lin_xi_fy = [6, 8, 9, 9, 10, 12, 13, 13, 14, 16, 17, 17, 18, 20, 21, 22]
lin_xi_atk = [1, 3, 5, 6, 7, 8, 9, 10, 11, 11, 12, 13, 13, 14, 15, 16]
lin_xi_crit = [0.2, 0.21, 0.23, 0.25, 0.27, 0.29, 0.3, 0.32, 0.33, 0.35, 0.37, 0.38, 0.4, 0.42, 0.44, 0.45]
lin_xi_jc = [14, 14, 14, 13, 13, 13, 12, 12, 11, 11, 11, 11, 10, 10, 9, 9]

m_hp = [429, 768, 1022, 1444, 1888, 2367, 3025, 3778, 4400, 5123, 5907, 6666, 7288, 8311, 9298, 10000] # 末谛菥开玄那和纱檀来绨
m_energy = [250, 399, 681, 879, 1000, 1555, 1899, 2467, 3478, 4181, 4777, 5123, 5786, 6539, 7311, 8000]
m_fy = [50, 60, 72, 87, 99, 116, 132, 148, 166, 180, 199, 219, 240, 263, 285, 310]
m_atk = [39, 47, 58, 69, 80, 94, 106, 124, 139, 156, 173, 190, 210, 230, 252, 270]
m_crit = [0.93, 0.94, 0.95, 0.96, 0.97, 0.98, 0.99, 1, 1, 1, 1, 1, 1, 1, 1, 1]
m_jc = [3, 3, 3, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]

x_hp = [188, 267, 381, 495, 599, 708, 826, 934, 1024, 1111, 1209, 1345, 1474, 1589, 1700, 1840] # 絮苏紫叶
x_energy = [100, 172, 260, 345, 412, 578, 665, 781, 887, 989, 1090, 1154, 1291, 1401, 1500, 1646]
x_fy = [28, 38, 49, 61, 70, 82, 91, 100, 110, 120, 131, 143, 155, 167, 180, 195]
x_atk = [20, 28, 39, 50, 62, 71, 79, 88, 98, 107, 119, 132, 145, 159, 174, 190]
x_crit = [0.71, 0.74, 0.76, 0.79, 0.81, 0.81, 0.83, 0.85, 0.87, 0.87, 0.9, 0.9, 0.92, 0.93, 0.94, 0.95]
x_jc = [6, 6, 6, 5, 5, 5, 5, 4, 4, 4, 4, 4, 3, 3, 3, 3]

aka_f_hp = [108] # 赤枫
aka_f_energy = [66]
aka_f_fy = [12]
aka_f_atk = [11]
aka_f_crit = [0.44]
aka_f_jc = [10]

aka_k_hp = [106] # 赤火
aka_k_energy = [65]
aka_k_fy = [10]
aka_k_atk = [12]
aka_k_crit = [0.58]
aka_k_jc = [12]

aka_y_hp = [113] # 赤艳
aka_y_energy = [72]
aka_y_fy = [11]
aka_y_atk = [10]
aka_y_crit = [0.48]
aka_y_jc = [11]

aoi_sa_hp = [103] # 青飒
aoi_sa_energy = [67]
aoi_sa_fy = [11]
aoi_sa_atk = [12]
aoi_sa_crit = [0.42]
aoi_sa_jc = [11]

aoi_sh_hp = [123] # 青水
aoi_sh_energy = [81]
aoi_sh_fy = [14]
aoi_sh_atk = [13]
aoi_sh_crit = [0.66]
aoi_sh_jc = [9]

aoi_l_hp = [107] # 青兰
aoi_l_energy = [65]
aoi_l_fy = [11]
aoi_l_atk = [11]
aoi_l_crit = [0.48]
aoi_l_jc = [12]

bei_hp = [101] # 蓓花
bei_energy = [66]
bei_fy = [11]
bei_atk = [13]
bei_crit = [0.51]
bei_jc = [12]

era_hp = [333] # 时
era_energy = [233]
era_fy = [16]
era_atk = [23]
era_crit = [0.33]
era_jc = [10]

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

ichi_hp = [105] # 一琉
ichi_energy = [65]
ichi_fy = [11]
ichi_atk = [11]
ichi_crit = [0.41]
ichi_jc = [11]

# 林华
lin_hua_hp = [104]
lin_hua_energy = [70]
lin_hua_fy = [13]
lin_hua_atk = [10]
lin_hua_crit = [0.51]
lin_hua_jc = [12]

# 通撤
n_hp = [404]
n_energy = [404]
n_fy = [24]
n_atk = [40]
n_crit = [0.80]
n_jc = [8]

# 机会
o_hp = [139]
o_energy = [92]
o_fy = [16]
o_atk = [18]
o_crit = [0.76]
o_jc = [9]

# 角绎
jy_hp = [109]
jy_energy = [74]
jy_fy = [13]
jy_atk = [14]
jy_crit = [0.54]
jy_jc = [11]

people_text = [
    "没有人在身边。",
    "有几个人因我们的对立而前来围观。",
    "有些人在身旁议论着什么。",
    "一些人正在饶有兴致地观看我们的争执。",
    "路旁站满了群众，人们争先恐后地拍照。",
    "有人报警了，警方已经出动。",
]

people_grade = [
    "乙",
    "丙",
    "戊",
    "庚",
    "壬",
    "癸",
]

all_names = [
    "凤灵诺提",
    "惟兹卡玹",
    "千茶年又",
    "梓柯萨·无布",
    "肆格莅覆",
    "雨落",
    "林汐",
    "末谛菥开玄那和纱檀来绨",
    "絮苏紫叶",
    "赤枫",
    "赤火",
    "赤艳",
    "青飒",
    "青水",
    "青兰",
    "蓓花",
    "时",
    "Ert",
    "Hello14",
    "一琉",
    "林华",
    "通撤",
    "机会",
    "角绎",
]

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

    def pronoun(char):
        if char == "惟兹卡玹" or char == "雨落" or char == "赤火" or char == "青飒" or char == "Ert" or char == "Hello14" or char == "林华" or char == "角绎":
            return "他"
        elif char == "凤灵诺提" or char == "千茶年又" or char == "梓柯萨·无布" or char == "肆格莅覆" or char == "林汐" or char == "絮苏紫叶" or char == "赤枫" or char == "赤艳" or char == "青水" or char == "青兰" or char == "蓓花" or char == "一琉" or char == "机会":
            return "她"
        elif char == "末谛菥开玄那和纱檀来绨":
            return "他们"
        elif char == "时" or char == "通撤":
            return "祂"
        else:
            return "其"

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
z_x = []
z_y = []
for i in range(z_amount):
    if z_amount == 1:
        z_x.append(zs(zf("起始纵坐标？（X 从 0 开始）", "inp"), 0, 9))
        z_y.append(zs(zf("起始横坐标？（Y 从 0 开始）", "inp"), 0, 9))
    else:
        z_x.append(zs(zf(f"第 {i + 1} 位的起始纵坐标？（X 从 0 开始）", "inp"), 0, 9))
        z_y.append(zs(zf(f"第 {i + 1} 位的起始横坐标？（Y 从 0 开始）", "inp"), 0, 9))

os.system("cls")

d_x = []
d_y = []

maze = [["| . |", "| . |", "| . |", "| . |", "| . |", "| . |", "| . |", "| . |", "| . |", "| . |"],
["| . |", "| . |", "| . |", "| . |", "| . |", "| . |", "| . |", "| . |", "| . |", "| . |"],
["| . |", "| . |", "| . |", "| . |", "| . |", "| . |", "| . |", "| . |", "| . |", "| . |"],
["| . |", "| . |", "| . |", "| . |", "| . |", "| . |", "| . |", "| . |", "| . |", "| . |"],
["| . |", "| . |", "| . |", "| . |", "| . |", "| . |", "| . |", "| . |", "| . |", "| . |"],
["| . |", "| . |", "| . |", "| . |", "| . |", "| . |", "| . |", "| . |", "| . |", "| . |"],
["| . |", "| . |", "| . |", "| . |", "| . |", "| . |", "| . |", "| . |", "| . |", "| . |"],
["| . |", "| . |", "| . |", "| . |", "| . |", "| . |", "| . |", "| . |", "| . |", "| . |"],
["| . |", "| . |", "| . |", "| . |", "| . |", "| . |", "| . |", "| . |", "| . |", "| . |"],
["| . |", "| . |", "| . |", "| . |", "| . |", "| . |", "| . |", "| . |", "| . |", "| . |"],]

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
player_step = 0
player_exist = [True for i in range(z_amount)]

def z_move(num):
    global player_caught, player_step

    os.system("cls")
    player_step += 1
    print("""| Z | 表示你的位置，| D | 表示监视者的位置。
使用方向键控制角色，按 ESC 暂停，按 F1 跳过本回合。""")
    print(f"第 {player_step} 步。已有 {player_caught} 人被捕。")
    print()
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
                    zf(f"Z - {num} 被{maze[z_x[num] - 1][z_y[num]].replace('|', '')}捕获。", "癸")
                    player_caught += 1
                    maze[z_x[num]][z_y[num]] = "| . |"
                    player_exist[num] = False
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
                    zf(f"Z - {num} 被{maze[z_x[num] + 1][z_y[num]].replace('|', '')}捕获。", "癸")
                    player_caught += 1
                    maze[z_x[num]][z_y[num]] = "| . |"
                    player_exist[num] = False
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
                    zf(f"Z - {num} 被{maze[z_x[num]][z_y[num] - 1].replace('|', '')}捕获。", "癸")
                    player_caught += 1
                    maze[z_x[num]][z_y[num]] = "| . |"
                    player_exist[num] = False
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
                    zf(f"Z - {num} 被{maze[z_x[num]][z_y[num] + 1].replace('|', '')}捕获。", "癸")
                    player_caught += 1
                    maze[z_x[num]][z_y[num]] = "| . |"
                    player_exist[num] = False
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
    global player_caught
    x_change = True

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
            print(f"D - {num} {inf_x}，{inf_y}。")
            
            if "Z" in maze[d_x[num] + ls_cx][d_y[num] + ls_cy]:
                d_caught_z = maze[d_x[num] + ls_cx][d_y[num] + ls_cy].replace("|", "").replace(" ", "").replace("Z-", "")
                zf(f"D - {num} 将 Z - {d_caught_z} 捕获。", "癸")
                player_caught += 1
                player_exist[int(d_caught_z)] = False
            maze[d_x[num]][d_y[num]] = "| . |"
            d_x[num] += ls_cx
            d_y[num] += ls_cy
            maze[d_x[num]][d_y[num]] = f"| D - {num} |"
            break

while player_caught < z_amount:
    for a in range(z_amount):
        if player_exist[a]:
            z_move(a)
    for b in range(d_amount):
        d_move(b)
    print()
    os.system("pause")
    if player_step == limit_steps:
        zf("你赢了！", "甲")
        sys.exit(0)

zf("你输了！", "癸")