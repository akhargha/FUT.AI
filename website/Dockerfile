FROM node

WORKDIR /app

COPY package.json .

RUN rm -rf node_modules/.vite/

RUN npm cache clean --force

RUN npm i


ENV SUPABASE_URL='https://hbrecxmlkcpcwmoijrke.supabase.co'

ENV SUPABASE_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhicmVjeG1sa2NwY3dtb2lqcmtlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMyNDk3MjIsImV4cCI6MjAyODgyNTcyMn0.2Oubd4u4Ehw2XHCynBQEbxCbugJ88tGzsDIsm6xxJik'

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
