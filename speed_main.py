import re
import csv
import json
import urllib.request
import time
from pypinyin import lazy_pinyin

def contain_chinese(string):
    pattern = re.compile("[\u4e00-\u9fa5]+")
    match = pattern.search(string)
    return match is not None

def get_pingyin(string):
    return ''.join(lazy_pinyin(string)).lower()

def replace_all(string):
    replacements = {".net": "", ".com": "", ", Inc.": "", "China Mobile ": "", "Network": "", "Networks": "", "Network": "", " Telecom": "", "Hong Kong": "", " ": ""}
    for old, new in replacements.items():
        string = string.replace(old, new)
    return string

# IP地址归属地查询API的URL
url_template = 'http://ip-api.com/json/{ip}?lang=zh-CN'

# 三个运营商的关键词
unicom_keywords = ['China Unicom', 'CHINA169', 'CNCNET', 'Provincial Net of CU', 'UNICOM']
mobile_keywords = ['China Mobile', 'Provincial Net of CM', 'MOBILE']
telecom_keywords = ['China Telecom', 'China Tietong', 'Chinanet', 'TieTong', 'Provincial Net of CT', 'TELECOM']

# 打开CSV文件
with open('CN.csv', 'r', encoding='utf-8') as csvfile:
    reader = csv.reader(csvfile)
    # 跳过第一行，因为是标题
    next(reader)
    # 创建三个CSV文件，用于存储三个运营商的行
    unicom_file = open('CN_Unicom.csv', 'w', encoding='utf-8', newline='')
    mobile_file = open('CN_Mobile.csv', 'w', encoding='utf-8', newline='')
    telecom_file = open('CN_Telecom.csv', 'w', encoding='utf-8', newline='')
    unicom_writer = csv.writer(unicom_file)
    mobile_writer = csv.writer(mobile_file)
    telecom_writer = csv.writer(telecom_file)
    # 依次读取每一行，并查询所属运营商
    for row in reader:
        ip = row[4] # IP地址所在的列为第5列，下标为4
        name = row[7]
        url = url_template.format(ip=ip)
        with urllib.request.urlopen(url) as response:
            data = response.read().decode('utf-8')
            data = json.loads(data)
            if data['status'] == 'success':
                city = data['city']
        time.sleep(1)
        if contain_chinese(name) == True:
            row[3] = name.replace("电信", "").replace("移动", "").replace("联通", "")
        else:
            if contain_chinese(row[3]) == True:
                pass
            else:
                city = city.replace("市", "")
                city_pingyin = get_pingyin(city)
                if city_pingyin == row[3].replace("'","").replace(" ","").lower():
                    row[3] = city
            if "5G" in name and "5G" not in row[3]:
                row[3] += "5G"
        if data['status'] == 'success':
            isp = data['isp']
            # 判断所属运营商
            if any(keyword in isp for keyword in unicom_keywords):
                if row[1] == "CN":
#                 print(row)
                    unicom_writer.writerow(row)
            elif any(keyword in isp for keyword in mobile_keywords):
                if row[1] == "CN":
                    mobile_writer.writerow(row)
            elif any(keyword in isp for keyword in telecom_keywords):
                if row[1] == "CN":
                    telecom_writer.writerow(row)
            else:
                print(isp)
    # 关闭文件
    unicom_file.close()
    mobile_file.close()
    telecom_file.close()

# HK文件处理
with open('HK.csv', 'r') as file:
    reader = csv.reader(file)
    data = [row for row in reader]

for row in data:
    if row[3] == "city":
        continue
    if row[3] != 'Hong Kong':
        row[3] = "香港HongKong"
    if len(replace_all(row[7])) <= 11:
        row[3] = "香港" + replace_all(row[7])
    elif row[3] == 'Hong Kong':
        row[3] = "香港HongKong"

with open('HK.csv', 'w', newline='') as file:
    writer = csv.writer(file)
    writer.writerows(data)

# ls_sg_hk_jp.csv 文件处理
with open('ls_sg_hk_jp.csv', 'r') as file:
    reader = csv.reader(file)
    rows = list(reader)
rows[1][3] = '洛杉矶'
rows[2][3] = '法兰克福'
rows[3][3] = '新加坡'
rows[4][3] = '中国香港'
rows[5][3] = '日本东京'
with open('ls_sg_hk_jp.csv', 'w', newline='') as file:
    writer = csv.writer(file)
    writer.writerows(rows)
