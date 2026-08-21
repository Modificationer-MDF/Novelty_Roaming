# -*- coding: utf-8 -*-

"""
    Hello! If you see this message.
    CONGRATULATIONS!
    YOU REALLY LIKE MODIFYING THE SOURCE CODE OF THE GAME, huh?
    I hate this disgusting act very much.
    I expect you to be honest and close this window, understand?
"""
# Now! Close this window and get out. No doubt you won't regret it.
# Moi! Close it right now!

import os
import sys
import time
import random as rd
import pycaw as pc
import rich
import math

cs = rich.Console()

# Color dictionary.
color = {
    "perfect": "#00ffff",
    "fabulous": "#40e0d0",
    "excellent": "#66cdaa",
    "great": "#98fb98",
    "good": "#9acd32",
    "decent": "#8fbc8f",
    "fair": "#20b2aa",
    "average": "#008080",
    "mild": "#008000",
    "moderate": "#1d80ff",
    "mediocre": "#8470ff",
    "poor": "#a020f0",
    "awful": "#ba55d3",
    "horrible": "#da70d6",
    "critical": "#dd20dd",
    "severe": "#ff00ff",
    "fatal": "#ff69b4",
    "nightmare": "#ff1493",
    "disaster": "#b03060",
    "destruction": "#ff0000",
    "error": "#8b1a1a",
    "inp": "#ffd700",
    "default": "#ffffff",
}

# Alphabet string.
al: str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

# Zifu output.
def zf(text, cl, e = ""):
    if not isinstance(text, str):
        text = str(text)
    
    if "\n" in text:
        text = "\\/ " + text + "/\\"
    else:
        text = "\\/ " + text

    for i in text:
        cs.print(i, style=color[cl], end=e)
        time.sleep(0.007)
    return input()

# Convert str to int.
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

# Convert str to float.
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

# Random int.
def sjzs(p, q): # p: lower bound, q: upper bound.
    return rd.randint(p, q)

# Random float.
def sjfd(p, q): # p: lower bound, q: upper bound.
    return rd.uniform(p, q)

# Random string.
def sjzf(s, l): # s: string, l: length.
    zf: str = ""
    for i in range(l):
        zf += s[sjzs(0, (len(s) - 1))]
    return zf

# Control system volume.
def yl(lv): # lv: volume level.
    if lv < 0 or lv > 100:
        zf("Illegal input.", "error")
        return

# Gently to tell you, you're reaching the bottom of the page.

"""
    Moi! It seems that you read all the source code above, right?
    CONGRATULATIONS!
    You are SO PATIENT! Patiently to read or modify the source code of the game, huh?
    Don't do this again, okey? Don't show off because no one will be impressed.
    It is your FAULT!
"""