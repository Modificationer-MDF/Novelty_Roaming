# -*- coding: utf-8 -*-
# mshy, cc by-nc-sa 4.0, 2026.

"""
amount = 6 (if)
amount % 2 == 0
|
v

st = 3

nt   ofs    i % 2
4    1        1 
3    0        0
5    2        1
2    -1       0
6    3        1
1    -2       0
"""

"""
amount = 5 (else)
amount % 2 == 1
|
v

st = 3

nt   ofs    i % 2
3    0        1
4    1        0
2    -1       1
5    2        0
1    -2       1
"""

def ljs(amount):
    res = []
    if amount % 2 == 0:
        st = amount // 2 # 起始值。
        ofs1 = 0 # 偏移值 1。
        ofs2 = 1 # 偏移值 2。
        for i in range(amount):
            if not (i % 2):
                ofs1 += 1
                nt = st + ofs1
                res.append(nt)
            else:
                ofs2 -= 1
                nt = st + ofs2
                res.append(nt)

    else:
        st = (amount + 1) // 2
        ofs1 = 1 # 偏移值 1。
        ofs2 = 0 # 偏移值 2。
        for i in range(amount):
            if not (i % 2):
                ofs1 -= 1
                nt = st + ofs1
                res.append(nt)
            else:
                ofs2 += 1
                nt = st + ofs2
                res.append(nt)

    return res

if __name__ == "__main__":
    opt = int(input("多少？"))
    r = ljs(opt)
    for i in r:
        print(i)
        with open("LJS Res.txt", "a", encoding = "utf-8") as f:
            f.write(str(i) + "\n")