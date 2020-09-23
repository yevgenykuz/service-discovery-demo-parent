#! /bin/bash
if [[ -z "${server_ip}" ]]; then
    java -jar java-kafka-http-entry-point.jar
else
    cwd=$(pwd)
    mkdir /usr/local/cxiast-agent
    cd /usr/local/cxiast-agent
    wget "http://${server_ip}:8380/iast/compilation/download" -O CxAgent.zip
    unzip CxAgent.zip
    chmod a+w .
    chmod a+x CxIAST.sh
    echo "maxStoredStringLength=50" >> cx_agent.override.properties
    cd ${cwd}
    java -javaagent:/usr/local/cxiast-agent/cx-launcher.jar -Xverify:none -Dcx.standalone=yes -jar java-kafka-http-entry-point.jar
fi