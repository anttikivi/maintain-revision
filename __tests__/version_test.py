# Copyright (c) 2021 Visiosto oy
# Licensed under the MIT License


_VERSION_SUFFIX = "-dev"


__version__ = "{}{}".format(
    ".".join([str(n) for n in (0, 3, 2)]),
    _VERSION_SUFFIX
)


if __name__ == "__main__":
    print(__version__)
