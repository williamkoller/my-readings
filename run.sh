#!/bin/bash
cd /home/ec2-user/my-readings
docker-compose build --no-cache
docker-compose --env-file .env.aws up -d