#!/bin/bash

echo "Removing old containers"
docker rm $(docker ps)

echo "Removing old images"
docker image rm $(docker image ls -a)

echo "Building application"
docker-compose -f docker-compose.yml build

