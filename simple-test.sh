#!/bin/bash

#Simple test
#
docker run -it --shm-size 1G --rm \
-v $(pwd)/index.js:/app/index.js \
-v $(pwd):/screenshots \
-e AZURE_STORAGE_CONNECTION_STRING=$AZURE_STORAGE_CONNECTION_STRING \
-e URL=$URL \
-e STORAGE_CONTAINER=$STORAGE_CONTAINER \
-e SNAPSHOT_NAME=$SNAPSHOT_NAME \
-e SNAPSHOT_PATH=$SNAPSHOT_PATH \
knovus/puppeteer:latest

