FROM openjdk:8-jdk-slim
EXPOSE 8110
COPY target/bank-gateway.jar bank-gateway.jar
COPY start-gateway.sh start-gateway.sh
RUN chmod +x start-gateway.sh
RUN apt-get update
RUN apt-get install wget unzip -y
CMD ./start-gateway.sh