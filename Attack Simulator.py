# -*- coding: utf-8 -*-
from random import *
from rich.progress import Progress
import os
import time

ba = 7  # 基础攻击力。
bd = 15  # 基础防御力。

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
        time.sleep(0.03)
    return input()

def jdt(hp, t_hp, js):
    with Progress() as p:
        if js == "dr":
            if hp >= (t_hp * 0.9):
                task = p.add_task(f"[#8b1a1a]敌人 HP： {hp:.3f} / {t_hp:.3f}。", total=t_hp)
            elif hp >= (t_hp * 0.8) and hp < (t_hp * 0.9):
                task = p.add_task(f"[#8b0000]敌人 HP： {hp:.3f} / {t_hp:.3f}。", total=t_hp)
            elif hp >= (t_hp * 0.7) and hp < (t_hp * 0.8):
                task = p.add_task(f"[#8b008b]敌人 HP： {hp:.3f} / {t_hp:.3f}。", total=t_hp)
            elif hp >= (t_hp * 0.6) and hp < (t_hp * 0.7):
                task = p.add_task(f"[#ee1289]敌人 HP： {hp:.3f} / {t_hp:.3f}。", total=t_hp)
            elif hp >= (t_hp * 0.5) and hp < (t_hp * 0.6):
                task = p.add_task(f"[#473c8b]敌人 HP： {hp:.3f} / {t_hp:.3f}。", total=t_hp)
            elif hp >= (t_hp * 0.4) and hp < (t_hp * 0.5):
                task = p.add_task(f"[#4169e1]敌人 HP： {hp:.3f} / {t_hp:.3f}。", total=t_hp)
            elif hp >= (t_hp * 0.3) and hp < (t_hp * 0.4):
                task = p.add_task(f"[#87ceeb]敌人 HP： {hp:.3f} / {t_hp:.3f}。", total=t_hp)
            elif hp >= (t_hp * 0.2) and hp < (t_hp * 0.3):
                task = p.add_task(f"[#ffd700]敌人 HP： {hp:.3f} / {t_hp:.3f}。", total=t_hp)
            elif hp >= (t_hp * 0.1) and hp < (t_hp * 0.2):
                task = p.add_task(f"[#66cdaa]敌人 HP： {hp:.3f} / {t_hp:.3f}。", total=t_hp)
            elif hp > 0 and hp < (t_hp * 0.1):
                task = p.add_task(f"[#20b2aa]敌人 HP： {hp:.3f} / {t_hp:.3f}。", total=t_hp)
        else:
            if hp >= (t_hp * 0.9):
                task = p.add_task(f"[#20b2aa]{js} HP： {hp:.3f} / {t_hp:.3f}。", total=t_hp)
            elif hp >= (t_hp * 0.8) and hp < (t_hp * 0.9):
                task = p.add_task(f"[#66cdaa]{js} HP： {hp:.3f} / {t_hp:.3f}。", total=t_hp)
            elif hp >= (t_hp * 0.7) and hp < (t_hp * 0.8):
                task = p.add_task(f"[#ffd700]{js} HP： {hp:.3f} / {t_hp:.3f}。", total=t_hp)
            elif hp >= (t_hp * 0.6) and hp < (t_hp * 0.7):
                task = p.add_task(f"[#87ceeb]{js} HP： {hp:.3f} / {t_hp:.3f}。", total=t_hp)
            elif hp >= (t_hp * 0.5) and hp < (t_hp * 0.6):
                task = p.add_task(f"[#4169e1]{js} HP： {hp:.3f} / {t_hp:.3f}。", total=t_hp)
            elif hp >= (t_hp * 0.4) and hp < (t_hp * 0.5):
                task = p.add_task(f"[#473c8b]{js} HP： {hp:.3f} / {t_hp:.3f}。", total=t_hp)
            elif hp >= (t_hp * 0.3) and hp < (t_hp * 0.4):
                task = p.add_task(f"[#ee1289]{js} HP： {hp:.3f} / {t_hp:.3f}。", total=t_hp)
            elif hp >= (t_hp * 0.2) and hp < (t_hp * 0.3):
                task = p.add_task(f"[#8b008b]{js} HP： {hp:.3f} / {t_hp:.3f}。", total=t_hp)
            elif hp >= (t_hp * 0.1) and hp < (t_hp * 0.2):
                task = p.add_task(f"[#8b0000]{js} HP： {hp:.3f} / {t_hp:.3f}。", total=t_hp)
            elif hp > 0 and hp < (t_hp * 0.1):
                task = p.add_task(f"[#8b1a1a]{js} HP： {hp:.3f} / {t_hp:.3f}。", total=t_hp)
        p.update(task, completed=hp)
        p.console.print("")

zf(r"""
    你好！欢迎来到 Feng_Noti 的模拟战斗系统。
    我是开发者 Modificationer 。
""", "green")

os.system("cls")
zf(r"""
    角色列表:
    1 - Feng_Noti
    2 - With_Kout
    3 - Tsian_Ca
    4 - Zyxa
    5 - Modificationer
""", "white")
ans = zf("请输入你要模拟的角色编号：", "white")
while True:
    try:
        ans = int(ans)
        if ans < 1 or ans > 5:
            raise ValueError
        break
    except:
        ans = zf("无效输入。请重新输入正确数字。", "red")

hp = zf("请输入敌人 HP ：", "white")
while True:
    try:
        hp = float(hp)
        t_hp = hp
        if hp <= 0:
            raise ValueError
        break
    except:
        hp = zf("无效输入。请重新输入正确数字。", "red")

z_hp = zf("请输入角色 HP ：", "white")
while True:
    try:
        z_hp = float(z_hp)
        zt_hp = z_hp
        if hp <= 0:
            raise ValueError
        break
    except:
        z_hp = zf("无效输入。请重新输入正确数字。", "red")

if (ans != 5):
    ml = zf("请输入角色 ML （0 到 15）： ", "white")
    while True:
        try:
            ml = int(ml)
            if ml < 0 or ml > 15:
                raise ValueError
            break
        except:
            ml = zf("无效输入。请重新输入正确数字。", "red")

jc = zf("请输入敌人 JC （判断角色是否成功）: ", "white")
while True:
    try:
        jc = int(jc)
        break
    except:
        jc = zf("无效输入。请重新输入正确数字。", "red")

os.system("cls")

def gongji(atk, crit):
    try:
        global hp
        global z_hp
        critical = randint(1, 10)
        if ans == 5:
            critical = 5
        weapon = int(zf("请输入武器攻击力 （int）： ", "reset"))
        defense = int(zf("请输入你的防御力 （int）： ", "reset"))
        damage1 = ba + (atk + weapon)
        if 4 <= critical <= 6:
            zf(f"太幸运了！直中中心。本次攻击所造成的伤害将增加至原先的 {100 + 100 * crit}% 。", "cyan")
            damage1 *= (1 + crit)
        else:
            zf(f"这一次打偏了，打到了敌人旁边 {abs(5 - critical)} 米处 。", "blue")
        enemyatk = int(zf("请输入敌人攻击力 （int）: ", "reset"))
        enemydef = int(zf("请输入敌人防御 （int）: ", "reset"))
        check = jc - enemydef
        try:
            damage3 = (enemyatk - defense) + (critical / check)
        except:
            damage3 = enemyatk - defense
        if check <= 0:
            print()
            zf("这次攻击造成了 0 HP 伤害。", "red")
            damage2 = 0
        else:
            damage2 = damage1 * (check / 10)
            zf(f"你造成了 {damage2:.3f} HP 伤害。", "yellow")
            hp -= damage2
        if damage3 <= 0:
            zf("你没有受到任何伤害。", "cyan")
        else:
            zf(f"你受到了 {damage3:.3f} HP 伤害。", "yellow")
            z_hp -= damage3
        if hp <= 0:
            zf("敌人死亡。", "cyan")
        elif z_hp <= 0:
            zf("你死了。", "darkred")
        else:
            jdt(hp, t_hp, "dr")
            jdt(z_hp, zt_hp, "你的")
            print()
    except KeyboardInterrupt:
        zf("此次运行被键盘中断。跳过本次攻击。", "red")
        print()
    except ValueError:
        zf("无效输入，请输入正确数字。跳过本次攻击。", "red")
        print()
    except Exception as e:
        zf(f"发生未知错误： {e} 。跳过本次攻击。", "red")
        print()

count = 0

match ans: # 角色选择。
    case 1: # Feng_Noti。
        while (hp > 0) and (z_hp > 0):
            count += 1
            print(f"第 {count} 次攻击。")
            print()
            match ml: # ML 选择。
                case 0:
                    gongji(3, 0.2)
                case 1:
                    gongji(4, 0.21)
                case 2:
                    gongji(5, 0.24)
                case 3:
                    gongji(7, 0.27)
                case 4:
                    gongji(7, 0.3)
                case 5:
                    gongji(8, 0.33)
                case 6:
                    gongji(7, 0.37)
                case 7:
                    gongji(8, 0.4)
                case 8:
                    gongji(9, 0.4)
                case 9:
                    gongji(10, 0.42)
                case 10:
                    gongji(10, 0.43)
                case 11:
                    gongji(11, 0.45)
                case 12:
                    gongji(13, 0.5)
                case 13:
                    gongji(15, 0.5)
                case 14:
                    gongji(18, 0.55)
                case 15:
                    gongji(18, 0.55)
    case 2: # With_Kout。
        while (hp > 0) and (z_hp > 0):
            count += 1
            print(f"第 {count} 次攻击。")
            print()
            match ml: # ML 选择。
                case 0:
                    gongji(2, 0.15)
                case 1:
                    gongji(2, 0.15)
                case 2:
                    gongji(3, 0.16)
                case 3:
                    gongji(5, 0.19)
                case 4:
                    gongji(5, 0.2)
                case 5:
                    gongji(5, 0.22)
                case 6:
                    gongji(5, 0.24)
                case 7:
                    gongji(6, 0.25)
                case 8:
                    gongji(7, 0.25)
                case 9:
                    gongji(7, 0.27)
                case 10:
                    gongji(7, 0.28)
                case 11:
                    gongji(8, 0.28)
                case 12:
                    gongji(9, 0.3)
                case 13:
                    gongji(11, 0.3)
                case 14:
                    gongji(11, 0.3)
                case 15:
                    gongji(11, 0.3)
    case 3: # Tsian_Ca。
        while (hp > 0) and (z_hp > 0):
            count += 1
            print(f"第 {count} 次攻击。")
            print()
            match ml: # ML 选择。
                case 0:
                    gongji(5, 0.5)
                case 1:
                    gongji(7, 0.52)
                case 2:
                    gongji(7, 0.53)
                case 3:
                    gongji(8, 0.54)
                case 4:
                    gongji(8, 0.55)
                case 5:
                    gongji(9, 0.58)
                case 6:
                    gongji(9, 0.6)
                case 7:
                    gongji(9, 0.6)
                case 8:
                    gongji(11, 0.62)
                case 9:
                    gongji(13, 0.65)
                case 10:
                    gongji(14, 0.65)
                case 11:
                    gongji(15, 0.65)
                case 12:
                    gongji(17, 0.65)
                case 13:
                    gongji(17, 0.65)
                case 14:
                    gongji(18, 0.67)
                case 15:
                    gongji(23, 0.7)
    case 4: # Zyxa。
        while (hp > 0) and (z_hp > 0):
            count += 1
            print(f"第 {count} 次攻击。")
            print()
            match ml: # ML 选择。
                case 0:
                    gongji(4, 0.26)
                case 1:
                    gongji(3, 0.27)
                case 2:
                    gongji(5, 0.27)
                case 3:
                    gongji(6, 0.3)
                case 4:
                    gongji(5, 0.27)
                case 5:
                    gongji(7, 0.33)
                case 6:
                    gongji(5, 0.27)
                case 7:
                    gongji(8, 0.4)
                case 8:
                    gongji(9, 0.4)
                case 9:
                    gongji(10, 0.4)
                case 10:
                    gongji(10, 0.4)
                case 11:
                    gongji(11, 0.4)
                case 12:
                    gongji(12, 0.42)
                case 13:
                    gongji(13, 0.44)
                case 14:
                    gongji(16, 0.5)
                case 15:
                    gongji(13, 0.4)
    case 5: # Modificationer。
        while (hp > 0):
            count += 1
            print(f"第 {count} 次攻击。")
            print()
            gongji(999, 0.99)
