FROM node:slim

COPY ./dist/ospreyProduction .

CMD ["node", "ospreyProduction/server/main.js"]