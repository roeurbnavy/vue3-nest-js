# # Ref : https://medium.com/@sujan.dumaru.official/dockerizing-nestjs-application-c4b25139fe4c

# FROM node:20.9.0

# # Create app directory
# WORKDIR /usr/src/app

# ENV NODE_ENV development

# # A wildcard is used to ensure both package.json AND package-lock.json are copied
# COPY package*.json ./

# # Install app dependencies
# RUN npm install 

# # Bundle app source
# COPY . .

# # Copy the .env and .env.development files
# COPY .env ./

# # Creates a "dist" folder with the production build
# RUN npm run build

# # Expose the port on which the app will run
# EXPOSE 3000

# # CMD ["npm","run","start:prod"]

# Ref : https://blog.logrocket.com/containerized-development-nestjs-docker/
FROM node:20.9.0 as development

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install --only=development

# Bundle app source
COPY . .

# Copy the .env and .env.development files
COPY .env ./

# Creates a "dist" folder with the production build
RUN npm run build:prod

FROM node:20.9.0 as production

ENV NODE_ENV=production
# ENV NODE_ENV = ${NODE_ENV}

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install --only=production

# Bundle app source
COPY . .

# Copy the .env and .env.development files
COPY .env ./

COPY --from=development /usr/src/app/dist ./dist

CMD ["node","dist/main"]