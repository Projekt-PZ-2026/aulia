package pl.aulia.communication;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
class StaffAnnouncementController {

  private static final int MAX_LENGTH = 500;

  private final AnnouncementRepository announcements;

  StaffAnnouncementController(AnnouncementRepository announcements) {
    this.announcements = announcements;
  }

  @PutMapping("/api/staff/announcement")
  Announcement save(@RequestBody SaveAnnouncementRequest request) {
    String text = request.text();
    if (text == null || text.isBlank() || text.length() > MAX_LENGTH) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
    }
    return announcements.save(text);
  }

  record SaveAnnouncementRequest(String text) {}
}
