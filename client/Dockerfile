# Use an official node runtime as a parent image
FROM node:14-alpine

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json /app/
RUN npm install

# Add the rest of the client code
COPY . .

EXPOSE 3000

CMD ["npm", "start"]