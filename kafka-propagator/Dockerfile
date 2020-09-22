FROM openjdk:8-jdk-slim
EXPOSE 9092 2181
COPY target/kafka-propagator.jar kafka-propagator.jar
COPY start.sh start.sh
RUN chmod +x start.sh
RUN apt-get update
RUN apt-get install wget unzip -y
CMD ./start.sh