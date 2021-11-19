FROM node:latest

WORKDIR ./
COPY package.json .
RUN npm config set strict-ssl false
RUN npm install
COPY . .
CMD npm start