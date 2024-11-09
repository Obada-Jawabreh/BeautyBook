# Use a base image with Node.js
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Prisma client
RUN npx prisma generate

# Expose the port the app will run on
EXPOSE 5001

# Start the app
CMD ["npm", "run", "dev"]