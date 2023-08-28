# -*- coding: utf-8 -*-
# 功能：将目标图片和一个/多个目录的图片进行内容比对。
# 脚本执行过程中，根据提示设置相似性阙值，阙值越小，输出的图片与目标图片越相似
# 输出：与目标图片相似的图片组。
# 例：python searchTheSameImages.py ~/Desktop/example.png /dir1 /dir2 （dir数量 > 0）

import sys
import os
import tempfile
import shutil
import subprocess
import importlib

# 获取当前 Python 版本信息
major_version, minor_version = sys.version_info[:2]

inputFun = raw_input if major_version == 2 else input
errorName = ImportError if major_version == 2 else ModuleNotFoundError

def install_package(package_name):
    subprocess.check_call(["python{}.{}".format(major_version, minor_version), "-m", "pip", "install", package_name])

def check_and_install(lib_name, package_name):
    try:
        importlib.import_module(lib_name)
        print("{} 已安装".format(package_name))
    except errorName:
        subprocess.check_call(["pip", "install", "--upgrade", "pip", "setuptools"])
        print("\n{} 未安装，开始安装...".format(package_name))
        install_package(package_name)
        print("{} 安装完成\n".format(package_name))

# 检查并安装第三方库
check_and_install("PIL", "Pillow")
check_and_install("imagehash", "imagehash")

from PIL import Image
import imagehash


args = sys.argv

if len(args) < 3:
    print("参数错误，例：python searchTheSameImages.py ~/Desktop/example.png /dir1 /dir2 （其中dir数量 > 0）")
    sys.exit(0)

script_name = args[0]
given_image_path = args[1]
directory_pathArr = args[1:]
similarity_threshold = 0
color_similarity_threshold = 0

# 用户配置的阙值
try:
  user_input = inputFun("\n请输入相似度的阙值，阙值越低，相似度越高（0~19）：")
  similarity_threshold = int(user_input)
except ValueError:
  print('传参错误：请输入整数')
  sys.exit(0)

image_extensions = ['.jpg', '.jpeg', '.png', '.gif']

# 收集目标文件夹图片路径
image_paths = []
for directory_path in directory_pathArr:
    for root, _, files in os.walk(directory_path):
        for file in files:
            _, ext = os.path.splitext(file)
            if ext.lower() in image_extensions:
                image_paths.append(os.path.join(root, file))

print("\n🚩 比对图片内容中...\n")

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

# 输出比对结果
if len(similarities) != 0:
    print('✅ 成功啦！以下是相似的图片路径集合')
    print(similarities)
    user_choice = inputFun("\n是否生成临时目录来查看这些图片？(y/n): ")
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
            
        print("\n📁 已复制到临时目录：{} ，系统重启时将自动对其进行清理，无需自行删除".format(temp_dir))
        # 使用文件浏览器打开临时目录
        subprocess.call(["open", temp_dir])
else:
    print("❓ 并没有找到相似的图片，设置大一点的阙值重新试试呢？(0-19)")
    sys.exit(0)

print("\n👋 本次查找结束！（设置不同的阙值结果会有所不同。未达到预期时，可重新设置阙值试下）")
