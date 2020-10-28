#! /bin/bash

if [[ -z "${IAST_MANAGER_IP}" ]]; then
  node index.js
else
  npm install --save-dev ${IAST_MANAGER_IP}/iast/nodejs
  npx cxiast index.js
fi