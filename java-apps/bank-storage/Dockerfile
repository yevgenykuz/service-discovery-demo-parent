FROM openjdk:8-jdk-slim
EXPOSE 8113
COPY target/bank-storage.jar bank-storage.jar
COPY start.sh start.sh
RUN chmod +x start.sh
RUN apt-get update
RUN apt-get install wget unzip -y
CMD ./start.sh