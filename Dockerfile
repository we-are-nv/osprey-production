# Use a lightweight Node.js base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy only the necessary files to the container
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci --quiet --production


# Copy the build files
COPY dist/paragonProduction/server/main.js ./server/main.js
COPY dist/paragonProduction/browser ./browser

# Expose the port that the app will listen on
EXPOSE 4000

# Run the server
CMD ["node", "server/main.js"]