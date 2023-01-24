#!/bin/bash

echo "Deploying application"
docker-compose -f docker-compose-dev.yml up --remove-orphans



