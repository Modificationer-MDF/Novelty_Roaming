# -*- coding: utf-8 -*-

import time
import rich.console as rc
import os

cs = rc.Console()

color = {
    "perfect": "#00ff00",
    "fabulous": "#9acd32",
    "excellent": "#98fb98",
    "great": "#8fbc8f",
    "good": "#66cdaa",
    "decent": "#20b2aa",
    "fair": "#40e0d0",
    "average": "#00ffff",
    "mild": "#00bfff",
    "moderate": "#0080ff",
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

zf("This is an inp.", "inp")
zf("You are in a perfect situation.", "perfect")
zf("Sounds fabulous.", "fabulous")
zf("How excellent you are!", "excellent")
zf("You are doing great!", "great")
zf("Enjoy a good day.", "good")
zf("You are in a decent situation.", "decent")
zf("Well, this game is definitely fair.", "fair")
zf("You are doing average, but not bad.", "average")
zf("OK, mild.", "mild")
zf("You are moderate.", "moderate")
zf("You are not that mediocre.", "mediocre")
zf("How poor you've done!", "poor")
zf("I hate this awful you.", "awful")
zf("What a horrible day I had.", "horrible")
zf("You are in a critical situation.", "critical")
zf("I feel very severe.", "severe")
zf("What a fatal mistake you made.", "fatal")
zf("I fell into a nightmare.", "nightmare")
zf("You are a disaster.", "disaster")
zf("I feel in a destruction.", "destruction")
zf("An error occurred. (What happened?)", "error")
zf("Well, nothing serious.", "perfect", "   ")
zf("This is actually a joke.", "mild", " ")