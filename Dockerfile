FROM openjdk:16-jdk-alpine
# Build target folder
ADD target/datum-3.0.0-SNAPSHOT.jar datum-3.0.0-SNAPSHOT.jar
ENTRYPOINT ["java", "-jar", "datum-3.0.0-SNAPSHOT.jar"]