FROM node:alpine AS development

WORKDIR /app
# Copy package files
COPY package*.json ./

RUN npm install

# Copy all source files
COPY . .

EXPOSE 8080

CMD [ "npm", "start" ]