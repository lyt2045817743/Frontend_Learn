# -*- coding: utf-8 -*-
# 功能：搜索FDS某些路径下与目标图片相似的图片（本脚本可以单独执行）
# 参数说明：
  # positional arguments: imagePath 目标图片路径
  # option1: --dirPaths FDS目录路径数组。例['Icons', 'images', ...]。默认所有
# 脚本执行过程中，根据提示设置相似性阙值，阙值越小，输出的图片与目标图片越相似
# 输出：与目标图片相似的图片组。
# 例：python searchTheRemoteSameImages.py ~/Desktop/example.png
import os
import sys
import json
import utils
import searchTheSameImages
import argparse
import ast

# 该脚本单独运行时：需要根据需要自行配置
host = "cnbj1-fds.api.xiaomi.net"
bucket_name = 'retailrevolution'
local_folder = 'scripts/imageHandle/mi_fds_images'

http_file_path = 'https://' + bucket_name + '.cnbj1.mi-fds.com/' + bucket_name
map_file = '/mapping_data.json'
output_file_path = local_folder + map_file

access_key_name = "FDS_ACCESS_KEY"
secret_key_name = "FDS_ACCESS_SECRET"
fds_client = ""
mapping_data = {}

def install_fds_lib():
    # 检查并安装需要的依赖
    global GalaxyFDSClient
    global FDSClientConfiguration
    utils.check_and_install("fds", "galaxy-fds-sdk")
    from fds import GalaxyFDSClient, FDSClientConfiguration

def get_user_key_and_connect_fds_client():
    global fds_client
    # 密钥获取
    access_key = utils.get_global_environment_variable(access_key_name)
    secret_key = utils.get_global_environment_variable(secret_key_name)

    if access_key == "" or secret_key == "":
        print("获取密钥路径：https://cloud.d.xiaomi.net/#/usercenter/userinfo")
        access_key = input("请输入您的AccessKey：")
        secret_key = input("请输入您的SecretKey：")
        utils.set_global_environment_variable(access_key_name, access_key)
        utils.set_global_environment_variable(secret_key_name, secret_key)
    
    # 开始下载，从 Bucket 根目录开始
    print("\n🚩 FDS资源检查更新中，请稍候...\n")

    # 链接FDS应用
    fds_client = GalaxyFDSClient(
        access_key = access_key,
        access_secret = secret_key,
        config = FDSClientConfiguration(
            endpoint = host,
            enable_cdn_for_upload=False,
            enable_cdn_for_download=True,
        ),
    )

# 下载文件
def download_objects(bucket_name, object_prefix):
    global fds_client
    global mapping_data
    os.makedirs(local_folder, exist_ok=True)
    object_list = fds_client.list_objects(bucket_name, prefix=object_prefix)
    for object_info in object_list.objects:
        object_name = object_info.object_name
        uploadTime = object_info.uploadTime
        if object_name.endswith('.jpg') or object_name.endswith('.png')or object_name.endswith('.jpeg'):
            local_file_path = "{}/{}".format(local_folder, object_name)  # 本地文件路径
            local_directory = os.path.dirname(local_file_path)
            os.makedirs(local_directory, exist_ok=True)
            try:
                if object_name not in mapping_data or uploadTime > mapping_data[object_name]:
                    fds_client.download_object(bucket_name, object_name, local_file_path)
                    print("Downloaded {} to {}".format(object_name, local_file_path))
                    mapping_data[object_name] = uploadTime
            except Exception as e:
                print("❗️ 部分图片下载失败 {}: {}".format(object_name, e))
    
    for folder_name in object_list.common_prefixes:
        download_objects(bucket_name, folder_name)
        print("{}目录中的图片已更新\n".format(folder_name))

def update_local_from_fds():
    global mapping_data

    # 存储图片更新时间的映射
    if os.path.exists(output_file_path):
        with open(output_file_path, 'r') as json_file:
            mapping_data = json.load(json_file)

    download_objects(bucket_name, '')

    with open(output_file_path, "w") as json_file:
        json.dump(mapping_data, json_file, indent=4)

    print("📁 已是最新的FDS图片资源")

def init():
    get_user_key_and_connect_fds_client()
    update_local_from_fds()

def format_fds_result(fds_similarities):
    fds_result = []
    for item in fds_similarities:
        fds_result.append(item.replace(local_folder, http_file_path))
    return fds_result

if __name__ == "__main__":

    # 版本兼容问题处理
    major_version, minor_version = sys.version_info[:2]
    if major_version == 2:
        print("Python2已终止支持，请安装Python3+的版本：https://www.python.org/downloads/")
        sys.exit(0)

    searchTheSameImages.cache_file_path = './cache/image_info_cache.json'

    local_folder = './mi_fds_images'
    output_file_path = local_folder + map_file
    parser = argparse.ArgumentParser(description="搜索FDS某些路径下与目标图片相似的图片")
    parser.add_argument("imagePath", type=str, help="目标图片路径")
    parser.add_argument("--dirPaths", type=str, default="['{}']".format(local_folder), help="FDS目录路径数组。例['Icons', 'images', ...]")
    args = parser.parse_args()
    dir_paths = ast.literal_eval(args.dirPaths)

    similarity_threshold = searchTheSameImages.input_similarity_threshold()

    print("\n🚩 第三方库检查/安装中...\n")
    searchTheSameImages.install_image_lib()
    install_fds_lib()
    init()

    print("\n🚩 FDS图片内容比对中...\n")

    fds_similarities = searchTheSameImages.collect_images_and_search(args.imagePath, dir_paths, similarity_threshold)
    fds_result = format_fds_result(fds_similarities)
    
    searchTheSameImages.result_handle([{
        "same_images_local_path": fds_similarities,
        "output_result": fds_result,
        "source_name": "FDS"
    }])