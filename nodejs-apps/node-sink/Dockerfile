FROM node:12-alpine
ARG MANAGER_IP
COPY . /node-sink
WORKDIR /node-sink
RUN npm install --production --unsafe-perm
RUN npm install --save-dev ${MANAGER_IP}/iast/nodejs
EXPOSE 5012
CMD ["npx", "cxiast", "index.js"]
