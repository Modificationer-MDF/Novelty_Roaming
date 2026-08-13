# -*- coding: utf-8 -*-
import os
import sys
import re

os.system("title 字符转换")
# 字符转换至数字。
nums = {
    "`": "(1,1)",
    "1": "(1,2)",
    "2": "(1,3)",
    "3": "(1,4)",
    "4": "(1,5)",
    "5": "(1,6)",
    "6": "(1,7)",
    "7": "(1,8)",
    "8": "(1,9)",
    "9": "(1,10)",
    "0": "(1,11)",
    "-": "(1,12)",
    "=": "(1,13)",
    "~": "(2,1)",
    "!": "(2,2)",
    "@": "(2,3)",
    "#": "(2,4)",
    "$": "(2,5)",
    "%": "(2,6)",
    "^": "(2,7)",
    "&": "(2,8)",
    "*": "(2,9)",
    "(": "(2,10)",
    ")": "(2,11)",
    "_": "(2,12)",
    "+": "(2,13)",
    "q": "(3,1)",
    "w": "(3,2)",
    "e": "(3,3)",
}

# 数字转换至字符
chars = {v: k for k, v in nums.items()}  # 反转字典

# 输入字符。
print("欢迎使用字符转换器。")
input()  # 在本程序中， input() 用于暂停程序运行，等待用户输入。
print("请注意！在本程序中，如要退出或返回上一阶段，请连续两次输入空字符串。")
input()

def tc(prompt, exit_message):
    if input(prompt) == "":
        if input(exit_message) == "":
            sys.exit(0)
        else:
            print()

while True:  # 选择功能。
    print("""请输入数字以继续。
    1 - 打开拼音字母文档；
    2 - 打开字符文档；
    3 - 转换；
    4 - 打开转换结果文档；
    5 - 查看源代码。""")
    ans = input(r"\/ ")
    path = os.getcwd()
    
    if ans == "1":
        fi = path + r"\拼音字符.txt"
        os.startfile(fi)
        tc("", "是否退出？")
    elif ans == "2":
        fl = path + r"\字符.txt"
        os.startfile(fl)
        tc("", "是否退出？")
    elif ans == "3":
        print("""请选择转换类型。
    6 - 字符 ~ 数字；
    7 - 数字 ~ 字符。""")
        choose = input("\/ ")
        if choose == "6":
            while True:
                print("请输入需要转换的字符：")
                sr = input()
                if sr == "":
                    if input("是否回到上一阶段？") == "":
                        break
                tn = [nums.get(i, i) for i in sr]
                with open("./结果.txt", "a") as f:
                    f.write("".join(tn) + "\n")
                print("".join(tn))
                if input() == "":
                    break
        elif choose == "7":
            inp = input("请输入需要转换的数字（格式： '数字' [ 英文单引号 ]）：")
            if inp == "":
                if input("是否回到上一阶段？") == "":
                    break
            tc = []
            inn = re.findall(r"'(\d+)'", inp)  # 匹配以单引号开头、结尾的数字字符
            for i in inn:
                key = f"'*{i}'"  # 构造用单引号包裹的数字键
                if key in chars:  # 查找 chars 字典中用单引号包裹的数字键，若存在，则转换
                    tc.append(chars[key])
                else:
                    tc.append(f"'{i}'")  # 如果无法转换，则保留原有的字符
            with open("./Translated.txt", "a") as f:
                for j in tc:
                    print(j, end="")
                    f.write(j)
                f.write("\n")
            if input() == "":
                if input("是否回到上一阶段？") == "":
                    break

        elif choose == "":
            tc("是否回到上一阶段？", "是否退出？")
        else:
            print("输入有误。")
    elif ans == "4":
        fe = path + r"\结果.txt"
        os.startfile(fe)
        tc("", "是否退出？")
    elif ans == "5":
        pt = path + r"\Source Code.py"
        os.system(f"start Notepad.exe {pt}")
        tc("", "是否退出？")
    elif ans == "":
        tc("是否退出？", "是否退出？")
    else:
        print("输入无效。")
