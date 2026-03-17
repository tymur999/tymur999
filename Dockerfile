FROM node:latest AS build
WORKDIR /blog
COPY package.json /blog/
RUN npm install
COPY . /blog/
RUN npm run build

FROM docker.io/nginx:trixie
RUN useradd tymur999 -u 3000
RUN chown tymur999:tymur999 -R /etc/logrotate.d/nginx \
                               /etc/nginx \
                               /etc/init.d/nginx \
                               /usr/lib/nginx \
                               /usr/share/nginx \
                               /var/cache/nginx \
                               /var/log/nginx
USER tymur999:tymur999

COPY --from=build --chown=tymur999:tymur999 /blog/build/ /var/www/html/
COPY --link nginx.conf /etc/nginx/
EXPOSE 8000