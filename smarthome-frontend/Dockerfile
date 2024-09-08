# Use Node.js to build the React app
FROM node:16-alpine as build

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the React app source code into the container
COPY . .

# Build the React app for production
RUN npm run build

# Use Nginx to serve the static files
FROM nginx:alpine

# Copy the built files from the build stage
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 to the outside
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
