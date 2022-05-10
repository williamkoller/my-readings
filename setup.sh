#!/bin/bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
. ~/.nvm/nvm.sh
nvm uninstall 18.1
nvm install 16.14.2
nvm use 16.14.2
npm i -g yarn
cd /home/ec2-user/my-readings
yarn install
yarn start:prod