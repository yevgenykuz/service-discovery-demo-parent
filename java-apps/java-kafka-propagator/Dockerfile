# Build
FROM maven:3.6.3-jdk-8-slim AS build
COPY src /java-kafka-propagator/src
COPY pom.xml /java-kafka-propagator
RUN mvn -f /java-kafka-propagator/pom.xml clean install

# Package and launch
FROM openjdk:8-jre-slim
EXPOSE 8115
COPY --from=build /java-kafka-propagator/target/java-kafka-propagator.jar java-kafka-propagator.jar
COPY start-java-kafka-propagator.sh start-java-kafka-propagator.sh
RUN chmod +x start-java-kafka-propagator.sh
RUN apt-get update
RUN apt-get install wget unzip -y
CMD ./start-java-kafka-propagator.sh