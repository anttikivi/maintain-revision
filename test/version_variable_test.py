# Copyright (c) 2021 Visiosto oy
# Licensed under the MIT License


_VERSION_SUFFIX = "-dev"


version_variable = "{}{}".format(
    ".".join([str(n) for n in (1, 4, 5)]),
    _VERSION_SUFFIX
)
