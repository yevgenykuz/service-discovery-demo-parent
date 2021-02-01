# Build
FROM maven:3.6.3-jdk-8-slim AS build
COPY src /java-rabbitmq-sink/src
COPY pom.xml /java-rabbitmq-sink
RUN mvn -f /java-rabbitmq-sink/pom.xml clean install

# Package and launch
FROM openjdk:8-jre-slim
EXPOSE 8120
COPY --from=build /java-rabbitmq-sink/target/java-rabbitmq-sink.jar java-rabbitmq-sink.jar
COPY start-java-rabbitmq-sink.sh start-java-rabbitmq-sink.sh
RUN chmod +x start-java-rabbitmq-sink.sh
RUN apt-get update
RUN apt-get install wget unzip -y
CMD ./start-java-rabbitmq-sink.sh