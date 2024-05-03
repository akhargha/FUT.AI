FROM node

WORKDIR /app

COPY package.json .
RUN npm i

COPY . .

## EXPOSE [Port you mentioned in the vite.config file]

EXPOSE 5173

CMD ["npm", "run", "dev"]

# # Use a more specific node version and possibly a smaller variant like alpine
# FROM node:16-alpine

# # Set the working directory inside the container
# WORKDIR /app

# # Copy only the package.json initially to leverage Docker cache
# COPY package.json ./

# # Install dependencies
# RUN npm install

# # Copy only the necessary source files
# COPY src/ ./src/

# # Expose the port the app runs on
# EXPOSE 5173

# # Specify the command to run your app
# CMD ["npm", "run", "dev"]
