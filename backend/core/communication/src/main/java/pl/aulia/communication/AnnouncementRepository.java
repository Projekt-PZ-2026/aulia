package pl.aulia.communication;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Optional;
import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;

@Repository
class AnnouncementRepository {

  private final JdbcClient jdbc;

  AnnouncementRepository(JdbcClient jdbc) {
    this.jdbc = jdbc;
  }

  Announcement save(String text) {
    return jdbc.sql("insert into announcement (text) values (:text) returning id, text, created_at")
        .param("text", text)
        .query(this::toAnnouncement)
        .single();
  }

  Optional<Announcement> findLatest() {
    return jdbc.sql("select id, text, created_at from announcement order by id desc limit 1")
        .query(this::toAnnouncement)
        .optional();
  }

  private Announcement toAnnouncement(ResultSet row, int rowNumber) throws SQLException {
    return new Announcement(
        row.getLong("id"), row.getString("text"), row.getTimestamp("created_at").toInstant());
  }
}
