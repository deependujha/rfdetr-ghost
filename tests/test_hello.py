# ------------------------------------------------------------------------
# RF-DETR Ghost
# Copyright (c) 2026 Deependu Jha. All Rights Reserved.
# Licensed under the Apache License, Version 2.0 [see LICENSE for details]
#
# This project contains modifications and optimizations to RF-DETR,
# originally developed by Roboflow:
# https://github.com/roboflow/rf-detr/
# ------------------------------------------------------------------------

from rfdetr_ghost import hello


def test_hello_returns_greeting() -> None:
    assert hello() == "Hello from rfdetr-ghost!"
