# Build
FROM maven:3.6.3-jdk-8-slim AS build
COPY src /bank-storage/src
COPY pom.xml /bank-storage
RUN mvn -f /bank-storage/pom.xml clean install

# Package and launch
FROM openjdk:8-jre-slim
EXPOSE 8112
COPY --from=build /bank-storage/target/bank-storage.jar bank-storage.jar
COPY start-storage.sh start-storage.sh
RUN chmod +x start-storage.sh
RUN apt-get update
RUN apt-get install wget unzip -y
CMD ./start-storage.sh