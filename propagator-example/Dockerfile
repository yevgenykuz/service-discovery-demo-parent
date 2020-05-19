FROM openjdk:8-jdk-slim
EXPOSE 8182
COPY target/propagator-example-1.0.0-SNAPSHOT.jar propagator-example-1.0.0-SNAPSHOT.jar
COPY start.sh start.sh
RUN chmod +x start.sh
RUN apt-get update
RUN apt-get install wget unzip -y
CMD ./start.sh