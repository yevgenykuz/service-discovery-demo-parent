# Build
FROM maven:3.6.3-jdk-8-slim AS build
COPY src /java-kafka-sink/src
COPY pom.xml /java-kafka-sink
RUN mvn -f /java-kafka-sink/pom.xml clean install

# Package and launch
FROM openjdk:8-jre-slim
EXPOSE 8116
COPY --from=build /java-kafka-sink/target/java-kafka-sink.jar java-kafka-sink.jar
COPY start-java-kafka-sink.sh start-java-kafka-sink.sh
RUN chmod +x start-java-kafka-sink.sh
RUN apt-get update
RUN apt-get install wget unzip -y
CMD ./start-java-kafka-sink.sh