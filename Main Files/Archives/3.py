import random as rd

la = "abcdefghijklmnopqrstuvwxyz"
LA = la + la.upper()
res = []

for i in range(1425):
    if 10 <= rd.randint(1, 100) <= 15:
        res.append(" ")
    else:
        res.append(rd.choice(LA))

print("".join(res))