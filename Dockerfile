# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of the application source code to the working directory
COPY . .

# Expose the port on which your Node.js application is listening
EXPOSE 80

# Define the command to run your Node.js application
CMD [ "node", "app.js" ]