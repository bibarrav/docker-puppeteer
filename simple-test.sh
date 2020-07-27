#!/bin/bash

#Simple test

docker run -it --shm-size 1G --rm \
-v $(pwd):/screenshots \
-e AZURE_STORAGE_CONNECTION_STRING=$AZURE_STORAGE_CONNECTION_STRING \
-e URL=$2 \
-e STORAGE_CONTAINER=$3 \
-e SNAPSHOT_NAME=$4 \
knovus/puppeteer:latest

