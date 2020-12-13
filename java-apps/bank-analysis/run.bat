java -agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=8411 -javaagent:"agent\cx-launcher.jar" -DcxAgentAutoUpgrade=no -Dcx.log.level=DEBUG -jar "target\bank-analysis.jar"
