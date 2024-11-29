FROM node:22-alpine3.19 AS build

RUN apk add --no-cache python3 py3-pip make g++ 

WORKDIR /usr/local/app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile --ignore-optional

COPY . .

RUN yarn build

FROM nginx:1.21-alpine

COPY --from=build /usr/local/app/dist/angular-job-app-tracker /usr/share/nginx/html
COPY ./deploy/nginx/nginx.conf /etc/nginx/conf.d/default.conf

RUN chown -R nginx:nginx /usr/share/nginx/html && chmod -R 755 /usr/share/nginx/html && \
  chown -R nginx:nginx /var/cache/nginx && \
  chown -R nginx:nginx /var/log/nginx && \
  chown -R nginx:nginx /etc/nginx/conf.d
RUN touch /var/run/nginx.pid && \
  chown -R nginx:nginx /var/run/nginx.pid

USER nginx

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
