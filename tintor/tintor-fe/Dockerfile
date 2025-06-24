FROM node:alpine AS development

WORKDIR /app
# Copy package files
COPY package.json yarn.lock ./ 

RUN yarn install --frozen-lockfile

# Copy all source files
COPY . .

EXPOSE 5173

CMD [ "yarn", "dev" ]