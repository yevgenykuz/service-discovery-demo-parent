FROM openjdk:8-jdk-slim
EXPOSE 8116
COPY target/java-kafka-sink.jar java-kafka-sink.jar
COPY start.sh start.sh
RUN chmod +x start.sh
RUN apt-get update
RUN apt-get install wget unzip -y
CMD ./start.sh