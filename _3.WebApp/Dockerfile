# Use an appropriate base image with Java (e.g., OpenJDK)
FROM openjdk:21-jdk-slim

# Set the working directory within the container
WORKDIR /app

# Copy the Spring Boot application JAR file into the container
COPY target/pv125.jar app.jar

# Expose the port your Spring Boot application listens on
EXPOSE 8080

# Define the command to run your Spring Boot application
CMD ["java", "-jar", "app.jar"]
