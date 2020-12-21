FROM node:10-alpine
RUN apk add zip unzip
COPY . /node-propagator
WORKDIR /node-propagator
RUN npm install --production --unsafe-perm

EXPOSE 5011

CMD ./start.sh
