FROM node:18 AS development
WORKDIR /node
COPY package*.json tsconfig.json ./
RUN npm install
WORKDIR /node/app
CMD ["npm", "run", "start"]
