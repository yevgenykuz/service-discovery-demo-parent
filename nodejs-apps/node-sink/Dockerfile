FROM node:10-alpine
RUN apk add zip unzip
COPY . /node-sink
WORKDIR /node-sink
RUN npm install --production --unsafe-perm

EXPOSE 5012

CMD ./start.sh
