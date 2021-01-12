FROM openjdk:8-jdk-slim
EXPOSE 8111
COPY target/bank-analysis.jar bank-analysis.jar
COPY start-analysis.sh start-analysis.sh
RUN chmod +x start-analysis.sh
RUN apt-get update
RUN apt-get install wget unzip -y
CMD ./start-analysis.sh