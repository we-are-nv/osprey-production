#!/bin/bash

echo "setting git stuff"
eval $(ssh-agent -s)
ssh-add ~/.ssh/github

echo "Pulling"
git pull

echo "Removing old containers"
docker rm $(docker ps)

echo "Removing old images"
sudo docker image rm $(docker image ls -a)

echo "Building application"
docker-compose -f docker-compose-dev.yml build

