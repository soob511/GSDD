FROM openjdk:11
WORKDIR /var/jenkins_home/workspace/GSDD/backend/gsdd/
ARG JAR_FILE=build/libs/*.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
EXPOSE 8080
