# -*- coding: utf-8 -*-
# Mosha Comb 2025 ~ 2026。
from calendar import c
from pickle import TRUE
from random import *
from re import M, S
from secrets import randbelow
from turtle import st
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
        BarColumn(bar_width=60),
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

def print_cards(j): # j：玩家编号。
    print(k_sx[j].card)

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

def card_handingout(k): # 分发卡牌。id：玩家编号。
    cardlist =["红 - 0", "红 - 1", "红 - 2", "红 - 3", "红 - 4", "红 - 5", "红 - 6", "红 - 7", "红 - 8", "红 - 9", "红 - +2", "红 - 跳过", "红 - 反转",
    "蓝 - 0", "蓝 - 1", "蓝 - 2", "蓝 - 3", "蓝 - 4", "蓝 - 5", "蓝 - 6", "蓝 - 7", "蓝 - 8", "蓝 - 9", "蓝 - +2", "蓝 - 跳过", "蓝 - 反转",
    "绿 - 0", "绿 - 1", "绿 - 2", "绿 - 3", "绿 - 4", "绿 - 5", "绿 - 6", "绿 - 7", "绿 - 8", "绿 - 9", "绿 - +2", "绿 - 跳过", "绿 - 反转",
    "黄 - 0", "黄 - 1", "黄 - 2", "黄 - 3", "黄 - 4", "黄 - 5", "黄 - 6", "黄 - 7", "黄 - 8", "黄 - 9", "黄 - +2", "黄 - 跳过", "黄 - 反转",
    "变色", "+4", "*2", "^2", "转向"] # 所有卡牌集合。
    
    id_cards = [] # 玩家应得的卡牌。
    # 随机抽取 cardlist 里的卡牌，抽取 k 张。
    for i in range(k):
        id_cards.append(choice(cardlist))
    return id_cards

amount = 0 # 人数。
k_sx = [] # 手牌属性。
flag = False # 结束标志。
class cards: # 手牌。
    def __init__(self, sf, card):
        self.sf = sf
        self.card = card

def start():
    for i in range(amount):
        print(i, end="：")
        print_cards(7)
    flag = True

if __name__ == "__main__":
    os.system("cls")
    amount = zs(zf("一共有多少人？", "xz"), 1, 9)
    k_sx = [
        cards(i + 1, card_handingout(7)) for i in range(amount)
    ]
    start()