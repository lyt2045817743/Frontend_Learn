# -*- coding: utf-8 -*-
# 功能：将目标图片和一个/多个本地目录的图片进行内容比对。（本脚本可以单独执行）
# 参数说明：
  # positional arguments1: imagePath 目标图片路径
  # positional arguments2: dirPaths 本地目录路径数组。例['dir1', 'dir2', ...]
# 脚本执行过程中，根据提示设置相似性阙值，阙值越小，输出的图片与目标图片越相似
# 输出：与目标图片相似的图片组。
# 例：python searchTheSameImages.py ~/Desktop/example.png /dir1 /dir2 （dir数量 > 0）
import sys
import os
import utils
import argparse
import ast
import tempfile
import shutil
import subprocess
import json

# 获取当前 Python 版本信息
major_version, minor_version = sys.version_info[:2]
inputFun = raw_input if major_version == 2 else input

image_info_cache_map = {}

def input_similarity_threshold():
    # 用户配置的阙值
    while True:
        try:
            user_input = inputFun("请输入相似度的阙值，阙值越低，相似度越高（0~19）：")
            return int(user_input)
        except ValueError:
            print('传参错误：请输入整数')

def install_image_lib():
    global Image
    global imagehash
    global tqdm
    # 检查并安装第三方库
    utils.check_and_install("PIL", "Pillow")
    utils.check_and_install("imagehash", "imagehash")
    utils.check_and_install("tqdm", "tqdm")
    from PIL import Image
    import imagehash
    from tqdm import tqdm

def collect_images_and_search(given_image_path, directory_pathArr, similarity_threshold):

    color_similarity_threshold = 0

    image_extensions = ['.jpg', '.jpeg', '.png', '.gif']

    # 收集本地目标文件夹图片路径
    image_paths = []
    for directory_path in directory_pathArr:
        for root, _, files in os.walk(directory_path):
            for file in files:
                _, ext = os.path.splitext(file)
                if ext.lower() in image_extensions:
                    image_paths.append(os.path.join(root, file))

    image_paths_array = [path.strip() for path in image_paths]

    similarities = search_the_same_images(given_image_path, image_paths_array, similarity_threshold)
    result = filter_by_color_similarity(given_image_path, similarities, color_similarity_threshold)

    return result

def init_image_info_cache_map():
    global image_info_cache_map
    # 对图片更新时间和hash值进行缓存
    if os.path.exists(cache_file_path):
        with open(cache_file_path, 'r') as json_file:
            image_info_cache_map = json.load(json_file)

def get_image_hash_from_cache(path):
    global image_info_cache_map
    latest_update_time = utils.get_image_update_timestamp(path)
    if path not in image_info_cache_map or image_info_cache_map[path]["update_time"] != latest_update_time:
        image = Image.open(path)
        image_hash = imagehash.phash(image)
        image_info_cache_map[path] = {
            "phash": str(image_hash),
            "update_time": latest_update_time
        }
    return image_info_cache_map[path]

def update_image_info_cache_map():
    with open(cache_file_path, "w") as json_file:
        json.dump(image_info_cache_map, json_file, indent=4)

# 将所有图片与目标图片进行Hash值比较，并根据设置的阙值判断是否输出到结果集中
def search_the_same_images(given_image_path, image_paths_array, similarity_threshold):
    global Image
    global tqdm
    global imagehash
    # 目标图片的hash
    target_image = Image.open(given_image_path)
    given_hash = imagehash.phash(target_image)

    # 将所有图片与目标图片进行Hash值比较，并根据设置的阙值判断是否输出到结果集中
    similarities = []
    init_image_info_cache_map() # 对图片的hash值进行缓存
    for path in tqdm(image_paths_array, desc="Processing", unit="iteration", ncols=100):
        try:
            image_all_hash = get_image_hash_from_cache(path)
            image_hash = imagehash.hex_to_hash(image_all_hash["phash"])

            similarity = given_hash - image_hash
            if similarity <= similarity_threshold:
                similarities.append(path)
        except Exception as e:
            print("\n❗️ 部分图片解析失败 {}: {} error\n".format(path, e))
    update_image_info_cache_map()
    return similarities

def filter_by_color_similarity(given_image_path, image_paths_array, color_similarity_threshold):
    global Image
    global imagehash
    # 目标图片的hash
    target_image = Image.open(given_image_path)
    color_given_hash = imagehash.colorhash(target_image)
    result = []
    for path in image_paths_array:
        try:
            image = Image.open(path)
            color_image_hash = imagehash.colorhash(image)
            color_similarity = color_given_hash - color_image_hash
            if color_similarity <= color_similarity_threshold:
                result.append(path)
        except Exception as e:
            print("\n❗️ 部分图片解析失败 {}: {} error\n".format(path, e))
    return result

# 复制图片到指定目录
def copy_images(src_paths, dest_folder):
    if not os.path.exists(dest_folder):
        os.makedirs(dest_folder)
    for idx, src_path in enumerate(src_paths):
        filename = os.path.basename(src_path)
        dest_path = os.path.join(dest_folder,  "{}-{}".format(idx, filename))
        shutil.copy(src_path, dest_path)

# 分目录复制到临时文件夹并打开
def copy_images_into_tempfile(config_arr):
    # 创建临时目录
    temp_dir = tempfile.mkdtemp()
    if len(config_arr) == 1:
        src_paths = config_arr[0]["src_paths"]
        copy_images(src_paths, temp_dir)
    else:
        for item in config_arr:
            src_paths = item["src_paths"]
            source_name = item["source_name"]
            if len(src_paths) != 0:
                folder = os.path.join(temp_dir, source_name)
                copy_images(src_paths, folder)
    print("\n📁 已复制到临时目录：{} ，系统重启时将自动对其进行清理，无需自行删除".format(temp_dir))
    # 使用文件浏览器打开临时目录
    subprocess.call(["open", temp_dir])

# 相似图片结果展示
def result_handle(config_arr):
    print("\n✅ 搜索完成啦！")
    is_empty = True

    tempfile_config_list = []
    for item in config_arr:
        output_similarities = item["output_result"]
        source_name = item["source_name"]
        # 输出比对结果
        if len(output_similarities) != 0:
            print('\n以下是{}相似的图片路径集合'.format(source_name))
            print(output_similarities)
            is_empty = False
        # 临时文件配置
        tempfile_config_item = {
            'src_paths': item["same_images_local_path"],
            "source_name": source_name
        }
        tempfile_config_list.append(tempfile_config_item)

    if is_empty:
        print("❓ 并没有找到相似的图片，设置大一点的阙值重新试试呢？(0-19)")
        sys.exit(0)

    user_choice = inputFun("\n是否生成临时目录来查看这些图片？(y/n): ")
    # 根据用户的选择继续执行后续代码
    if user_choice.lower() == "y":
        copy_images_into_tempfile(tempfile_config_list)

    print("\n👋 本次查找结束！（设置不同的阙值结果会有所不同。未达到预期时，可重新设置阙值试下）")


if __name__ == "__main__":
    cache_file_path = './image_info_cache.json'
    parser = argparse.ArgumentParser(description="搜索本地某些路径下与目标图片相似的图片")
    parser.add_argument("imagePath", type=str, help="目标图片路径")
    parser.add_argument("dirPaths", type=str, help="本地目录路径数组。例['dir1', 'dir2', ...]")
    args = parser.parse_args()
    dir_paths = ast.literal_eval(args.dirPaths)

    if args.imagePath and args.dirPaths:
        similarity_threshold = input_similarity_threshold()
        print("\n🚩 第三方库检查/安装中...\n")
        install_image_lib()
        print("\n🚩 本地图片内容比对中...\n")
        local_similarities = collect_images_and_search(args.imagePath, dir_paths, similarity_threshold)
        result_handle([{
            "same_images_local_path": local_similarities,
            "output_result": local_similarities,
            "source_name": "本地"
        }])
    else:
        print("\n❗️请通过命令行提供参数。")