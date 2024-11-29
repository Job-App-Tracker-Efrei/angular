FROM node:22-alpine3.19 AS build

RUN apk add --no-cache python3 py3-pip make g++ 

WORKDIR /usr/local/app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile --ignore-optional

COPY . .

RUN yarn build

FROM nginx:1.21-alpine

COPY --from=build /usr/local/app/dist/angular-job-app-tracker /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
