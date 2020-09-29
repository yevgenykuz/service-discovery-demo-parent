FROM openjdk:8-jdk-slim
COPY target/java-rabbitmq-propagator.jar java-rabbitmq-propagator.jar
COPY start.sh start.sh
RUN chmod +x start.sh
RUN apt-get update
RUN apt-get install wget unzip -y
CMD ./start.sh