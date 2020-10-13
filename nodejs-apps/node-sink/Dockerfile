FROM node:12-alpine
ARG IAST_MANAGER_IP
COPY . /node-sink
WORKDIR /node-sink
RUN npm install --production --unsafe-perm
RUN npm install --save-dev ${IAST_MANAGER_IP}/iast/nodejs
EXPOSE 5012
CMD ["npx", "cxiast", "index.js"]
