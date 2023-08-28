# -*- coding: utf-8 -*-
import os
import sys
import json
from fds import GalaxyFDSClient, GalaxyFDSClientException, FDSClientConfiguration
import environUtil

# 版本兼容问题处理
major_version, minor_version = sys.version_info[:2]

inputFun = raw_input if major_version == 2 else input
errorName = ImportError if major_version == 2 else ModuleNotFoundError

# 静态变量
access_key_name = "FDS_ACCESS_KEY"
secret_key_name = "FDS_ACCESS_SECRET"
host = "cnbj1-fds.api.xiaomi.net"
bucket_name = 'retailrevolution'

# 密钥获取
access_key = environUtil.get_global_environment_variable(access_key_name)
secret_key = environUtil.get_global_environment_variable(secret_key_name)

if access_key == "" or secret_key == "":
    print("获取密钥路径：https://cloud.d.xiaomi.net/#/usercenter/userinfo")
    access_key = inputFun("请输入您的AccessKey：")
    secret_key = inputFun("请输入您的SecretKey：")
    environUtil.set_global_environment_variable(access_key_name, access_key)
    environUtil.set_global_environment_variable(secret_key_name, secret_key)

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

local_folder = './fds'
os.makedirs(local_folder, exist_ok=True)

output_file_path = "./fds/mapping_data.json"
mapping_data = {}
if os.path.exists(output_file_path):
    with open(output_file_path, 'r') as json_file:
        mapping_data = json.load(json_file)

def download_objects(bucket_name, object_prefix):
    object_list = fds_client.list_objects(bucket_name, prefix=object_prefix)
    for object_info in object_list.objects:
        object_name = object_info.object_name
        uploadTime = object_info.uploadTime
        if object_name.endswith('.jpg') or object_name.endswith('.png'):
            local_file_path = "{}/{}".format(local_folder, object_name)  # 本地文件路径
            local_directory = os.path.dirname(local_file_path)
            os.makedirs(local_directory, exist_ok=True)
            try:
                if object_name not in mapping_data or uploadTime > mapping_data[object_name]:
                    fds_client.download_object(bucket_name, object_name, local_file_path)
                    print("Downloaded {} to {}".format(object_name, local_file_path))
                    mapping_data[object_name] = uploadTime
            except Exception as e:
                print("Error downloading {}: {}".format(object_name, e))
    
    for folder_name in object_list.common_prefixes:
        download_objects(bucket_name, folder_name)

# 开始下载，从 Bucket 根目录开始
print("\n🚩 检查更新中，请稍候...\n")
download_objects(bucket_name, '')

with open(output_file_path, "w") as json_file:
    json.dump(mapping_data, json_file, indent=4)

print("📁 已是最新的远程图片资源")