# -*- coding: utf-8 -*-
# 功能：将本地项目中res、app/views目录的所有图片 VS FDS的所有图片 与目标图片进行内容比对
# 参数说明：
  # positional arguments: imagePath 目标图片路径
  # option1: --threshold 相似度的阙值，阙值越低，相似度越高（0~19）
  # option2:   --source {local,fds,all}。默认all
  # option3: --dirLocalPaths 本地某些项目目录的路径。例['res', 'app/views/store', 'app/views/pos', ...]。默认['res', 'app/views']
# 输出：与目标图片相似的图片组。
# 例：npm run searchTheSameImages ~/Desktop/example.png
import sys
import argparse
import ast
import searchTheSameImages as search_the_same
import searchTheRemoteSameImages as search_in_fds

local_default_dir = "['res', 'app/views']"

# 版本兼容问题处理
major_version, minor_version = sys.version_info[:2]
inputFun = raw_input if major_version == 2 else input

if __name__ == "__main__":
    if major_version == 2:
        print("Python2已终止支持，请安装Python3+的版本：https://www.python.org/downloads/")
        sys.exit(0)

    parser = argparse.ArgumentParser(description="搜索项目工程&远程FDS中与目标图片相似的图片")
    parser.add_argument("imagePath", type=str, help="目标图片路径")
    parser.add_argument("--threshold", type=str, default="0", help="相似度的阙值，阙值越低，相似度越高（0~19）")
    parser.add_argument("--source", type=str, choices=["local", "fds", "all"], default="all", help="local: 仅项目工程; fds: 仅fds; all: 项目工程和fds")
    parser.add_argument("--dirLocalPaths", type=str, default=local_default_dir, help="本地某些项目目录的路径。例['res', 'app/views/store', 'app/views/pos', ...]。默认['res', 'app/views']")
    # parser.add_argument("--dirFDSPaths", type=str, default="['{}']".format(search_in_fds.local_folder), help="FDS目录路径数组。例['Icons', 'images', ...]。默认根路径")
    args = parser.parse_args()
    dir_local_paths = ast.literal_eval(args.dirLocalPaths)
    # dir_fds_paths = ast.literal_eval(args.dirFDSPaths)
    dir_fds_paths = [search_in_fds.local_folder]
    similarity_threshold = int(args.threshold)
    source = args.source

    if args.imagePath:
        local_similarities = []
        fds_result = []
        fds_similarities = []

        print("🚩 第三方库检查/安装...\n")
        search_the_same.install_image_lib()

        if source in ["all", "fds"]:
          search_in_fds.install_fds_lib()
          search_in_fds.init()
          print("\n🚩 FDS图片内容比对中...\n")
          fds_similarities = search_the_same.collect_images_and_search(args.imagePath, dir_fds_paths, similarity_threshold)
          fds_result = search_in_fds.format_fds_result(fds_similarities)

        # similarity_threshold = search_the_same.input_similarity_threshold()
        if source in ["all", "local"]:
            print("\n🚩 本地图片内容比对中...\n")
            local_similarities = search_the_same.collect_images_and_search(args.imagePath, dir_local_paths, similarity_threshold)

        local_config = [{
          "same_images_local_path": local_similarities,
          "output_result": local_similarities,
          "source_name": "本地"
        }]

        fds_config = [{
          "same_images_local_path": fds_similarities,
          "output_result": fds_result,
          "source_name": "FDS"
        }]

        config_map = {
          "local": local_config,
          "fds": fds_config,
          "all": local_config + fds_config
        }
        
        search_the_same.result_handle(config_map[args.source])
    else:
        print("\n❗️请通过命令行提供参数。")