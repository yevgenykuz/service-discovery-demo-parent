#! /bin/bash
if [[ -z "${IAST_MANAGER_URL}" ]]; then
  java -jar java-kafka-entry-point.jar
else
  cwd=$(pwd)
  mkdir /usr/local/cxiast-agent
  cd /usr/local/cxiast-agent
  wget "${IAST_MANAGER_URL}/iast/compilation/download" -O CxAgent.zip
  unzip CxAgent.zip
  chmod a+w .
  chmod a+x CxIAST.sh
  echo "maxStoredStringLength=50" >>cx_agent.override.properties
  cd ${cwd}
  java -javaagent:/usr/local/cxiast-agent/cx-launcher.jar -Xverify:none -Dcx.standalone=yes -jar java-kafka-entry-point.jar
fi
