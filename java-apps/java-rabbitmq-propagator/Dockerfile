# Build
FROM maven:3.6.3-jdk-8-slim AS build
COPY src /java-rabbitmq-propagator/src
COPY pom.xml /java-rabbitmq-propagator
RUN mvn -f /java-rabbitmq-propagator/pom.xml clean install

# Package and launch
FROM openjdk:8-jre-slim
EXPOSE 8119
COPY --from=build /java-rabbitmq-propagator/target/java-rabbitmq-propagator.jar java-rabbitmq-propagator.jar
COPY start-java-rabbitmq-propagator.sh start-java-rabbitmq-propagator.sh
RUN chmod +x start-java-rabbitmq-propagator.sh
RUN apt-get update
RUN apt-get install wget unzip -y
CMD ./start-java-rabbitmq-propagator.sh