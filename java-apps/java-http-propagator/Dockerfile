FROM openjdk:8-jdk-slim
EXPOSE 8182
COPY target/java-http-propagator.jar java-http-propagator.jar
COPY start.sh start.sh
RUN chmod +x start.sh
RUN apt-get update
RUN apt-get install wget unzip -y
CMD ./start.sh