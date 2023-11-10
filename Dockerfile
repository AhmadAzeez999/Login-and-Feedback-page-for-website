# Use an official Node.js runtime as the base image
FROM node
# Set the working directory inside the container
WORKDIR /app

# Copy your application files to the container
COPY . .

# Install application dependencies
RUN npm install

# Expose a port if needed
EXPOSE 3000

# Define the command to run your application
CMD [ "node", "techinez.js" ]
