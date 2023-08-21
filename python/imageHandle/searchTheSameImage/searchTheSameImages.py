# -*- coding: utf-8 -*-
# 功能：将imagePaths.txt中所有的图片和目标图片进行比对
# 输出相似的图片。可输入配置不同的阙值，阙值越大，输出的图片与目标图片相似度越小
from PIL import Image
import imagehash
import sys
import os
import tempfile
import shutil
import subprocess

if sys.version_info.major != 2:
    print("您当前的python版本为{}，请替换为python2.x版本".format(sys.version_info.major))
    sys.exit(0)  # 退出并返回状态码 0 表示成功

args = sys.argv

script_name = args[0]
parameters = args[1:]

# 需要比对的目标图片路径
given_image_path = parameters[0]
similarity_threshold = 0
color_similarity_threshold = 0

# 如果用户配置了阙值，则根据输入重置
if len(parameters) == 2:
    similarity_threshold = float(parameters[1])

print("🚩 开始比对图片内容，稍等一下...\n")

# 读取收集好的所有图片路径
with open('imagePaths.txt', 'r') as file:
    image_paths = file.readlines()

image_paths_array = [path.strip() for path in image_paths]

# 目标图片的hash
target_image = Image.open(given_image_path)
given_hash = imagehash.phash(target_image)
color_given_hash = imagehash.colorhash(target_image)

# 将所有图片与目标图片进行Hash值比较，并根据设置的阙值判断是否输出到结果集中
similarities = []
for path in image_paths_array:
    try:
        image = Image.open(path)
        image_hash = imagehash.phash(image)
        color_image_hash = imagehash.colorhash(image)
        similarity = given_hash - image_hash
        color_similarity = color_given_hash - color_image_hash
        if similarity <= similarity_threshold and color_similarity <= color_similarity_threshold:
            similarities.append(path)
    except Exception as e:
        print("❗️ 部分图片解析失败 {}: {} error\n".format(path, e))

if len(similarities) != 0:
    print('✅ 成功啦！以下是相似的图片路径集合')
    print(similarities)
    user_choice = raw_input("\n是否生成临时目录来查看这些图片？(y/n): ")
    # 根据用户的选择继续执行后续代码
    if user_choice.lower() == "y":
        # 创建一个临时目录
        temp_dir = tempfile.mkdtemp()
        # 遍历图片路径列表，复制到目标目录
        for i, image_path in enumerate(similarities):
            # 提取图片文件名
            image_filename = os.path.basename(image_path)
            
            # 构建目标路径
            destination_path = os.path.join(temp_dir, "{}-{}".format(i, image_filename))
            
            # 复制图片到临时目录
            shutil.copy(image_path, destination_path)
            
        print("\n📁 已复制到python的临时目录：{} ，系统将自动对临时文件进行清理，无需自行删除".format(temp_dir))
        # 使用文件浏览器打开临时目录
        subprocess.call(["open", temp_dir])
else:
    print("❓ 并没有找到相似的图片，设置大一点的阙值重新试试呢？(0-19)")
    sys.exit(0)

print("👋 本次查找结束！（设置不同的阙值结果会有所不同。未达到预期时，可重新设置阙值试下）")
