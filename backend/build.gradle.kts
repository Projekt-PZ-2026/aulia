plugins {
    alias(libs.plugins.spotless)
}

spotless {
    java {
        target("**/src/**/*.java")
        googleJavaFormat()
    }
}
