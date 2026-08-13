# -*- coding: utf-8 -*-
import os
from datetime import datetime
import pytz

fp = input("请输入文件路径：")
a1 = input("（年）")
a2 = input("（月）")
a3 = input("（日）")
a4 = input("（时）")
a5 = input("（分）")
a6 = input("（秒）")

try:
    a1, a2, a3, a4, a5, a6 = map(int, (a1, a2, a3, a4, a5, a6))
    tz = pytz.timezone('UTC')  # 选择时区，这里使用 UTC
    dt = datetime(a1, a2, a3, a4, a5, a6, tzinfo=tz)
    timestamp = dt.timestamp()

    os.utime(fp, (timestamp, timestamp))
    print("文件修改日期更新成功。")
except Exception as e:
    print(f"发生错误：{e}")