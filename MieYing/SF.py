import os
import sys

def calc():
    r0 = int(input("0 分票："))
    r1 = int(input("1 分票："))
    r2 = int(input("2 分票："))
    r3 = int(input("3 分票："))
    r4 = int(input("4 分票："))
    r5 = int(input("5 分票："))
    r6 = int(input("6 分票："))
    r7 = int(input("7 分票："))
    r8 = int(input("8 分票："))
    r9 = int(input("9 分票："))
    r10 = int(input("10 分票："))
    c1 = int(input("裁判 1："))
    c2 = int(input("裁判 2："))
    q1 = int(input("裁判权："))
    q2 = int(input("观众权："))

    total = r0 + r1 + r2 + r3 + r4 + r5 + r6 + r7 + r8 + r9 + r10
    os.system("cls")

    res = ((c1 + c2) * q1 + (r1 + r2 * 2 + r3 * 3 + r4 * 4 + r5 * 5 + r6 * 6 + r7 * 7 + r8 * 8 + r9 * 9 + r10 * 10) * q2) / (total * q2 + 2 * q1)
    print(fr"""> > > 投票结果如下，共 {total} 票。
> > > - 0 分：{r0} 票；
> > > - 1 分：{r1} 票；
> > > - 2 分：{r2} 票；
> > > - 3 分：{r3} 票；
> > > - 4 分：{r4} 票；
> > > - 5 分：{r5} 票；
> > > - 6 分：{r6} 票；
> > > - 7 分：{r7} 票；
> > > - 8 分：{r8} 票；
> > > - 9 分：{r9} 票；
> > > - 10 分：{r10} 票。
> > >
> > > **综合结果：{res:.3f} 分。**
> >""")

if __name__ == "__main__":
    calc()