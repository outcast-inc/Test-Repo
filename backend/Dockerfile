FROM node:16 AS base

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

# ENV MONGO_DRIVER="mongodb+srv://todo-app:UfzyNzvsWU2cV2XF@cluster0.51m09.mongodb.net/outcast-inc?retryWrites=true&w=majority&appName=Cluster0"

EXPOSE 9000

CMD [ "node", "server.js" ]
