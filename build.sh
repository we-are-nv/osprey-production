#!/bin/bash

echo "setting git stuff"
eval $(ssh-agent -s)
ssh-add ~/.ssh/github

echo "Removing old containers"
docker rm $(docker ps)

echo "Removing old images"
docker image rm $(docker image ls -a)

echo "Building application"
docker-compose -f docker-compose-dev-2.yml build

