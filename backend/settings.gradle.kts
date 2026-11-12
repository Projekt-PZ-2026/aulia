rootProject.name = "aulia"

include("core:identity")
include("core:organization")
include("core:schedule")
include("core:attendance")
include("core:assessment")
include("core:communication")
include("core:audit")
include("core:notifications")
include("app")

dependencyResolutionManagement {
    repositories {
        mavenCentral()
    }
}
