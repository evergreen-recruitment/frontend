#!/bin/bash

IMAGE_NAME="iopp_front"
docker build -t $IMAGE_NAME .
docker run -d -p 80:80 $IMAGE_NAME
