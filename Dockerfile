FROM node:latest

WORKDIR ./
COPY package.json .
RUN npm config set strict-ssl false
RUN npm install
COPY . .
EXPOSE 3000
RUN npm run swagger-autogen
CMD npm start