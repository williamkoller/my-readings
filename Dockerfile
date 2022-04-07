FROM node:16.14-alpine

RUN mkdir -p /home/app

WORKDIR /home/app

COPY package.json .

RUN yarn install --frozen-lock-file

COPY . . 

EXPOSE 3000

CMD [ "yarn", "start:dev" ]