import os
import sys

args = sys.argv
script_name = args[0]
parameters = args[1:]

directory_pathArr = parameters

image_extensions = ['.jpg', '.jpeg', '.png', '.gif']

output_filename = 'image_paths.txt'

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

print("images routes are already: ", output_filename)
