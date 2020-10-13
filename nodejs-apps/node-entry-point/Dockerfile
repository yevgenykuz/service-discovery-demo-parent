FROM node:12-alpine
ARG IAST_MANAGER_IP
COPY . /node-entry-point
WORKDIR /node-entry-point
RUN npm install --production --unsafe-perm
RUN npm install --save-dev ${IAST_MANAGER_IP}/iast/nodejs
EXPOSE 5010
CMD ["npx", "cxiast", "index.js"]
