FROM openjdk:8-jdk-slim
EXPOSE 9110
COPY target/kotlin-http-middleman.jar kotlin-http-middleman.jar
COPY start.sh start.sh
RUN chmod +x start.sh
#RUN apt-get update
#RUN apt-get install wget unzip -y
CMD ./start.sh