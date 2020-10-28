FROM node:12
RUN apt-get update
RUN apt-get install -y zip unzip
COPY . /node-entry-point
WORKDIR /node-entry-point
RUN npm install --production --unsafe-perm

EXPOSE 5010

CMD ./start.sh
