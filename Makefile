#!make
MAKEFLAGS += --silent

up:
	docker-compose up

build:
	docker-compose up --build

down: 
	docker-compose down