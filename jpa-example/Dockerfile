FROM openjdk:8-jdk-slim
EXPOSE 8183
COPY target/jpa-example-1.0.0-SNAPSHOT.jar jpa-example-1.0.0-SNAPSHOT.jar
COPY start.sh start.sh
RUN chmod +x start.sh
RUN apt-get update
RUN apt-get install wget unzip -y
CMD ./start.sh