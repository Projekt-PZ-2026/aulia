FROM eclipse-temurin:25-jdk AS build
WORKDIR /workspace
COPY backend .
RUN --mount=type=cache,target=/root/.gradle ./gradlew :app:bootJar --no-daemon
RUN java -Djarmode=tools -jar app/build/libs/app.jar extract --layers --launcher --destination extracted

FROM eclipse-temurin:25-jre
RUN useradd --system --uid 10001 aulia
WORKDIR /app
COPY --from=build /workspace/extracted/dependencies/ ./
COPY --from=build /workspace/extracted/spring-boot-loader/ ./
COPY --from=build /workspace/extracted/snapshot-dependencies/ ./
COPY --from=build /workspace/extracted/application/ ./
USER aulia
EXPOSE 8080
ENTRYPOINT ["java", "org.springframework.boot.loader.launch.JarLauncher"]
