java -agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=1012 -javaagent:"agent\cx-launcher.jar" -DcxAgentAutoUpgrade=no -Dcx.log.level=DEBUG -jar "target\java-http-propagator.jar"
