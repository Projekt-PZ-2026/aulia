plugins {
    java
    alias(libs.plugins.spring.boot)
}

java {
    toolchain {
        languageVersion = JavaLanguageVersion.of(25)
    }
}

dependencies {
    implementation(platform(libs.spring.boot.dependencies))
    implementation(platform(libs.spring.modulith.bom))

    implementation(project(":core:identity"))
    implementation(project(":core:organization"))
    implementation(project(":core:schedule"))
    implementation(project(":core:attendance"))
    implementation(project(":core:assessment"))
    implementation(project(":core:communication"))
    implementation(project(":core:audit"))
    implementation(project(":core:notifications"))
    implementation(project(":pl"))

    implementation(libs.spring.boot.starter.webmvc)
    implementation(libs.spring.modulith.starter.core)

    testImplementation(libs.spring.boot.starter.webmvc.test)
    testImplementation(libs.spring.modulith.starter.test)
    testRuntimeOnly(libs.junit.platform.launcher)
}

tasks.withType<Test> {
    useJUnitPlatform()
}
