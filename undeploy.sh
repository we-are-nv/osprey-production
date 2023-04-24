#!/bin/bash

echo "un deploying application"
echo "spinning down"
docker-compose -f docker-compose-dev.yml down -v



