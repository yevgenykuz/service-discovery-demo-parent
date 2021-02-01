# Build
FROM maven:3.6.3-jdk-8-slim AS build
COPY src /java-rabbitmq-http-entry-point/src
COPY pom.xml /java-rabbitmq-http-entry-point
RUN mvn -f /java-rabbitmq-http-entry-point/pom.xml clean install

# Package and launch
FROM openjdk:8-jre-slim
EXPOSE 8117
COPY --from=build /java-rabbitmq-http-entry-point/target/java-rabbitmq-http-entry-point.jar java-rabbitmq-http-entry-point.jar
COPY start-java-rabbitmq-http-entry-point.sh start-java-rabbitmq-http-entry-point.sh
RUN chmod +x start-java-rabbitmq-http-entry-point.sh
RUN apt-get update
RUN apt-get install wget unzip -y
CMD ./start-java-rabbitmq-http-entry-point.sh