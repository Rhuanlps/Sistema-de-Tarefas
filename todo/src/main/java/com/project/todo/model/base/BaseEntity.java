package com.project.todo.model.base;

import jakarta.persistence.*;
import java.time.OffsetDateTime;

@MappedSuperclass
public abstract class BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Long id;

    @Column(nullable = false)
    protected OffsetDateTime createdAt = OffsetDateTime.now();

    @Column(nullable = false)
    protected OffsetDateTime updatedAt = OffsetDateTime.now();

    @PrePersist
    protected void onCreate() {
        createdAt = OffsetDateTime.now();
        updatedAt = createdAt;
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = OffsetDateTime.now();
    }

    public Long getId() { return id; }
    public OffsetDateTime getCreatedAt() { return createdAt; }
    public OffsetDateTime getUpdatedAt() { return updatedAt; }

    // Utility method for overriding (demonstrates polymorphism potential)
    public String summary() {
        return "Entity(id=" + id + ", createdAt=" + createdAt + ")";
    }
}
