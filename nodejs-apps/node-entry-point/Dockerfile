FROM node:10-alpine
RUN apk add zip unzip
COPY . /node-entry-point
WORKDIR /node-entry-point
RUN npm install --production --unsafe-perm

EXPOSE 5010

CMD ./start.sh
