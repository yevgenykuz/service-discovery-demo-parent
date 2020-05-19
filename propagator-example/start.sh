#! /bin/bash
if [[ -z "${server_ip}" ]]; then
    java -jar propagator-example-1.0.0-SNAPSHOT.jar
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
    /usr/local/cxiast-agent/CxIAST.sh -e "java -jar propagator-example-1.0.0-SNAPSHOT.jar"
fi
