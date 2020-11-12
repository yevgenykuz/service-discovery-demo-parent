#! /bin/bash
if [[ -z "${IAST_MANAGER_URL}" ]]; then
  java -jar kotlin-http-middleman.jar
else
  cwd=$(pwd)
  mkdir /usr/local/cxiast-agent
  cd /usr/local/cxiast-agent
  wget "${IAST_MANAGER_URL}/iast/compilation/download/LIGHTWEIGHT" -O CxAgent.zip
  unzip CxAgent.zip
  python3 ./main.py &
  cd ${cwd}
  java -jar kotlin-http-middleman.jar
fi