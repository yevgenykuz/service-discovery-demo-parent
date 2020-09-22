FROM openjdk:8-jdk-slim
EXPOSE 8181
COPY target/java-http-entry-point.jar java-http-entry-point.jar
COPY start.sh start.sh
RUN chmod +x start.sh
RUN apt-get update
RUN apt-get install wget unzip -y
CMD ./start.sh