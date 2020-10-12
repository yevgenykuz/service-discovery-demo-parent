FROM node:12-alpine
ARG MANAGER_IP
COPY . /node-propagator
WORKDIR /node-propagator
RUN npm install --production --unsafe-perm
RUN npm install --save-dev ${MANAGER_IP}/iast/nodejs
EXPOSE 5011
CMD ["npx", "cxiast", "index.js"]
