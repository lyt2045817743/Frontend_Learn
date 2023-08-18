from PIL import Image
import imagehash
import sys

args = sys.argv

script_name = args[0]
parameters = args[1:]

given_image_path = parameters[0]
similarity_threshold = 0

if len(parameters) == 2:
    similarity_threshold = int(parameters[1])

print("please wait...")

with open('imagePaths.txt', 'r') as file:
    image_paths = file.readlines()

image_paths_array = [path.strip() for path in image_paths]

given_hash = imagehash.phash(Image.open(given_image_path))

similarities = []
for path in image_paths_array:
    try:
        image = Image.open(path)
        image_hash = imagehash.phash(image)
        similarity = given_hash - image_hash
        if similarity <= similarity_threshold:
            similarities.append(path)
    except Exception as e:
        print("An error occurred while trying to open {}: {} error".format(path, e))

print('job success...')
print(similarities)
