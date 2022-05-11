#!/bin/bash
cd /home/ec2-user/my-readings
docker-compose build --no-cache
docker-compose up -d --env-file .env