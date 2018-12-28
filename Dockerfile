FROM node:8.14.1-jessie as builder

RUN npm -v

COPY package.json package-lock.json ./

RUN npm set registry https://registry.npm.taobao.org
RUN npm set sass_binary_site https://npm.taobao.org/mirrors/node-sass

RUN npm install && mkdir /ng-app && cp -R ./node_modules ./ng-app

WORKDIR /ng-app

COPY . .

RUN npm run build

FROM nginx:1.13.3-alpine

## Copy our default nginx config
COPY deploy/nginx/default.conf /etc/nginx/conf.d/

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## From 'builder' stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=builder /ng-app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
