# Use an official node runtime as a parent image
FROM node:14-alpine

WORKDIR /client

# Install dependencies
COPY package*.json /client/
RUN npm install

# Add the rest of the client code
COPY . .

# Make port 3000 available for the app
EXPOSE 3000

CMD ["npm", "start"]