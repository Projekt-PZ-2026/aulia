package pl.aulia;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.testcontainers.service.connection.ServiceConnection;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.test.web.servlet.assertj.MockMvcTester;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;
import org.testcontainers.postgresql.PostgreSQLContainer;

@SpringBootTest
@AutoConfigureMockMvc
@Testcontainers
class AnnouncementTests {

  @Container @ServiceConnection
  static PostgreSQLContainer postgres = new PostgreSQLContainer("postgres:18.6-alpine");

  @Autowired MockMvcTester mvc;

  @Autowired JdbcClient jdbc;

  @BeforeEach
  void clearAnnouncements() {
    jdbc.sql("delete from announcement").update();
  }

  @Test
  void familySeesLatestAnnouncementFromStaff() {
    save("Jutro wycieczka do muzeum");
    save("Wycieczka przeniesiona na piątek");

    assertThat(mvc.get().uri("/api/family/announcement"))
        .hasStatusOk()
        .bodyJson()
        .extractingPath("$.text")
        .isEqualTo("Wycieczka przeniesiona na piątek");
  }

  @Test
  void returnsNoContentWhenThereIsNoAnnouncement() {
    assertThat(mvc.get().uri("/api/family/announcement")).hasStatus(HttpStatus.NO_CONTENT);
  }

  @Test
  void rejectsEmptyText() {
    assertThat(
            mvc.put()
                .uri("/api/staff/announcement")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"text\": \"  \"}"))
        .hasStatus(HttpStatus.BAD_REQUEST);
  }

  private void save(String text) {
    assertThat(
            mvc.put()
                .uri("/api/staff/announcement")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"text\": \"" + text + "\"}"))
        .hasStatusOk();
  }
}
