# Build
FROM maven:3.6.3-jdk-8-slim AS build
COPY src /java-kafka-entry-point/src
COPY pom.xml /java-kafka-entry-point
RUN mvn -f /java-kafka-entry-point/pom.xml clean install

# Package and launch
FROM openjdk:8-jre-slim
EXPOSE 8114
COPY --from=build /java-kafka-entry-point/target/java-kafka-entry-point.jar java-kafka-entry-point.jar
COPY start-java-kafka-entry-point.sh start-java-kafka-entry-point.sh
RUN chmod +x start-java-kafka-entry-point.sh
RUN apt-get update
RUN apt-get install wget unzip -y
CMD ./start-java-kafka-entry-point.sh