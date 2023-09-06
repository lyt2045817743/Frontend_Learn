# -*- coding: utf-8 -*-
# 功能：检索项目中的所有重复图片
# 参数说明：
  # option1: --updateFDS  是否更新FDS资源
# 输出：【项目重复图片汇总.xlsx】文件，输出路径可自行设置 output_file_name
# 例：python searchAllDuplicateImages.py --updateFDS
import sys
major_version, minor_version = sys.version_info[:2]
if major_version == 2:
  print("Python2已终止支持，请安装Python3+的版本：https://www.python.org/downloads/")
  sys.exit(0)

import json
import argparse
import subprocess
import searchTheSameImages as search_the_same
import searchTheRemoteSameImages as search_in_fds
import utils

# 该脚本单独运行时：需要根据需要自行配置
image_dirs = ['res', 'app/views', 'scripts/imageHandle/mi_fds_images']
output_file_name = 'scripts/imageHandle/项目重复图片汇总.xlsx'
# image_dirs = ['../../res', '../../app/views', './mi_fds_images']
# output_file_name = './项目重复图片汇总.xlsx'

similarity_threshold = 0
color_similarity_threshold = 0
all_duplicate_images_arr = []

def install_xlsx_lib():
  global openpyxl
  global Alignment
  utils.check_and_install("openpyxl", "openpyxl")
  import openpyxl
  from openpyxl.styles import Alignment

if __name__ == "__main__":
  parser = argparse.ArgumentParser(description='检索项目中的所有重复图片')
  parser.add_argument('--updateFDS', action='store_true', help='是否更新FDS资源')
  args = parser.parse_args()

  # search_in_fds.local_folder = './mi_fds_images'
  # search_in_fds.output_file_path = search_in_fds.local_folder + search_in_fds.map_file
  # search_the_same.temp_dir = '../cache'
  # search_the_same.cache_file_path = search_the_same.temp_dir + search_the_same.cache_file_end 

  print("🚩 第三方库检查/安装...\n")
  search_the_same.install_image_lib()
  install_xlsx_lib()

  if args.updateFDS:
    search_in_fds.install_fds_lib()
    search_in_fds.init()

  import imagehash
  from tqdm import tqdm

  images_path = search_the_same.collect_images_path(image_dirs)

  search_the_same.init_image_info_cache_map()
  for path in images_path:
    search_the_same.get_image_hash_from_cache(path)
  search_the_same.update_image_info_cache_map()

  with open(search_the_same.cache_file_path, 'r') as json_file:
    temp_cache_map = json.load(json_file)

  for path in tqdm(images_path, desc="Processing", unit="iteration", ncols=100):
    if path not in temp_cache_map:
      continue

    if "has_be_compared" not in temp_cache_map[path]:
      temp_cache_map[path]["has_be_compared"] = True
      result_str = ""
      for compare_path in images_path:
        if compare_path not in temp_cache_map or compare_path == path:
          continue

        has_not_be_compared = "has_be_compared" not in temp_cache_map[compare_path]

        cur_phash = imagehash.hex_to_hash(temp_cache_map[path]["phash"])
        compare_phash = imagehash.hex_to_hash(temp_cache_map[compare_path]["phash"])

        if has_not_be_compared and cur_phash - compare_phash <= similarity_threshold :
          filter_result = search_the_same.filter_by_color_similarity(path, [compare_path], color_similarity_threshold)
          if len(filter_result) != 0:
            temp_cache_map[compare_path]["has_be_compared"] = True
            new_compare_path = compare_path.replace(search_in_fds.local_folder, search_in_fds.http_file_path)
            decode_compare_path = utils.decode_str(new_compare_path)
            result_str += '\n' + decode_compare_path

      if result_str != "":
        new_path = path.replace(search_in_fds.local_folder, search_in_fds.http_file_path)
        result_str = new_path + result_str
        all_duplicate_images_arr.append(result_str)

  workbook = openpyxl.Workbook()
  sheet = workbook.active

  sheet.append(['组号'] + ['重复图片路径'])
  for i, row_data in enumerate(all_duplicate_images_arr):
      sheet.append(['第 {} 组'.format(i + 1)] + [row_data])
  
  sheet.column_dimensions['B'].width = 150

  for cell in sheet["B"]:
    cell.alignment = Alignment(wrapText=True)
  
  workbook.save(output_file_name)

  print("\n✅ 检索完成啦！共有 {} 组重复图片，请打开 {} 文件查看".format(len(all_duplicate_images_arr), output_file_name))

  subprocess.call(["open", output_file_name])
