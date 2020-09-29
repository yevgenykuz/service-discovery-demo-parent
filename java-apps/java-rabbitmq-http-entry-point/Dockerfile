FROM openjdk:8-jdk-slim
EXPOSE 8117
COPY target/java-rabbitmq-http-entry-point.jar java-rabbitmq-http-entry-point.jar
COPY start.sh start.sh
RUN chmod +x start.sh
RUN apt-get update
RUN apt-get install wget unzip -y
CMD ./start.sh