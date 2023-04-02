#!/bin/bash

echo "Deploying application"
docker-compose -f docker-compose-dev-2.yml up --remove-orphans



