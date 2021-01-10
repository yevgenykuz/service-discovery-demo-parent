#! /bin/sh

if [[ -z "${IAST_MANAGER_URL}" ]]; then
  node index.js
else
  npm install --save-dev ${IAST_MANAGER_URL}/iast/nodejs
  npx cxiast index.js
fi