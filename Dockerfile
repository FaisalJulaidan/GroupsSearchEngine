FROM node:16-alpine
WORKDIR /usr/node/app
COPY . .
RUN npm install

WORKDIR /usr/node/app/frontend
RUN npm install
RUN npm run build

WORKDIR /usr/node/app
EXPOSE 3001
CMD ["npm", "run", "start"]
