FROM openjdk:8-jdk-slim
EXPOSE 8115
COPY target/java-kafka-propagator.jar java-kafka-propagator.jar
COPY start.sh start.sh
RUN chmod +x start.sh
RUN apt-get update
RUN apt-get install wget unzip -y
CMD ./start.sh