FROM node:12
RUN apt-get update
RUN apt-get install -y zip unzip
COPY . /node-propagator
WORKDIR /node-propagator
RUN npm install --production --unsafe-perm

EXPOSE 5011

CMD ./start.sh
