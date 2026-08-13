# -*- coding: utf-8 -*-
import os
import sys
import time
import random

string = f"""{os.getlogin()},
    Greetings.
    It seems that you have known the notices in last text document. Now let's just get to the point.
    If you have read the text above, type "A" in the following textbox. (Only a character, no blanks.)
    [A / a]
    Understood.
    Now, let's have a examination then.

    - Question 1 - (10')
    How many notices are there in the "Introduction.txt"?
    [4]

    - Question 2 - (10')
    How many functions were mentioned in "Introduction.txt"?
    [5]

    - Question 3 - (10')
    Who sent "Introduction.txt" to you?
    [Modificationer]

    Excellent. You just passed the examination.
    I'll allow you to get into the RECOVERY SYSTEM.

{random.sample(["Modificationer", "Shatelliti", "Harmony Fashion Developers' Represent", "Xusu Ziye", "Chanf United Government", "Figure_Out OS Development Union", "Qīng Xiàzhì"], 1)}"""

with open("[][][][][][][][][][][][].txt", "w", encoding="utf-8") as f:
    f.write(string)

color = {
    "red": "\033[1;31m",
    "green": "\033[1;32m",
    "yellow": "\033[1;33m",
    "blue": "\033[1;34m",
    "purple": "\033[1;35m",
    "cyan": "\033[1;36m",
    "white": "\033[1;37m",
    "black": "\033[1;30m",
    "darkred": "\033[31m",
    "darkgreen": "\033[32m",
    "darkyellow": "\033[33m",
    "darkblue": "\033[34m",
    "darkpurple": "\033[35m",
    "darkcyan": "\033[36m",
    "lightgray": "\033[0;37m",
    "darkgray": "\033[1;30m",
    "lightred": "\033[91m",
    "lightgreen": "\033[92m",
    "lightyellow": "\033[93m",
    "lightblue": "\033[94m",
    "lightpurple": "\033[95m",
    "lightcyan": "\033[96m",
    "reset": "\033[0m",
}

def zf(text, cl):
    if not isinstance(text, str):
        text = str(text)
    text = r"\/ " + text
    if "\n" in text:
        text += "/\\"
    for i in text:
        print(f"{color[cl]}{i}{color['reset']}", end="", flush=True)
        time.sleep(0.007)
    return input()

a = zf("是否查看已保存的文件？（S / F）", "yellow")
if a.lower() == "s":
    os.system('start "notepad.exe" "%cd%\[][][][][][][][][][][][].txt"')
else:
    sys.exit()
input()