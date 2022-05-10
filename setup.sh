#!/bin/bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
. ~/.nvm/nvm.sh
nvm uninstall 18.1
nvm install 16.14.2
nvm use 16.14.2
npm run build 
npm run start:prod