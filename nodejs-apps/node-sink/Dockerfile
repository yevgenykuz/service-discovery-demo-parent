FROM node:12
RUN apt-get update
RUN apt-get install -y zip unzip
COPY . /node-sink
WORKDIR /node-sink
RUN npm install --production --unsafe-perm

EXPOSE 5012

CMD ./start.sh
