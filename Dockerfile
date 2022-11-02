FROM node:alpine
WORKDIR /usr/node/app
COPY package*.json ./
RUN npm install

WORKDIR /usr/node/app/frontend
COPY package*.json ./
RUN npm install
RUN npm run build

WORKDIR /usr/app
EXPOSE 3001
CMD ["npm", "run", "start"]
