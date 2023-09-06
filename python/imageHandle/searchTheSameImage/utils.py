# -*- coding: utf-8 -*-
import sys
major_version, minor_version = sys.version_info[:2]
if major_version == 2:
  print("Python2已终止支持，请安装Python3+的版本：https://www.python.org/downloads/")
  sys.exit(0)

import os
import subprocess
import importlib
from urllib.parse import unquote

# 版本兼容问题处理
major_version, minor_version = sys.version_info[:2]
errorName = ImportError if major_version == 2 else ModuleNotFoundError
inputFun = raw_input if major_version == 2 else input

# 设置全局环境变量
def set_global_environment_variable(key, value):
    system = os.name

    if system == "nt":  # Windows
        os.system('setx {} "{}"'.format(key, value))
    else:  # Linux, macOS
        with open(os.path.expanduser('~/.bashrc'), "a") as bashrc_file:
            bashrc_file.write("export {}={}\n".format(key, value))

# 获取全局环境变量
def get_global_environment_variable(key):
    system = os.name
    value = ""

    if system == "nt":  # Windows
        value = os.environ.get(key)
    else:  # Linux, macOS
        with open(os.path.expanduser('~/.bashrc'), "r") as bashrc_file:
            lines = bashrc_file.readlines()
            for line in lines:
                if "export {}".format(key) in line:
                    value = line.split("=")[1].strip()
                    break

    return value

# 安装依赖
def install_package(package_name):
    subprocess.check_call(["python{}.{}".format(major_version, minor_version), "-m", "pip", "install", package_name])

# 检查并安装
def check_and_install(lib_name, package_name):
    try:
        importlib.import_module(lib_name)
        print("{} 已安装".format(package_name))
    except errorName:
        subprocess.check_call(["pip", "install", "--upgrade", "pip", "setuptools"])
        print("\n{} 未安装，开始安装...".format(package_name))
        install_package(package_name)
        print("{} 安装完成\n".format(package_name))

# 获取文件的最近修改时间
def get_image_update_timestamp(path):
    return int(os.path.getmtime(path) * 1000)

def decode_str(str):
    try:
        decoded_str = unquote(str)
        utf8_str = decoded_str.encode('latin1').decode('utf-8')
    except UnicodeEncodeError:
        # print("\n解码失败：{}".format(str))
        return str
    return utf8_str