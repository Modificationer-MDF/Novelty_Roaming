import random as rd
import os

if __name__ == "__main__":
    os.system("cls")
    for i in range(300):
        ls = rd.uniform(217727999, 217728001)
        print(fr"| {i} | {ls:.3f} |")