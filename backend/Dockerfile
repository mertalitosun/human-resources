FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8000

CMD ["./wait-for-it.sh", "db:3306", "--", "npm", "start"]
