# Build
FROM maven:3.6.3-jdk-8-slim AS build
COPY src /bank-gateway/src
COPY pom.xml /bank-gateway
ADD ../pom.xml /
RUN mvn -f /bank-gateway/pom.xml clean install

# Package and launch
FROM openjdk:8-jre-slim
EXPOSE 8110
COPY --from=build /bank-gateway/target/bank-gateway.jar bank-gateway.jar
COPY start-gateway.sh start-gateway.sh
RUN chmod +x start-gateway.sh
RUN apt-get update
RUN apt-get install wget unzip -y
CMD ./start-gateway.sh