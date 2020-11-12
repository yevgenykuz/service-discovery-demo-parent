#! /bin/bash
if [[ -z "${IAST_MANAGER_URL}" ]]; then
  python ./test.py
else
  cwd=$(pwd)
  mkdir /usr/local/cxiast-agent
  cd /usr/local/cxiast-agent
  wget "${IAST_MANAGER_URL}/iast/compilation/download/LIGHTWEIGHT" -O CxAgent.zip
  unzip CxAgent.zip
  python ./main.py &
  cd ${cwd}
  http_proxy=localhost:1337 python ./test.py
fi
