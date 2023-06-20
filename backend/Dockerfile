FROM node:19-slim

WORKDIR /app

COPY package*.json ./

RUN npm install
ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
	then npm install; \
	else npm install --only=production; \
	fi
# RUN npm install -g nodemon

COPY . ./
ENV PORT 3030

EXPOSE $PORT

# ENTRYPOINT [ "nodemon", "-L", "./server.js" ]
RUN npm install
CMD [ "npm", "run" ,"start" ]