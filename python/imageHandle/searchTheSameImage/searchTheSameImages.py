# -*- coding: utf-8 -*-
# 功能：将imagePaths.txt中所有的图片和目标图片进行比对
# 输出相似的图片。可输入配置不同的阙值，阙值越大，输出的图片与目标图片相似度越小
from PIL import Image
import imagehash
import sys

args = sys.argv

script_name = args[0]
parameters = args[1:]

# 需要比对的目标图片路径
given_image_path = parameters[0]
similarity_threshold = 0

# 如果用户配置了阙值，则根据输入重置
if len(parameters) == 2:
    similarity_threshold = int(parameters[1])

print("🚩 开始比对图片内容，稍等一下...\n")

# 读取收集好的所有图片路径
with open('imagePaths.txt', 'r') as file:
    image_paths = file.readlines()

image_paths_array = [path.strip() for path in image_paths]

# 目标图片的hash
given_hash = imagehash.phash(Image.open(given_image_path))

# 将所有图片与目标图片进行Hash值比较，并根据设置的阙值判断是否输出到结果集中
similarities = []
for path in image_paths_array:
    try:
        image = Image.open(path)
        image_hash = imagehash.phash(image)
        similarity = given_hash - image_hash
        if similarity <= similarity_threshold:
            similarities.append(path)
    except Exception as e:
        print("\n❗️ 部分图片解析失败 {}: {} error\n".format(path, e))

print('✅ 成功啦！以下是相似的图片路径集合')
print(similarities)
