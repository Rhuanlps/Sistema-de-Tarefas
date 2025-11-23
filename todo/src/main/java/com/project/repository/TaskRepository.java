package com.project.todo.repository;

import com.project.todo.model.Task;
import com.project.todo.model.Task.Priority;
import com.project.todo.model.Task.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByTitleContainingIgnoreCase(String title);
    List<Task> findByPriority(Priority priority);
    List<Task> findByStatus(Status status);
}
