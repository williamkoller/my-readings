#!make
MAKEFLAGS += --silent

up:
	docker-compose up

build:
	docker-compose up --build  --remove-orphans

down: 
	docker-compose down