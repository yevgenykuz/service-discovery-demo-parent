FROM openjdk:8-jdk-slim
EXPOSE 8113
COPY target/bank-storage.jar bank-storage.jar
COPY start-storage.sh start-storage.sh
RUN chmod +x start-storage.sh
RUN apt-get update
RUN apt-get install wget unzip -y
CMD ./start-storage.sh