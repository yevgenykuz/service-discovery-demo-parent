java -agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=8412 -javaagent:"agent\cx-launcher.jar" -DcxAgentAutoUpgrade=no -Dcx.log.level=DEBUG -jar "target\bank-storage.jar"
