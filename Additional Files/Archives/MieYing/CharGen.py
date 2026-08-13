# Mosha Huyan, under CC BY-NC-SA 4.0, 2026.
import random as rd
import os
import sys
import time

syl = [
    # -i（舌尖）
    "zhi", "chi", "shi", "ri", "zi", "ci", "si",
    # a
    "a", "ba", "pa", "ma", "fa", "da", "ta", "na", "la",
    "ga", "ka", "ha", "zha", "cha", "sha", "za", "ca", "sa",
    # o
    "o", "bo", "po", "mo", "fo",
    # e
    "e", "me", "de", "te", "ne", "le", "ge", "ke", "he",
    "zhe", "che", "she", "re", "ze", "ce", "se",
    # ai
    "ai", "bai", "pai", "mai", "dai", "tai", "nai", "lai",
    "gai", "kai", "hai", "zhai", "chai", "shai", "zai", "cai", "sai",
    # ei
    "ei", "bei", "pei", "mei", "fei", "dei", "nei", "lei",
    "gei", "hei", "zhei", "shei", "zei",
    # ao
    "ao", "bao", "pao", "mao", "dao", "tao", "nao", "lao",
    "gao", "kao", "hao", "zhao", "chao", "shao", "rao",
    "zao", "cao", "sao",
    # ou
    "ou", "pou", "mou", "fou", "dou", "tou", "nou", "lou",
    "gou", "kou", "hou", "zhou", "chou", "shou", "rou",
    "zou", "cou", "sou",
    # i
    "yi", "bi", "pi", "mi", "di", "ti", "ni", "li",
    "ji", "qi", "xi",
    # ia
    "ya", "lia", "jia", "qia", "xia",
    # ie
    "ye", "bie", "pie", "mie", "die", "tie", "nie", "lie",
    "jie", "qie", "xie",
    # iao
    "yao", "biao", "piao", "miao", "diao", "tiao", "niao", "liao",
    "jiao", "qiao", "xiao",
    # iu
    "you", "miu", "diu", "niu", "liu", "jiu", "qiu", "xiu",
    # u
    "wu", "bu", "pu", "mu", "fu", "du", "tu", "nu", "lu",
    "gu", "ku", "hu", "zhu", "chu", "shu", "ru",
    "zu", "cu", "su",
    # ua
    "wa", "gua", "kua", "hua", "zhua", "chua", "shua",
    # uo
    "wo", "duo", "tuo", "nuo", "luo", "guo", "kuo", "huo",
    "zhuo", "chuo", "shuo", "ruo", "zuo", "cuo", "suo",
    # uai
    "wai", "guai", "kuai", "huai", "zhuai", "chuai", "shuai",
    # ui
    "wei", "dui", "tui", "gui", "kui", "hui",
    "zhui", "chui", "shui", "rui", "zui", "cui", "sui",
    # ü
    "yu", "nü", "lü", "ju", "qu", "xu",
    # üe
    "yue", "nüe", "lüe", "jue", "que", "xue"
]

def cls():
    if os.name == "nt":
        os.system("cls")
    else:
        os.system("clear")

def gen(f, l): # f：姓需要多少个音节；l：名需要多少个音节。
    name = ""
    final = ""

    for i in range(f):
        name += rd.choice(syl)
        ls_1 = rd.randint(14, 25)
        if 18 <= ls_1 <= 19:
            name += rd.choice(["p", "t", "k"])
    name += " "
    for j in range(l):
        name += rd.choice(syl)
        ls_2 = rd.randint(14, 25)
        if 18 <= ls_2 <= 19:
            name += rd.choice(["p", "t", "k"])
    
    n = name.split(" ")

    final += n[0].capitalize() + " " + n[1].capitalize()

    return final

def prog(cur, tot, pre="", suf="", blen=40):
    per = cur / tot * 100
    flen = int(blen * per / 100)
    bar = '#' * flen + '-' * (blen - flen)
    
    # \r 回到行首，flush 强制终端刷新。
    sys.stdout.write(f"\r{pre}|{bar}| {cur} / {tot}（{per:.3f}%） {suf}")
    sys.stdout.flush()

    if cur == tot:
        sys.stdout.write("\n")

if __name__ == "__main__":
    amount = int(input("数量？"))
    fam = int(input("姓音节数？"))
    nam = int(input("名音节数？"))

    cls()

    st = time.time()

    ns = []
    
    for i in range(amount):
        ls_n = gen(fam, nam)
        ns.append(ls_n + "\n")
        
        prog(i + 1, amount, "进度：", f"当前生成：“{ls_n.ljust(25)}”")
        
        time.sleep(0.000003)

    with open("generated.txt", "a", encoding="utf-8") as f:  
        f.writelines(ns)

    et = time.time()

    cls()
    print(f"全部完成。耗时 {(et - st):.3f} 秒。")