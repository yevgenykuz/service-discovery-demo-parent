FROM openjdk:8-jdk-slim
EXPOSE 9092 2181 8085
COPY target/kafka-http-entry-point.jar kafka-http-entry-point.jar
COPY start.sh start.sh
RUN chmod +x start.sh
RUN apt-get update
RUN apt-get install wget unzip -y
CMD ./start.sh