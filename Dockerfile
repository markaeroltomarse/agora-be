FROM node:16

WORKDIR /app
COPY package*.json ./
RUN npm install 
COPY . .

EXPOSE 3001
CMD ["npm", "run", "dev"]

# FROM node:16

# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .

# EXPOSE 5000
# CMD ["node", "server.js"]