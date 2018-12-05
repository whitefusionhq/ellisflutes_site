#!/bin/bash

JEKYLL_ENV=staging LANG="en_US.UTF-8" jekyll build -t -D --unpublished
