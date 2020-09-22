Java applications
######################

This project includes demo applications written in Java and configuration to demo Checkmarx service discovery on kubernetes.

-----

Usage
=====

In order to trigger start of a flow you can sent HTTP request to http://localhost:8085/kafka/send?message=${text} or produce a message to Kafka (topic: entry_point)

The following input will lead to vulnerability
sqli -> sql injection
commandi -> command injection
any other text -> log forging
