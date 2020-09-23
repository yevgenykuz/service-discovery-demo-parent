FROM openjdk:8-jdk-slim
EXPOSE 8113
COPY target/java-http-sink.jar java-http-sink.jar
COPY start.sh start.sh
RUN chmod +x start.sh
RUN apt-get update
RUN apt-get install wget unzip -y
CMD ./start.sh