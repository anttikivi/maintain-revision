# Copyright (c) 2021 Visiosto oy
# Licensed under the MIT License

"""This module reads the Python version from the given Python
file.
"""

import os
import sys


about = {}
with open(os.path.join(
        os.path.abspath(os.environ["GITHUB_WORKSPACE"]),
        *sys.argv[1].split("/")
)) as f:
    exec(f.read(), about)


if __name__ == "__main__":
    print(about[sys.argv[2]])
