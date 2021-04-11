#! /bin/bash
if [[ -z "${IAST_MANAGER_URL}" ]]; then
  java -jar bank-storage.jar
else
  cwd=$(pwd)
  mkdir /usr/local/cxiast-agent
  cd /usr/local/cxiast-agent
  wget --no-check-certificate "${IAST_MANAGER_URL}/iast/compilation/download/JAVA" -O CxAgent.zip
  unzip CxAgent.zip
  chmod a+w .
  chmod a+x CxIAST.sh
  echo "maxStoredStringLength=50" >>cx_agent.override.properties
  cd ${cwd}
  /usr/local/cxiast-agent/CxIAST.sh -e "java -jar bank-storage.jar"
fi
