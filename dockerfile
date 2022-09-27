FROM node:18

ENV PORT 3000

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

RUN rm -rf /usr/src/node_modules
COPY package*.json /usr/src/app

COPY prisma /usr/src/app/prisma

COPY tsconfig.json ./usr/src/app

COPY . /usr/src/app/

RUN npm install

RUN npx prisma generate


EXPOSE 3000

CMD "npm" "run" "dev"  

