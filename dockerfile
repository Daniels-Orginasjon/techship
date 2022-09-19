FROM node:18

ENV PORT 3000

RUN mkdir -p /usr/src/techship/app

WORKDIR /usr/src/techship/app

COPY package*.json /usr/src/techship/app

RUN npm install

COPY . /usr/src/techship/app

EXPOSE 3000

CMD "npm" "run" "dev" 
