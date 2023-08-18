import os
import sys

args = sys.argv
script_name = args[0]
parameters = args[1:]

directory_pathArr = parameters

image_extensions = ['.jpg', '.jpeg', '.png', '.gif']

output_filename = 'imagePaths.txt'

print("please wait...")

image_paths = []
for directory_path in directory_pathArr:
    for root, _, files in os.walk(directory_path):
        for file in files:
            _, ext = os.path.splitext(file)
            if ext.lower() in image_extensions:
                image_paths.append(os.path.join(root, file))

with open(output_filename, 'w') as output_file:
    for path in image_paths:
        output_file.write(path + '\n')

print("success! The file for storing the image path is ready: {}".format(output_filename))
