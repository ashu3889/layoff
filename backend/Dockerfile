# 1. Base Image: Use a stable, glibc-based lightweight Linux with Node 20
FROM node:20-slim

# 2. Working Directory: Set the default directory inside the container for all subsequent commands
WORKDIR /app

# 3. Dependency Manifest: Copy only package files first to leverage Docker layer caching
COPY package*.json ./

# 4. Install Dependencies: Fetch production and development packages inside the container environment
RUN npm install

# 5. Source Code: Copy the rest of the application source code into the container
COPY . .

# 6. Default Command: Define what process runs when the container boots up
CMD ["node", "server.js"]