# Copyright (c) 2021 Visiosto oy
# Licensed under the MIT License

"""This module reads the Python version from the given Python
file.
"""

import os
import sys


about = {}
with open(sys.argv[1]) as f:
    exec(f.read(), about)


if __name__ == "__main__":
    print(about[sys.argv[2]])
