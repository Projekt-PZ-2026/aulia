package pl.aulia.communication;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
class FamilyAnnouncementController {

  private final AnnouncementRepository announcements;

  FamilyAnnouncementController(AnnouncementRepository announcements) {
    this.announcements = announcements;
  }

  @GetMapping("/api/family/announcement")
  ResponseEntity<Announcement> latest() {
    return announcements
        .findLatest()
        .map(ResponseEntity::ok)
        .orElse(ResponseEntity.noContent().build());
  }
}
