# Build
FROM maven:3.6.3-jdk-8-slim AS build
COPY src /java-kafka-http-entry-point/src
COPY pom.xml /java-kafka-http-entry-point
RUN mvn -f /java-kafka-http-entry-point/pom.xml clean install

# Package and launch
FROM openjdk:8-jre-slim
EXPOSE 8113
COPY --from=build /java-kafka-http-entry-point/target/java-kafka-http-entry-point.jar java-kafka-http-entry-point.jar
COPY start-java-kafka-http-entry-point.sh start-java-kafka-http-entry-point.sh
RUN chmod +x start-java-kafka-http-entry-point.sh
RUN apt-get update
RUN apt-get install wget unzip -y
CMD ./start-java-kafka-http-entry-point.sh