# -*- coding: utf-8 -*-
from random import *
from rich.progress import *
from rich.console import Console
import os
import time
import sys
import math
import keyboard as kb
import pygame as pgm

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
    "cyan": "#00ffff",
    "crimson": "#dc143c",
    "coral": "#ff7f50",
    "teal": "#008080",
    "plum": "#dda0dd",
    "salmon": "#fa8072",
    "turquoise": "#40e0d0",
    "chartreuse": "#7fff00",
    "dodgerblue": "#1e90ff",
    "mediumseagreen": "#3cb371",
    "firebrick": "#b22222",
    "silver": "#c0c0c0",
    "dimgray": "#696969",
    "limegreen": "#32cd32",
    "royalblue": "#4169e1",
}

z_x = []
z_y = []

d_x = []
d_y = []

d_target = [-1] * 99 
d_speed = [0] * 99  
d_turns = [0] * 99

monitor_out = 0
player_out = 0
player_getdizzy = 0
t_playerattack = 0 # 玩家攻击总次数。
player_missed = 0 # 玩家落空总次数。
player_crit = 0 # 玩家暴击总次数。
player_faildm = 0 # 弹幕躲避失败。
player_cgdm = 0 # 弹幕躲避成功。
player_hitwall = 0
player_slipped = 0
random_dout = 0
random_zout = 0

ls_crit = False
qj_intro = False # 介绍玩法。

current_track = ""

class Z: # 角色属性。
    def __init__(self, hp, thp, energy, tenergy, name, atk, crit, fy, jc, exist, zdz, jz, dizzy, kr, tkr):
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
        self.zdz = [] if zdz is None else zdz # 角色在与谁战斗？
        self.jz = jz # 角色被停止活动的回合数。
        self.dizzy = dizzy # 角色是否眩晕。
        self.kr = kr # KR 计时器。
        self.tkr = tkr # KR 总时长。

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
        self.zdz = [] if zdz is None else zdz
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

def fin():
    global player_escaped
    os.system("cls")
    bf("Res.mp3", -1)
    zf("结束。", "text")

    print()

    if monitor_out == d_amount:
        player_escaped += player_existing

    attack_point = 7

    per1 = player_escaped / z_amount
    per2 = player_out / z_amount
    per3 = monitor_out / d_amount
    per7 = (player_missed / t_playerattack) if t_playerattack != 0 else 0
    per8 = (player_crit / t_playerattack) if t_playerattack != 0 else 0

    ls_s1 = 100 / z_amount # 每一位 Z 逃脱可获得的分数。
    ls_s2 = 100 / (0.7 * z_amount) # 每一位 Z 出局应失去的分数。
    ls_s3 = 100 / (0.75 * d_amount) # 每一位 D 被击败可获得的分数。
    ls_s4 = 100 / (3.9 * z_amount) # 每一次 Z 撞墙应失去的分数。
    ls_s5 = 100 / (3.1 * z_amount) # 每一次 Z 掉入水洼应失去的分数。
    ls_s6 = 100 / (1.4 * z_amount) # 每一次 Z 眩晕应失去的分数。
    ls_s7 = attack_point * 3.5 # 每一次攻击落空应失去的分数（* -2.5）。
    ls_s8 = attack_point * 1.1 # 每一次暴击可获得的分数（* 2.1）。

    qj_rank = attack_point * t_playerattack + player_escaped * ls_s1 - player_out * ls_s2 + monitor_out * ls_s3 - player_hitwall * ls_s4 - player_slipped * ls_s5 - player_getdizzy * ls_s6 - player_missed * ls_s7 + player_crit * ls_s8
    qj_trank = z_amount * ls_s1 + d_amount * ls_s3 + attack_point * t_playerattack

    zf(f"逃离的角色数量：{player_escaped} / {z_amount}（{(per1 * 100):.3f}%，+{(player_escaped * ls_s1):.3f}）。", "watergreen")
    zf(f"出局的角色数量：{player_out} / {z_amount}（{(per2 * 100):.3f}%，-{(player_out * ls_s2):.3f}）。其中被随机事件处罚的有 {random_zout} 位。", "firebrick")
    zf(f"出局的看守者数量：{monitor_out} / {d_amount}（{(per3 * 100):.3f}%，+{(monitor_out * ls_s3):.3f}）。其中被随机事件处罚的有 {random_dout} 位。", "silver")
    zf(f"角色累计撞墙次数：{player_hitwall}（-{(player_hitwall * ls_s4):.3f}）。", "lightblue")
    zf(f"角色累计掉入水洼次数：{player_slipped}（-{(player_slipped * ls_s5):.3f}）。", "royalblue")
    zf(f"角色累计眩晕次数：{player_getdizzy}（-{(player_getdizzy * ls_s6):.3f}）。", "silver")
    zf(f"累计打出攻击 {t_playerattack} 次，落空 {player_missed} 次（弹幕躲避失败 {player_faildm} 次，落空率 {(per7 * 100):.3f}%），暴击 {player_crit} 次（弹幕躲避成功 {player_cgdm} 次，暴击率 {(per8 * 100):.3f}%）。得分 {(attack_point * t_playerattack - player_missed * ls_s7 + player_crit * ls_s8):.3f}。", "limegreen")
    print()
    jdt(qj_rank, qj_trank, "", "score", "me", "分")
    print()
    zf("以上是你的分数和评级。", "text")

    if qj_rank / qj_trank >= 1:
        print()
        bf("Victory.wav", 1)
        zf("666 这个入是桂。", "甲")
        if z_amount <= 2 or d_amount <= 2: # 判断角色数量。
            zf("下次尝试多加几个角色以证明你的能力。", "cyan")
        else:
            zf("大佬牛逼！", "甲")

        if sf_zhp == "2" or sf_dhp == "2": # 判断 HP 来源。
            zf("下次请让系统随机生成 HP 以证明你的能力。", "cyan")

        if sf_zenergy == "2" or sf_denergy == "2": # 判断 ENERGY 来源。
            zf("下次请让系统随机生成 HP。", "cyan")
    elif qj_rank <= 0:
        bf("Twisted Victory.wav", 1)
        zf("如果实在不会玩，可以修改源代码。建议修改 dm() 和 gj() 处计算逻辑。", "cyan")
        zf("打开 Visual Studio（Visual Code）或记事本，按下 Ctrl+F（或者 Ctrl+H，慎用替换） 打开查找与替换，键入 “def dm(” 或 “def gj(” 后修改关键变量。（例如 duration、hitcost）", "cyan")

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

def jdt(current, total, char, typ, side, unit): 
    # current：当前值；total：总值；char：角色；typ：属性；side：阵营；unit：单位。
    column = [
        TextColumn("{task.description}"),
        BarColumn(bar_width=qj_bw),
        TaskProgressColumn(text_format="{task.percentage:.3f}%"),
    ]
    with Progress(*column) as progress:
        t_color: str = ""
        if (side == "me" and typ == "hp") or typ == "score":
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
        elif (side == "enemy" and typ == "hp") or typ == "time remaining":
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

        column.append(TextColumn(f"[{color[t_color]}][{t_color}] {char} {typ.upper()}： {current:.3f} {unit} / {total:.3f} {unit}。"))
        task = progress.add_task("", total=total)
        progress.update(task, completed=current)
        progress.console.print(f"[{color[t_color]}][{t_color}] {char} {typ.upper()}： {current:.3f} {unit} / {total:.3f} {unit}。")

def gj(z_group, d_group):
    global player_missed, player_crit, player_faildm, player_cgdm
    global player_out, monitor_out, player_existing, monitor_existing, maze

    if not z_group or not d_group:
        return

    os.system("cls")
    print("战斗开始！")
    print()
    for z in z_group:
        if z_sx[z].exist:
            jdt(z_sx[z].hp, z_sx[z].thp, z_sx[z].name, "hp", "me", "点")
    print("——————————————————")
    for d in d_group:
        if d_sx[d].exist:
            jdt(d_sx[d].hp, d_sx[d].thp, d_sx[d].name, "hp", "enemy", "点")
    print()

    os.system("pause")

    # 我方攻击阶段（按编号顺序）。
    # 记录每个 Z 选中的目标 D。
    os.system("cls")
    z_targets = {}
    for z in z_group[:]:  # 使用副本，因为可能死亡删除。
        if not z_sx[z].exist:
            continue
        print(f"轮到 {z_sx[z].name} 攻击。")
        available = "、".join([f"D - {d}" for d in d_group if d_sx[d].exist])
        z_input = zf(f"选择目标 ({available})：", "inp")
        if z_input.strip() == "":
            # 空输入，从存活的敌人里随机选一个。
            alive_dlist = [d for d in d_group if d_sx[d].exist]
            if alive_dlist:
                z_targets[z] = choice(alive_dlist)
        else:
            try:
                target_id = int(z_input)
                if target_id in d_group and d_sx[target_id].exist:
                    z_targets[z] = target_id
                else:
                    zf("目标不存在或已阵亡。", "error")
                    alive_dlist = [d for d in d_group if d_sx[d].exist]
                    if alive_dlist:
                        z_targets[z] = choice(alive_dlist)
            except:
                zf("输入无效，将随机选择。", "error")
                alive_dlist = [d for d in d_group if d_sx[d].exist]
                if alive_dlist:
                    z_targets[z] = choice(alive_dlist)

    # 执行我方攻击（按 Z 编号顺序）。
    for z in z_group[:]:
        if not z_sx[z].exist or z not in z_targets:
            continue
        d_ord = z_targets[z]
        if not d_sx[d_ord].exist:
            continue

        # 常规 QTE 和伤害计算。
        z_acc = mz(z_sx[z].name, d_sx[d_ord].name)
        z_damage = randint(6, 9) + z_sx[z].atk
        print()
        if fz_lsstring[z_acc] == "*":
            zf(f"{z_sx[z].name} 打出了暴击！", "乙")
            player_crit += 1
            z_damage *= (1 + (z_sx[z].crit - abs(5 - z_acc) / 50) / 10)
        elif fz_lsstring[z_acc] == "^":
            zf(f"{z_sx[z].name} 打出了精准的一招。", "丙")
        elif fz_lsstring[z_acc] == ".":
            zf(f"{z_sx[z].name} 未能精准命中。", "壬")
            z_damage *= (1 - abs(5 - z_acc) / 30)
        elif fz_lsstring[z_acc] == "×" or not z_acc:
            zf(f"{z_sx[z].name} 落空了。", "癸")
            player_missed += 1
            z_damage = 0

        d_check = d_sx[d_ord].jc * 3.306 - d_sx[d_ord].fy
        if d_check <= 0:
            z_damage = 0
        z_damage *= (d_check / 10) * uniform(0.95, 1.05)
        z_damage = max(0, z_damage)

        zf(f"{z_sx[z].name} 对 {d_sx[d_ord].name} 造成了 {z_damage:.3f} HP 伤害。", "text")
        d_sx[d_ord].hp -= z_damage
        jdt(d_sx[d_ord].hp, d_sx[d_ord].thp, d_sx[d_ord].name, "hp", "enemy", "点")
        input()

        if d_sx[d_ord].hp <= 0:
            zf(f"{d_sx[d_ord].name} 败下阵来。", "甲")
            d_sx[d_ord].exist = False
            monitor_out += 1
            monitor_existing -= 1

    # 敌方反击阶段。
    os.system("cls")
    d_targets = {}
    for d in d_group[:]:
        if not d_sx[d].exist:
            continue
        print(f"轮到 {d_sx[d].name} 反击。")
        available = "、".join([f"Z - {z}" for z in z_group if z_sx[z].exist])
        d_input = zf(f"选择目标 ({available})：", "inp")
        if d_input.strip() == "":
            # 空输入，从存活的 Z 里随机选一个
            alive_zlist = [z for z in z_group if z_sx[z].exist]
            if alive_zlist:
                d_targets[d] = choice(alive_zlist)
        else:
            try:
                target_id = int(d_input)
                if target_id in z_group and z_sx[target_id].exist:
                    d_targets[d] = target_id
                else:
                    zf("目标不存在或已阵亡，将随机选择。", "error")
                    alive_zlist = [z for z in z_group if z_sx[z].exist]
                    if alive_zlist:
                        d_targets[d] = choice(alive_zlist)
            except:
                zf("输入无效，将随机选择。", "error")
                alive_zlist = [z for z in z_group if z_sx[z].exist]
                if alive_zlist:
                    d_targets[d] = choice(alive_zlist)

    # 执行敌方反击。
    for d in d_group[:]:
        if not d_sx[d].exist or d not in d_targets:
            continue
        z_target = d_targets[d]
        if not z_sx[z_target].exist:
            continue

        d_acc = mz(d_sx[d].name, z_sx[z_target].name)
        d_damage = randint(6, 9) + d_sx[d].atk
        dm_enabled = False
        print()
        if fz_lsstring[d_acc] == "*":
            zf(f"{d_sx[d].name} 打出了暴击！", "壬")
            player_crit += 1
            d_damage *= (1 + (d_sx[d].atk - abs(5 - d_acc) / 50) / 10)
        elif fz_lsstring[d_acc] == "^":
            zf(f"{d_sx[d].name} 打出了精准的一招。", "辛")
        elif fz_lsstring[d_acc] == ".":
            zf(f"{d_sx[d].name} 未能精准命中。", "乙")
            d_damage *= (1 - abs(5 - d_acc) / 30)
        elif fz_lsstring[d_acc] == "×" or d_acc == 0:
            zf(f"{d_sx[d].name} 落空了。发射弹幕。", "red")
            dm_enabled = True
            hitdmg_single = randint(6, 9) + d_sx[d].atk
            hitdmg_single *= (1 - abs(5 - d_acc) / 30)
            hitcount = dm(z_target, hitdmg_single)
            if hitcount > 0:
                zf(f"{z_sx[z_target].name} 被 {hitcount} 发弹幕击中。", "癸")
                player_missed += 1
                player_faildm += 1
                d_damage = hitdmg_single * hitcount
            else:
                zf(f"{z_sx[z_target].name} 躲避了所有弹幕。", "甲")
                player_crit += 1
                player_cgdm += 1
                d_damage = 0

        if not dm_enabled:
            z_check = z_sx[z_target].jc * 3.306 - z_sx[z_target].fy
            if z_check <= 0:
                d_damage = 0
            d_damage *= (z_check / 10) * uniform(0.95, 1.05)
            d_damage = max(0, d_damage)
            zf(f"{d_sx[d].name} 对 {z_sx[z_target].name} 造成了 {d_damage:.3f} HP 伤害。", "text")
            z_sx[z_target].hp -= d_damage
            jdt(z_sx[z_target].hp, z_sx[z_target].thp, z_sx[z_target].name, "hp", "me", "点")
            input()

        if z_sx[z_target].hp <= 0:
            zf(f"{z_sx[z_target].name} 败下阵来。", "癸")
            z_sx[z_target].exist = False
            player_out += 1
            player_existing -= 1

    # 结束状态显示。
    os.system("cls")
    print("结束状态。")
    print()
    for z in z_group:
        if z_sx[z].exist:
            jdt(z_sx[z].hp, z_sx[z].thp, z_sx[z].name, "hp", "me", "点")
    print("——————————————————")
    for d in d_group:
        if d_sx[d].exist:
            jdt(d_sx[d].hp, d_sx[d].thp, d_sx[d].name, "hp", "enemy", "点")
    print()
    os.system("pause")

    # 如果某一方全灭，则清除所有人的战斗状态，否则保留状态以便下一轮继续。
    if len([z for z in z_group if z_sx[z].exist]) == 0 or len([d for d in d_group if d_sx[d].exist]) == 0:
        for z in z_group:
            if z_sx[z].exist: z_sx[z].zdz = []
        for d in d_group:
            if d_sx[d].exist: d_sx[d].zdz = []
    # 如果未全灭，则战斗未结束，zdz 保持，下一轮主循环会再次触发 gj。
    os.system("cls")

def dm(z_ord, hitdmg_single): # 躲避弹幕。
    bw = (20 if not ls_crit else 15) # 宽度。
    bh = (20 if not ls_crit else 15) # 高度。
    px, py = bw // 2, bh // 2
    
    # 存储弹幕 [x, y, dx, dy, color, kr]
    bullets = [] 
    hitcount = 0 # 累计被击中的次数。
    start_time = time.time()
    duration = (uniform(5, 8) if not ls_crit else uniform(9, 11))  # 持续时间。
    
    # 初始化第一波弹幕生成计时器。
    next_spawn_time = time.time() + uniform(0.1, 0.3)

    while time.time() - start_time < duration:
        current_time = time.time()
        
        # KR 伤害判定（每帧扣 1 HP，并刷新 UI）。
        if z_sx[z_ord].kr > 0:
            z_sx[z_ord].hp -= z_sx[z_ord].thp * 0.007
            z_sx[z_ord].kr -= 1
            if z_sx[z_ord].hp <= 0:
                os.system("cls")
                return hitcount

        if current_time >= next_spawn_time and len(bullets) < 20:
            spawn_dir = randint(0, 5)
            if spawn_dir == 0:
                bullets.append([randint(0, bw - 1), 0, 0, 1, "white", 0])
            elif spawn_dir == 1:
                bullets.append([randint(0, bw - 1), bh - 1, 0, -1, "white", 0])
            elif spawn_dir == 2:
                bullets.append([0, randint(0, bh - 1), 1, 0, "white", 0])
            elif spawn_dir == 3:
                bullets.append([bw - 1, randint(0, bh - 1), -1, 0, "white", 0])
            elif spawn_dir == 4: # 追踪玩家的洋红色弹幕。
                bx = randint(0, bw - 1)
                by = randint(0, bh - 1)
                vx = 1 if px > bx else -1 if px < bx else 0
                vy = 1 if py > by else -1 if py < by else 0
                bullets.append([bx, by, vx, vy, "magenta", 0])
            elif spawn_dir == 5: # 会移动的红色 KR 弹幕。
                fx = randint(0, 3)
                if fx == 0: # 上。
                    bullets.append([randint(0, bw - 1), 0, 0, 1, "red", randint(11, 39)])
                elif fx == 1: # 下。
                    bullets.append([randint(0, bw - 1), bh - 1, 0, -1, "red", randint(11, 39)])
                elif fx == 2: # 左。
                    bullets.append([0, randint(0, bh - 1), 1, 0, "red", randint(11, 39)])
                elif fx == 3: # 右。
                    bullets.append([bw - 1, randint(0, bh - 1), -1, 0, "red", randint(11, 39)])
            next_spawn_time = current_time + (uniform(0.14, 0.25) if not ls_crit else uniform(0.07, 0.19))

        if kb.is_pressed("up"): py = max(0, py-1)
        if kb.is_pressed("down"): py = min(bh-1, py+1)
        if kb.is_pressed("left"): px = max(0, px-1)
        if kb.is_pressed("right"): px = min(bw-1, px+1)
        
        surviving_bullets = []
        for b in bullets:
            # 弹幕移动逻辑：如果 dx 或 dy 不为 0，则移动。
            if b[2] != 0 or b[3] != 0:
                b[0] += b[2]
                b[1] += b[3]

            # 碰撞检测。
            if b[0] == px and b[1] == py:
                if b[4] == "red":
                    # KR 子弹：应用 Sans 式扣血，并记录最大时长。
                    if z_sx[z_ord].kr == 0:
                        z_sx[z_ord].kr = b[5]
                        z_sx[z_ord].kr_timer_max = b[5] # 记录最大值用于画进度条。
                    continue 
                else:
                    # 普通或追踪弹幕伤害。
                    hitcount += 1
                    hitcost = max(0, hitdmg_single * (uniform(0.5, 0.7) if not ls_crit else uniform(1.1, 1.9)))
                    z_sx[z_ord].hp -= hitcost
                    if z_sx[z_ord].hp <= 0:
                        os.system("cls")
                        return hitcount
                    continue 

            # 边界保留（超出范围则移除）。
            if 0 <= b[0] < bw and 0 <= b[1] < bh:
                surviving_bullets.append(b)
        
        bullets = surviving_bullets

        os.system("cls")
        print("按方向键躲避弹幕。")
        print()
        for y in range(bh):
            print("          ", end="")
            for x in range(bw):
                if px == x and py == y:
                    print("Z ", end="")
                else:
                    is_hit = False
                    for b in bullets:
                        if b[0] == x and b[1] == y:
                            if b[4] == "magenta":
                                cl_print("* ", "magenta", "")
                            elif b[4] == "red":
                                cl_print("* ", "red", "")
                            else:
                                print("* ", end="")
                            is_hit = True
                            break
                    if not is_hit:
                        print(". ", end="")
            print()
        
        # 渲染 UI（倒计时、HP、KR 状态）。
        jdt(duration - (current_time - start_time), duration, "Danmaku", "time remaining", "enemy", "秒")
        print()
        
        # KR 状态下，显示特殊进度条和 [KR] 标记。
        if z_sx[z_ord].kr > 0:
            jdt(z_sx[z_ord].hp, z_sx[z_ord].thp, f"[KR] {z_sx[z_ord].name}", "hp", "me", "点")
            jdt(z_sx[z_ord].kr, z_sx[z_ord].kr_timer_max, "KR", "time remaining", "enemy", "帧")
        else:
            jdt(z_sx[z_ord].hp, z_sx[z_ord].thp, f"{z_sx[z_ord].name}", "hp", "me", "点")
            
        time.sleep(0.05)

    os.system("cls")
    return hitcount

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

def bf(track, l): 
    global current_track
    try:
        if current_track == track and pgm.mixer.music.get_busy():
            return
        
        pgm.mixer.music.stop()
        pgm.mixer.music.unload()
        pgm.mixer.music.load(track)
        pgm.mixer.music.play(loops=l)
        
        current_track = track
    except pgm.error:
        pass

def mz(me, enemy):
    global fz_lsstring, ls_range, t_playerattack

    t_playerattack += 1
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
    print("按下 Shift 攻击。")
    ls_string = list("××××××..................^^***^^..................××××××")
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

            if kb.is_pressed("shift"):
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

            if kb.is_pressed("shift"):
                pressed = True
                break

    if pressed == False:
        l = 0

    return l

if __name__ == "__main__":
    os.system("cls")
    pgm.mixer.init()

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
        Z(0, 0, 0, 0, f"Z - {i}", randint(1, 14), uniform(0.1, 0.9), randint(1, 14), randint(9, 17), True, None, 0, False, 0, 0)
        for i in range(z_amount)
    ]

    d_sx = [
        D(0, 0, 0, 0, f"D - {i}", randint(1, 14), uniform(0.1, 0.9), randint(1, 14), randint(9, 17), True, None, 0, False)
        for i in range(d_amount)
    ]

    print()
    zf("…………", "aqua")

    sf_zwz = xz("是否使用随机生成的起始位置？", ["是。", "否。"])
    sf_zhp = xz("是否使用随机生成的 HP？（范围在 30 到 999 之间）", ["是。", "否。"])
    sf_zenergy = xz("是否使用随机生成的精力？（范围在 5 到 59 之间）", ["是。", "否。"])
    
    for i in range(z_amount):
        if sf_zhp == "1": # 随机 HP。
            z_sx[i].thp = randint(30, 999)
        else: # 自行输入 HP。
            if z_amount == 1: # 一位玩家。
                while True:
                    ls_zhp1 = zs(zf("角色起始 HP？", "inp"), 1, float("inf"))
                    if ls_zhp1 < 30 or ls_zhp1 > 999:
                        ls_rsp1 = zf("建议将 HP 设置在 30 到 999 之间。如无需更改，请按下 1。", "inp")
                        if ls_rsp1 == "1":
                            z_sx[i].thp = ls_zhp1
                            break
                    else:
                        z_sx[i].thp = ls_zhp1
                        break
                if sf_zwz != "1": # 不使用随机生成的起始位置。
                    z_x.append(zs(zf("角色起始纵坐标？（X 从 0 开始）", "inp"), 0, maze_size - 1))
                    z_y.append(zs(zf("角色起始横坐标？（Y 从 0 开始）", "inp"), 0, maze_size - 1))
            else: # 多位玩家。
                while True:
                    ls_zhp2 = zs(zf(f"第 {i + 1} 位角色的起始 HP？", "inp"), 1, float("inf"))
                    if ls_zhp2 < 30 or ls_zhp2 > 999:
                        ls_rsp2 = zf("建议将 HP 设置在 30 到 999 之间。如无需更改，请按下 1。", "inp")
                        if ls_rsp2 == "1":
                            z_sx[i].thp = ls_zhp2
                            break
                    else:
                        z_sx[i].thp = ls_zhp2
                        break
                if sf_zwz != "1": # 不使用随机生成的起始位置。
                    z_x.append(zs(zf(f"第 {i + 1} 位角色的起始纵坐标？（X 从 0 开始）", "inp"), 0, maze_size - 1))
                    z_y.append(zs(zf(f"第 {i + 1} 位角色的起始横坐标？（Y 从 0 开始）", "inp"), 0, maze_size - 1))
        
        z_sx[i].hp = z_sx[i].thp        

    for j in range(z_amount):
        if sf_zenergy == "1": # 随机精力。
            z_sx[j].tenergy = randint(5, 59)
        else:
            while True:
                if z_amount == 1: # 一位玩家。
                    ls_zenergy = zs(zf("角色起始精力？", "inp"), 1, float("inf"))
                else: # 多位玩家。
                    ls_zenergy = zs(zf(f"第 {j + 1} 位角色的起始精力？", "inp"), 1, float("inf"))
                
                if ls_zenergy < 5 or ls_zenergy > 59:
                    ls_rsp3 = zf("建议将精力设置在 5 到 59 之间。如无需更改，请按下 1。", "inp")
                    if ls_rsp3 == "1":
                        z_sx[j].tenergy = ls_zenergy
                        break
                else:
                    z_sx[j].tenergy = ls_zenergy
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

    e_amount = round(max(math.sqrt(maze_size ** 2 / 21), 1))
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
    global monitor_out, random_dout, player_out, random_zout
    def hp_recover():
        if side == "z":
            hp_recover = uniform(0.1, 0.3) * math.sqrt(z_sx[num].thp * randint(9, 15))
            z_sx[num].hp += hp_recover
            zf(f"Z - {num} 恢复了 {hp_recover:.3f} HP。", "甲" if z_sx[num].hp > z_sx[num].thp else "乙")
            jdt(z_sx[num].hp, z_sx[num].thp, f"Z - {num}", "hp", "me", "点")
        elif side == "d":
            hp_recover = uniform(0.1, 0.3) * math.sqrt(d_sx[num].thp * randint(9, 15))
            d_sx[num].hp += hp_recover
            zf(f"D - {num} 恢复了 {hp_recover:.3f} HP。", "癸" if d_sx[num].hp > d_sx[num].thp else "壬")
            jdt(d_sx[num].hp, d_sx[num].thp, f"D - {num}", "hp", "enemy", "点")
        os.system("pause > nul")

    def energy_recover():
        if side == "z":
            energy_recover = uniform(0.1, 0.3) * math.sqrt(z_sx[num].tenergy * randint(9, 15))
            z_sx[num].energy += energy_recover
            zf(f"Z - {num} 的精力恢复了 {energy_recover:.3f}。", "甲" if z_sx[num].energy > z_sx[num].tenergy else "乙")
            jdt(z_sx[num].energy, z_sx[num].tenergy, f"Z - {num}", "energy", "me", "点")
        elif side == "d":
            energy_recover = uniform(0.1, 0.3) * math.sqrt(d_sx[num].tenergy * randint(9, 15))
            d_sx[num].energy += energy_recover
            zf(f"D - {num} 的精力恢复了 {energy_recover:.3f}。", "癸" if d_sx[num].energy > d_sx[num].tenergy else "壬")
            jdt(d_sx[num].energy, d_sx[num].tenergy, f"D - {num}", "energy", "enemy", "点")
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
            if randint(1, 9) <= 3:
                ls_opt = [randint(0, 1), randint(0, 1)] # 0：淘汰一名敌人；1：淘汰一名角色。
                if (ls_opt[0] == 1) or (ls_opt[1] == 0 and side == "z"):
                    while True:
                        ls_dord = randint(0, d_amount - 1)
                        if monitor_out == d_amount:
                            zf("……", "text")
                            zf("无事发生。", "text")
                            break
                        if d_sx[ls_dord].exist:
                            d_sx[ls_dord].exist = False
                            d_sx[ls_dord].zdz = []
                            maze[d_x[ls_dord]][d_y[ls_dord]] = f"| . |"
                            zf(f"D - {ls_dord} 突然消失了！", "甲")
                            monitor_out += 1
                            random_dout += 1
                            break
                elif (ls_opt[0] == 0) or (ls_opt[1] == 1 and side == "d"):
                    while True:
                        ls_zord = randint(0, z_amount - 1)
                        if player_out == z_amount:
                            zf("……", "text")
                            zf("无事发生。", "text")
                            break
                        if z_sx[ls_zord].exist:
                            z_sx[ls_zord].exist = False
                            z_sx[ls_zord].zdz = []
                            maze[z_x[ls_zord]][z_y[ls_zord]] = f"| . |"
                            zf(f"Z - {ls_zord} 突然消失了！", "癸")
                            player_out += 1
                            random_zout += 1
                            break
            else:
                zf("无事发生。", "text")

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
        case 7: # 恢复精力。
            energy_recover()

def chase(z_idx, emer = False): # 紧急状态：出口附近。
    global ls_crit
    ls_crit = True
    if emer:
        for i in range(d_amount):
            if d_sx[i].exist:
                d_target[i] = z_idx
                d_turns[i] = 0 # 重置追踪回合。
                d_speed[i] = 1
    else:
        # 招引（撞墙/摔倒）
        min_dist = 9999
        nearest_d = -1
        for i in range(d_amount):
            if d_sx[i].exist:
                dist = abs(d_x[i] - z_x[z_idx]) + abs(d_y[i] - z_y[z_idx])
                if dist < min_dist:
                    min_dist = dist
                    nearest_d = i
        if nearest_d != -1:
            d_target[nearest_d] = z_idx
            d_turns[nearest_d] = 0   # 重置追踪回合。
            d_speed[nearest_d] = 0

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
    global player_step, qj_intro

    turn_index = 0

    def keyboard_control(bh_x, bh_y):
        global player_existing, maze, player_escaped, player_slipped, player_getdizzy, player_hitwall, player_out
        destination_x, destination_y = z_x[num] + bh_x, z_y[num] + bh_y
        
        z_sx[num].energy -= 1

        # 水洼处理。
        if maze[destination_x][destination_y] == "| _ |":
            z_slip = uniform(0.19, 0.3) * math.sqrt(z_sx[num].thp * randint(9, 15))
            zf(f"Z - {num} 不小心踩进了水洼！他摔倒了，丧失了 {z_slip:.3f} HP。他停止活动一回合！", "辛")
            z_sx[num].hp -= z_slip
            z_sx[num].jz = 2
            chase(num, False) # 招引看守者。
            player_slipped += 1
            print()
            if z_sx[num].hp <= 0:
                zf(f"Z - {num} 摔倒了，看来他不得不休息三回合！", "壬")
                player_getdizzy += 1
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
                d_idszf = "、".join([f"D - {d}" for d in d_ids])
                ls_caughtzf = f"Z - {num} 被 {d_idszf} 捕获。"
                # 将 D 的 ID 列表存到 Z 的战斗列表中。
                z_sx[num].zdz = [int(x) for x in d_ids]
                # 同时也把这些 D 的目标标记为 Z。
                for d_id in d_ids:
                    d_sx[int(d_id)].zdz.append(num)

        z_x[num] = destination_x
        z_y[num] = destination_y

        for e in range(e_amount):
            if abs(z_x[num] - e_x[e]) <= 1 and abs(z_y[num] - e_y[e]) <= 1:
                chase(num, True) # 开启最大移速围堵。

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
        global player_hitwall, player_getdizzy
        if i < 3:
            cl_print(f"向{fx}走不通。", "error", "\n")
        else:
            if i == 3:
                zf(f"如果，你非要向{fx}走的话……", "red")
            z_hitwall = uniform(0.25, 0.49) * math.sqrt(z_sx[num].thp * randint(14, 22) + i ** i)
            zf(f"Z - {num} 撞向了{fx}方的墙壁！丧失了 {z_hitwall:.3f} HP。", "辛")
            z_sx[num].hp -= z_hitwall
            chase(num, False) # 招引看守者。
            player_hitwall += 1
            jdt(z_sx[num].hp, z_sx[num].thp, f"Z - {num}", "hp", "me", "点")
            if z_sx[num].hp <= 0:
                zf(f"Z - {num} 撞晕了，看来他不得不休息三回合。", "壬")
                z_sx[num].jz = 4
                z_sx[num].hp = 0.001
                z_sx[num].dizzy = True
                player_getdizzy += 1
                return -1
            print()
        i += 1
        return i

    for i in range(2):
        turn_index += 1

        os.system("cls")

        if qj_intro == False:
            print("""| Z | 表示你的位置，| D | 表示看守者的位置，| . | 表示空格子，| Z , D | 表示你和看守者在同一格子内；| ; | 表示障碍物，不可通行；
进入 | _ | 会让 Z 和 D 摔倒、失去部分 HP 并停止移动一回合；| ^ | 表示随机事件格，进入后会触发随机事件；进入 | → | 后，Z 将逃离迷宫。
所有角色逃离后将获得胜利。

使用方向键控制角色，按 ESC 暂停，按 F1 跳过本次移动，按 F3 跳过本回合。
        """)
            cl_print("一回合可以移动两次。", "watergreen", "\n\n")
            qj_intro = True

        if player_existing > 1 and ls_crit == False:
            print(f"已走 {player_step} 步。还有 {player_existing} 名角色在场，共 {z_amount} 名；还有 {monitor_existing} 名看守者在场，共 {d_amount} 名。")
        else:
            if ls_crit:
                cl_print(f"收债。", "watergreen", "\n")
            cl_print(f"已走 {player_step} 步！还有 {player_existing} 名角色在场，共 {z_amount} 名；还有 {monitor_existing} 名看守者在场，共 {d_amount} 名！", "red", "\n")

        print_map("z", num)
    
        jdt(z_sx[num].energy, z_sx[num].tenergy, f"Z - {num}", "energy", "me", "点")
        print()
        
        if z_sx[num].energy - 1 <= 0:
            zf(f"Z - {num} 的精力不足以继续移动了！他必须休息一回合。", "text")
            z_sx[num].energy += uniform(0.4, 0.8)
            os.system("pause > nul")
            return

        print(f"现在移动 Z - {num}。")
        et = 0
        if z_sx[num].exist and len(z_sx[num].zdz) == 0 and z_sx[num].dizzy == False:
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
    global player_existing, maze, player_out, ls_crit

    is_chasing = False
    target_z = d_target[num]
    
    # 检查是否有活着的追踪目标。
    if target_z != -1 and z_sx[target_z].exist:
        is_chasing = True
        d_turns[num] += 1
        
        # 追了 3 回合，丢失目标。
        if d_turns[num] >= 3:
            zf(f"D - {num} 放弃了追击 Z - {target_z}。", "text")
            d_target[num] = -1
            d_speed[num] = 0
            d_turns[num] = 0
            is_chasing = False # 切换回随机巡逻。
            bf("Dodged.wav", 1)
            ls_crit = False
    # 目标刚好在当回合出局。
    elif target_z != -1 and not z_sx[target_z].exist:
        d_target[num] = -1
        d_speed[num] = 0
        d_turns[num] = 0
        is_chasing = False
        bf("Dodged.wav", 1)
        ls_crit = False

    while True:
        if d_sx[num].energy - 2 <= 0:
            inf = f"的精力不足以继续移动了！他必须休息一回合"
            d_sx[num].energy += uniform(0.4, 0.8) + uniform(0.4, 0.8)

        maxstep = 2 if d_speed[num] == 1 else 1
        for _ in range(maxstep):
            if is_chasing:
                inf = f"正在追击 Z - {target_z}"
                x_change = True
                ls_cx = 1 if z_x[target_z] > d_x[num] else -1 if z_x[target_z] < d_x[num] else 0
                ls_cy = 1 if z_y[target_z] > d_y[num] else -1 if z_y[target_z] < d_y[num] else 0                
            else:
                if d_sx[num].energy - 2 <= 0:
                    inf = f"的精力不足以继续移动了！他必须休息一回合"
                    d_sx[num].energy += uniform(0.4, 0.8) + uniform(0.4, 0.8)

                ls_cx = randint(-1, 1)
                ls_cy = randint(-1, 1)
                
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

            if 0 <= ls_cx + d_x[num] <= maze_size - 1 and 0 <= ls_cy + d_y[num] <= maze_size - 1 and maze[ls_cx + d_x[num]][ls_cy + d_y[num]] != "| ; |":
                
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
                    ls_waiting = f"D - {num} 发现了出口，他决定守株待兔三回合。（在此期间，此处出口无效）"
                    d_sx[num].jz = 4
                    break
                
                if "Z" in maze[destination_x][destination_y]:
                    destination_xy = maze[destination_x][destination_y]
                    z_ids = [] 
                    parts = destination_xy.replace("|", "").replace(" ", "").split(',')
                    for ls in parts:
                        if ls.startswith("Z-"):
                            z_id = ls.replace("Z-", "")
                            if z_id:
                                z_ids.append(z_id)
            
                    if z_ids: # 若有被抓角色。
                        z_idszf = "、".join([f"Z - {z}" for z in z_ids])
                        ls_caughtzf = f"D - {num} 将 {z_idszf} 捕获。"
    
                        # 1. 如果是单抓（只抓到 1 个 Z），用追加的方式记录！
                        if len(z_ids) == 1:
                            # Z 端追加 D。
                            if num not in z_sx[int(z_ids[0])].zdz:
                                z_sx[int(z_ids[0])].zdz.append(num)
                            # D 端追加 Z。
                            if int(z_ids[0]) not in d_sx[num].zdz:
                                d_sx[num].zdz.append(int(z_ids[0]))
        
                        # 2. 如果是多抓（抓到 >= 2 个 Z），初始化多对多战斗。
                        else:
                            d_sx[num].zdz = [int(x) for x in z_ids]
                            for z_id in z_ids:
                                if num not in z_sx[int(z_id)].zdz:
                                    z_sx[int(z_id)].zdz.append(num)
                    
                d_x[num] += ls_cx
                d_y[num] += ls_cy

                # 每次移动后，还原 is_chasing。
                if d_x[num] == z_x[target_z] and d_y[num] == z_y[target_z] and is_chasing:
                    is_chasing = False
                    break # 已经到了。

                # 极速追击走完两步或完成一次移动后退出子循环。
                if _ == maxstep - 1:
                    break
            else:
                # 撞墙。
                break

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

        jdt(d_sx[num].energy, d_sx[num].tenergy, f"D - {num}", "energy", "enemy", "点")
        print()
        zf(f"D - {num} {inf}。", "text")
        if ls_caughtzf != "":
            zf(ls_caughtzf, "癸")
        if ls_slipped != "":
            zf(ls_slipped, "丙")
            jdt(d_sx[num].hp, d_sx[num].thp, f"D - {num}", "hp", "enemy", "点")
            input()
        if ls_dizzying != "":
            zf(ls_dizzying, "乙")
        break

player_existing = z_amount
monitor_existing = d_amount
player_escaped = 0 # 逃脱的角色数量。

bf("Morbin Time!.mp3", -1)

try:
    while player_existing > 0 and monitor_existing > 0:
        player_existing = 0
        monitor_existing = 0
        processed_thisround = set()  # 本回合已处理战斗组的 Z 集合
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
            if a in processed_thisround:
                continue

            if z_sx[a].dizzy and z_sx[a].exist:
                z_sx[a].hp = min(z_sx[a].hp + uniform(0.7, 1.4) * math.sqrt(z_sx[a].thp * randint(10, 17)), z_sx[a].thp)
                if z_sx[a].dizzy and z_sx[a].jz == 0 and z_sx[a].exist:
                    z_sx[a].dizzy = False # 眩晕时间结束。
                    zf(f"Z - {a} 重新开始行动。", "乙")
                    jdt(z_sx[a].hp, z_sx[a].thp, f"Z - {a}", "hp", "me", "点")
                    os.system("pause > nul")

            if z_sx[a].exist and len(z_sx[a].zdz) > 0:
                # 收集同战场所有 Z（包括 a）。
                battle_z = [a] + [z for z in range(z_amount) if z != a and z_sx[z].exist and len(z_sx[z].zdz) > 0 and set(z_sx[z].zdz) & set(z_sx[a].zdz)]
                battle_z = list(set(battle_z))  # 去重，按编号顺序。
                battle_z.sort()
            
                # 收集所有涉及的 D。
                battle_d = []
                for z in battle_z:
                    for d in z_sx[z].zdz:
                        if d_sx[d].exist and d not in battle_d:
                            battle_d.append(d)
                battle_d.sort()
            
                # 执行一轮战斗。
                if battle_z and battle_d:
                    gj(battle_z, battle_d)
                processed_thisround.update(battle_z)
            elif z_sx[a].exist and len(z_sx[a].zdz) == 0 and z_sx[a].jz <= 0:
                    z_move(a)

        for b in range(d_amount):
            if d_sx[b].dizzy and d_sx[b].exist:
                d_sx[b].hp = min(d_sx[b].hp + uniform(0.7, 1.4) * math.sqrt(d_sx[b].thp * randint(10, 17)), d_sx[b].thp)
                if d_sx[b].dizzy and d_sx[b].jz == 0 and d_sx[b].exist:
                    d_sx[b].dizzy = False # 眩晕时间结束。
                    zf(f"D - {b} 重新开始行动。", "壬")
                    jdt(d_sx[b].hp, d_sx[b].thp, f"D - {b}", "hp", "enemy", "点")
                    os.system("pause > nul")

            if d_sx[b].exist and len(d_sx[b].zdz) == 0 and d_sx[b].jz <= 0:
                d_move(b)
            d_sx[b].jz -= 1

        if (player_existing == 1) and (z_amount >= 3):
            ls_crit = True

            lone_z = -1
            for a in range(z_amount):
                if z_sx[a].exist:
                    lone_z = a
                    break
                    # 所有存活的 D 锁定 Z 并进入极速追击。
            if lone_z != -1:
                for b in range(d_amount):
                    if d_sx[b].exist:
                        d_target[b] = lone_z
                        d_turns[b] = 0  # 不放弃。
                        d_speed[b] = 1

        if ls_crit:
            bf("Critical DEBT!!!.mp3", -1)
        elif ls_crit == False:
            bf("Morbin Time!.mp3", -1)
except KeyboardInterrupt:
    fin()
    sys.exit(1)

os.system("cls")
if ls_crit:
    bf("Dodged.wav", 1)

fin()