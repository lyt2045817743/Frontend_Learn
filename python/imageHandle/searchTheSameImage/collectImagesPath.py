# -*- coding: utf-8 -*-
# 功能：收集一个/多个目标文件夹的所有图片路径，并统一输出到txt文件
import os
import sys

args = sys.argv
script_name = args[0]
parameters = args[1:]

# 支持多个目标文件夹
directory_pathArr = parameters

image_extensions = ['.jpg', '.jpeg', '.png', '.gif']

# 输出所有图片路径的文件名称
output_filename = 'imagePaths.txt'

print("🚩 开始收集图片路径，稍等一下...")

# 收集目标文件夹图片路径
image_paths = []
for directory_path in directory_pathArr:
    for root, _, files in os.walk(directory_path):
        for file in files:
            _, ext = os.path.splitext(file)
            if ext.lower() in image_extensions:
                image_paths.append(os.path.join(root, file))

# 写入到txt文件
with open(output_filename, 'w') as output_file:
    for path in image_paths:
        output_file.write(path + '\n')

print("📁 收集图片路径的文件已准备好: {}".format(output_filename))
