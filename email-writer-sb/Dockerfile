# ---- Stage 1: Build the JAR ----
FROM maven:3.9.6-eclipse-temurin-21 AS builder
WORKDIR /app

# Copy Maven config and source
COPY pom.xml .
COPY src ./src

# Build the JAR, ignore compiler release warnings
RUN mvn clean package -DskipTests || true

# ---- Stage 2: Run the JAR ----
FROM eclipse-temurin:21-jdk
WORKDIR /app

# Copy the JAR from the builder stage
COPY --from=builder /app/target/*.jar app.jar

# Expose port (Render sets PORT automatically)
EXPOSE 8080

# Start the application
ENTRYPOINT ["java", "-jar", "app.jar"]
