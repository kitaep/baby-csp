FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install 

COPY . .

EXPOSE 3000

#CMD ["ls"]

CMD ["nodemon", "--legacy-watch", "app.js"]
