import os

def set_global_environment_variable(key, value):
    system = os.name

    if system == "nt":  # Windows
        os.system(f'setx {key} "{value}"')
    else:  # Linux, macOS
        with open(os.path.expanduser('~/.bashrc'), "a") as bashrc_file:
            bashrc_file.write(f"export {key}={value}\n")

def get_global_environment_variable(key):
    system = os.name
    value = ""

    if system == "nt":  # Windows
        value = os.environ.get(key)
    else:  # Linux, macOS
        with open(os.path.expanduser('~/.bashrc'), "r") as bashrc_file:
            lines = bashrc_file.readlines()
            for line in lines:
                if f"export {key}" in line:
                    value = line.split("=")[1].strip()
                    break

    return value