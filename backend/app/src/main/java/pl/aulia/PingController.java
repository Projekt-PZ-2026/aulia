package pl.aulia;

import java.time.Instant;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(originPatterns = "http://localhost:*")
class PingController {

  @GetMapping("/api/ping")
  Ping ping() {
    return new Ping("ok", Instant.now());
  }

  record Ping(String status, Instant time) {}
}
