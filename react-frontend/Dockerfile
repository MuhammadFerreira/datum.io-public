# pull official base image
FROM node:16.14.2-alpine as BUILD

# set working directory
WORKDIR /app

# install app dependencies
COPY package.json ./
COPY package-lock.json ./

RUN npm install --silent

# add app
COPY . ./

RUN npm run build

FROM nginx:1.21.6-alpine

COPY --from=BUILD /app/build/ /usr/share/nginx/html/

CMD ["nginx", "-g", "daemon off;"]
