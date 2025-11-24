package com.project.repository;


import ch.qos.logback.core.status.Status;
import com.project.model.Task;
import jakarta.annotation.Priority;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByTitleContainingIgnoreCase(String title);
    List<Task> findByPriority(Priority priority);
    List<Task> findByStatus(Status status);
}
