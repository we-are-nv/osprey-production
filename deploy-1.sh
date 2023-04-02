#!/bin/bash

echo "Deploying application"
docker-compose -f docker-compose-dev-1.yml up --remove-orphans



