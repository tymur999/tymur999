FROM node:latest AS build

WORKDIR /blog
COPY package.json /blog/
RUN npm install

COPY . /blog/
RUN npm run build

FROM nginx:alpine
COPY --from=build /blog/build/ /var/www/html/
COPY nginx.conf /etc/nginx/