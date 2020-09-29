FROM openjdk:8-jdk-slim
COPY target/java-rabbitmq-sink.jar java-rabbitmq-sink.jar
COPY start.sh start.sh
RUN chmod +x start.sh
RUN apt-get update
RUN apt-get install wget unzip -y
CMD ./start.sh