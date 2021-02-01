# Build
FROM maven:3.6.3-jdk-8-slim AS build
COPY src /bank-analysis/src
COPY pom.xml /bank-analysis
RUN mvn -f /bank-analysis/pom.xml clean install

# Package and launch
FROM openjdk:8-jre-slim
EXPOSE 8111
COPY --from=build /bank-analysis/target/bank-analysis.jar bank-analysis.jar
COPY start-analysis.sh start-analysis.sh
RUN chmod +x start-analysis.sh
RUN apt-get update
RUN apt-get install wget unzip -y
CMD ./start-analysis.sh