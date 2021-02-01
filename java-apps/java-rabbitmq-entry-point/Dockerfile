# Build
FROM maven:3.6.3-jdk-8-slim AS build
COPY src /java-rabbitmq-entry-point/src
COPY pom.xml /java-rabbitmq-entry-point
RUN mvn -f /java-rabbitmq-entry-point/pom.xml clean install

# Package and launch
FROM openjdk:8-jre-slim
EXPOSE 8118
COPY --from=build /java-rabbitmq-entry-point/target/java-rabbitmq-entry-point.jar java-rabbitmq-entry-point.jar
COPY start-java-rabbitmq-entry-point.sh start-java-rabbitmq-entry-point.sh
RUN chmod +x start-java-rabbitmq-entry-point.sh
RUN apt-get update
RUN apt-get install wget unzip -y
CMD ./start-java-rabbitmq-entry-point.sh