import os
import math

ls_flag = False
jid = []
city = []
year = []
month = []
phyage = []
ident = []
abbr = []
factor = []

with open("../story_markdowns/JID.md") as f:
    jid = f.readlines()

for i in range(len(jid)):
    jid[i] = jid[i].strip().replace("\\", "")
    city.append(jid[i][0:2])
    year.append(int(jid[i][2:6]))
    month.append(int(jid[i][6:8]))
    phyage.append(int(jid[i][8:10]))
    ident.append(jid[i][10:14])
    abbr.append(jid[i][14:16])

if os.path.exists("factor.txt"):
    ls_flag = True 

if ls_flag:
    with open("factor.txt") as f:
        factor = f.readlines()
    
    for i in range(len(factor)):
        factor[i] = float(factor[i].strip().split("：")[1])
else:
    for k in range(len(jid)):
        ls = input(f"#{k}/{len(jid) - 1}：{abbr[k]} 的因数？")
        factor.append(float(ls) if ls.strip() != "" else 1)

    with open("factor.txt", "w") as f:
        for n in range(len(jid)):
            f.write(f"{abbr[n]}：{factor[n]}\n")

def ls_fn():
    while True:
        today = input("今天日期？（YYYYMMDD，不要加任何分隔符）")
        ls_y = int(today[0:4])
        ls_m = int(today[4:6])
        ls_d = int(today[6:8])
        if ls_m == 0 or ls_m > 60:
            print("一年有 60 个月！请重新输入！")
        elif ls_d == 0 or ls_d > 42:
            print("一个月有 42 天！请重新输入！")
        else:
            break
    return [ls_y * 2520, ls_m * 42, ls_d]

os.system("color 2")

while True:
    try:
        ty, tm, td = ls_fn()
        break
    except ValueError:
        print("回车按太快了！重新来一次。")
        os.system("timeout /t 3")

for j in range(len(jid)):
    year[j] *= 2520
    month[j] *= 42
    phyage[j] += (ty + tm + td - year[j] - month[j])
    phyage[j] /= 2520

del year
del month

psyage = []
expage = []

for l in range(len(jid)):
    psyage.append(phyage[l] * factor[l])
    expage.append(phyage[l] * 2520 / 365.25)

os.system("cls")

for m in range(len(jid)):
    print(f"| {abbr[m]}（{city[m]}/{ident[m]}） | {math.floor(phyage[m])}/{math.floor(psyage[m])}（{factor[m]}）/{expage[m]:.1f} |")