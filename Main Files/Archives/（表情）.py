try:
    import os
    import sys
    import random as rd
    import http.server as hs
    import tkinter as tk
    import keyboard as kb
    import flask as fk
    import pandas as pd
    import turtle as tt
    import pygame as pgm
    import rich
    import json
    import pymysql as sql
    import math
except:
    pass
finally:
    import time
    import asyncio as io

s: list = []
b: str = fr"（表情）"
for i in b:
    s.append(i)

VERY_BIG_NUMBER: int = 65535
KINDA_BIG_NUMBER_16_BITS_SPECIAL_SUPPLY: int = 65536
YET_VERY_BIG_NUMBER: int = 2147483647
SUPER_BIG_NUMBER_32_BITS_SPECIAL_SUPPLY: int = 2147483648

THE_GREAT_RESULT: int = (KINDA_BIG_NUMBER_16_BITS_SPECIAL_SUPPLY - VERY_BIG_NUMBER) * (SUPER_BIG_NUMBER_32_BITS_SPECIAL_SUPPLY - YET_VERY_BIG_NUMBER)

async def output(p):
    print(p, end="\n")
    await io.sleep(0)

while True:
    try:
        io.run(output("".join(s)))
        time.sleep(THE_GREAT_RESULT)
        break
    except:
        break
    finally:
        pass