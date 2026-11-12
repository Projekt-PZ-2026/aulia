package pl.aulia.communication;

import java.time.Instant;

record Announcement(long id, String text, Instant createdAt) {}
