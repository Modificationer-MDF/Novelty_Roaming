# -*- coding: utf-8 -*-
from random import *
from rich.progress import *
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
    column = [
        TextColumn("{task.description}"),
        BarColumn(),
        TaskProgressColumn(text_format="[#ffffff]{task.percentage:.3f}%"),
    ]
    with Progress(*column) as p:
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

os.system("cls")
zf(r"""
    你好！欢迎来到 Feng_Noti 的模拟战斗系统。
    我是开发者 Modificationer 。
""", "green")
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
w = zf("我们可以提供可用的武器列表，是否查看？（是 / 否）", "white")
if w == "是":
    zf("以下可供参考。", "yellow")
    zf("""
武器列表
    - 手（攻击力 + 1）；
    - 笔（攻击力 + 1）；
    - 木棍（攻击力 + 2）；
    - 鞋（攻击力 + 2）；
    - 笔袋（攻击力 + 2）；
    - 树枝（攻击力 + 3）；
    - 长绳（攻击力 + 3）；
    - 球（攻击力 + 3）；
    - 垃圾（攻击力 + 3）；
    - 斧头（攻击力 + 4）；
    - 铁制易拉罐（攻击力 + 4）；
    - 玩具刀（攻击力 + 4）；
    - 挂钩（攻击力 + 4）；
    - 硬帽（攻击力 + 5）；
    - 卷尺（攻击力 + 5）；
    - 戒尺（攻击力 + 6）；
    - 手套（攻击力 + 6）；
    - 玩具枪（攻击力 + 7）；
    / - 重笔记本（攻击力 + 7）；
    / - 围巾（攻击力 + 7）；
    / - 茶壶（攻击力 + 7）；
    - 纸板（攻击力 + 7）；
    - 水枪（攻击力 + 8）；
    - 金球（攻击力 + 8）；
    - 电线（攻击力 + 9）；
    - 平底锅（攻击力 + 9）；
    - 电磁枪（攻击力 + 10）；
    - 电动木棍（攻击力 + 11）；
    - 刀（攻击力 + 12）；
    - 扳手（攻击力 + 13）；
    - 水果刀（攻击力 + 16）；
    * - 枪（攻击力 + 18）；
    * - 锯子（攻击力 + 20）；
    ! - 智能设备（攻击力 + 99）；
    ! - 状态遥控器（攻击力 + 99）；
    ! - 终端（攻击力 + 99）。
""", "reset")

os.system("cls")
def gongji(atk, crit, j):
    try:
        act = zf("饶恕还是攻击？（R / G）", "darkred")
        if act == "R":
            r = randint(1, 10)
            d = randint(1, 10)
            m = randint(1, 3)
            zf(f"你选择饶恕。（{r}）", "lightgreen")
            if (r != d) and (r > d) and (r - d >= m):
                zf(f"敌人接受了你的饶恕。（{d}，{m}）", "cyan")
                sys.exit(0)
            else:
                zf(f"敌人不为所动。（{d}, {m}）", "lightred")
                print()
        elif act == "G":
            global hp
            global z_hp
            critical = randint(1, 10)
            c = randint(1, 10)
            if ans == 5:
                critical = 5
        
            weapon = int(zf("请输入武器攻击力 （int）： ", "reset"))
            defense = int(zf(f"请输入你的防御力 （int， JC：{j}。）： ", "reset"))
            enemyatk = int(zf("请输入敌人攻击力 （int）： ", "reset"))
            enemydef = int(zf(f"请输入敌人防御 （int， JC：{jc}。）： ", "reset"))

            damage1 = ba + (atk + weapon)
            damage2 = ba + enemyatk

            if (4 <= critical <= 6):
                zf(f"太幸运了！直中中心。本次攻击所造成的伤害将增加至原先的 {100 + 100 * crit}% 。", "cyan")
                if (crit >= critical / 10):
                    damage1 *= (1 + crit)
                else:
                    damage1 *= (1 + critical / 10)
            if (4 <= c <= 6):
                zf(f"糟糕！敌人这次的攻击会更加猛烈：增加至 {100 + 10 * c}% 。", "darkred")
                damage2 *= (1 + c / 10)
            if (critical > 6) or (critical < 4):
                zf(f"这一次你打偏了，打到了敌人旁边 {abs(5 - critical)} 米处 。", "blue")
            if (c > 6) or (c < 4):
                zf(f"这一次敌人打偏了，打到了你旁边 {abs(5 - c)} 米处 。", "darkgreen")

            check = (jc * 2.657) - enemydef # 敌人 JC - 敌人防御。
            ch = (j * 2.657) - defense # 角色 JC - 角色防御。

            if check <= 0:
                damage1 = 0
                zf("这次攻击没有造成任何伤害。", "red")
            else:
                damage1 *= (check / 10) * 1.1
                zf(f"你造成了 {max(damage1, 0):.3f} HP 伤害。", "yellow")
                hp -= damage1

            if ch <= 0:
                damage2 = 0
                zf("你没有受到任何伤害。", "cyan")
            else:
                damage2 *= (ch / 10) * 1.1
                zf(f"你受到了 {max(damage2, 0):.3f} HP 伤害。", "yellow")
                z_hp -= damage2

            if hp <= 0:
                zf("敌人死亡。", "cyan")
            elif z_hp <= 0:
                zf("你死了。", "darkred")
            else:
                jdt(hp, t_hp, "dr")
                jdt(z_hp, zt_hp, "你的")
                print()
        else:
            raise ValueError

    except KeyboardInterrupt:
        zf("此次运行被键盘中断。跳过本次攻击。", "red")
        print()
    except ValueError:
        zf("无效输入。跳过本次攻击。", "red")
        print()
    except Exception as e:
        zf(f"发生错误： {e} 。跳过本次攻击。", "red")
        print()

count = 0

match ans: # 角色选择。
    case 1: # Feng_Noti。
        while (hp > 0) and (z_hp > 0):
            count += 1
            print(f"第 {count} 回合。")
            print()
            match ml: # ML 选择。
                case 0:
                    gongji(3, 0.2, 14)
                case 1:
                    gongji(4, 0.21, 14)
                case 2:
                    gongji(5, 0.24, 13)
                case 3:
                    gongji(7, 0.27, 12)
                case 4:
                    gongji(7, 0.3, 12)
                case 5:
                    gongji(8, 0.33, 11)
                case 6:
                    gongji(7, 0.37, 11)
                case 7:
                    gongji(8, 0.4, 10)
                case 8:
                    gongji(9, 0.4, 9)
                case 9:
                    gongji(10, 0.42, 9)
                case 10:
                    gongji(10, 0.43, 8)
                case 11:
                    gongji(11, 0.45, 8)
                case 12:
                    gongji(13, 0.5, 8)
                case 13:
                    gongji(15, 0.5, 8)
                case 14:
                    gongji(18, 0.55, 8)
                case 15:
                    gongji(18, 0.55, 8)
    case 2: # With_Kout。
        while (hp > 0) and (z_hp > 0):
            count += 1
            print(f"第 {count} 回合。")
            print()
            match ml: # ML 选择。
                case 0:
                    gongji(2, 0.15, 13)
                case 1:
                    gongji(2, 0.15, 12)
                case 2:
                    gongji(3, 0.16, 12)
                case 3:
                    gongji(5, 0.19, 11)
                case 4:
                    gongji(5, 0.2, 10)
                case 5:
                    gongji(5, 0.22, 10)
                case 6:
                    gongji(5, 0.24, 10)
                case 7:
                    gongji(6, 0.25, 9)
                case 8:
                    gongji(7, 0.25, 9)
                case 9:
                    gongji(7, 0.27, 8)
                case 10:
                    gongji(7, 0.28, 7)
                case 11:
                    gongji(8, 0.28, 7)
                case 12:
                    gongji(9, 0.3, 7)
                case 13:
                    gongji(11, 0.3, 7)
                case 14:
                    gongji(11, 0.3, 6)
                case 15:
                    gongji(11, 0.3, 6)
    case 3: # Tsian_Ca。
        while (hp > 0) and (z_hp > 0):
            count += 1
            print(f"第 {count} 回合。")
            print()
            match ml: # ML 选择。
                case 0:
                    gongji(5, 0.5, 16)
                case 1:
                    gongji(7, 0.52, 15)
                case 2:
                    gongji(7, 0.53, 14)
                case 3:
                    gongji(8, 0.54, 13)
                case 4:
                    gongji(8, 0.55, 13)
                case 5:
                    gongji(9, 0.58, 12)
                case 6:
                    gongji(9, 0.6, 12)
                case 7:
                    gongji(9, 0.6, 12)
                case 8:
                    gongji(11, 0.62, 10)
                case 9:
                    gongji(13, 0.65, 10)
                case 10:
                    gongji(14, 0.65, 10)
                case 11:
                    gongji(15, 0.65, 10)
                case 12:
                    gongji(17, 0.65, 10)
                case 13:
                    gongji(17, 0.65, 10)
                case 14:
                    gongji(18, 0.67, 10)
                case 15:
                    gongji(23, 0.7, 10)
    case 4: # Zyxa。
        while (hp > 0) and (z_hp > 0):
            count += 1
            print(f"第 {count} 回合。")
            print()
            match ml: # ML 选择。
                case 0:
                    gongji(4, 0.26, 15)
                case 1:
                    gongji(3, 0.27, 15)
                case 2:
                    gongji(5, 0.27, 13)
                case 3:
                    gongji(6, 0.3, 12)
                case 4:
                    gongji(5, 0.27, 12)
                case 5:
                    gongji(7, 0.33, 11)
                case 6:
                    gongji(5, 0.27, 11)
                case 7:
                    gongji(8, 0.4, 11)
                case 8:
                    gongji(9, 0.4, 9)
                case 9:
                    gongji(10, 0.4, 9)
                case 10:
                    gongji(10, 0.4, 9)
                case 11:
                    gongji(11, 0.4, 9)
                case 12:
                    gongji(12, 0.42, 9)
                case 13:
                    gongji(13, 0.44, 9)
                case 14:
                    gongji(16, 0.5, 9)
                case 15:
                    gongji(13, 0.4, 9)
    case 5: # Modificationer。
        while (hp > 0):
            count += 1
            print(f"第 {count} 回合。")
            print()
            gongji(999, 0.99, 4)
