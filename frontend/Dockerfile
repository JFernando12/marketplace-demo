FROM node:18 AS UI_STAGE

WORKDIR /app

COPY . .

RUN npm install --legacy-peer-deps

CMD [ "npm", "start" ]
