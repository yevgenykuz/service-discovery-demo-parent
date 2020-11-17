#! /bin/bash
if [[ -z "${IAST_MANAGER_URL}" ]]; then
  java -jar java-http-propagator.jar
else
  cwd=$(pwd)
  mkdir /usr/local/cxiast-agent
  cd /usr/local/cxiast-agent
  wget --no-check-certificate "${IAST_MANAGER_URL}/iast/compilation/download" -O CxAgent.zip
  unzip CxAgent.zip
  chmod a+w .
  chmod a+x CxIAST.sh
  echo "maxStoredStringLength=50" >>cx_agent.override.properties
  cd ${cwd}
  /usr/local/cxiast-agent/CxIAST.sh -e "java -jar java-http-propagator.jar"
fi
