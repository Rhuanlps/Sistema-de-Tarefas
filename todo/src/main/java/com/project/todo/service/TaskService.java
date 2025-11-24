package com.project.todo.service;

import com.project.todo.action.ITaskAction;
import com.project.todo.model.Task;
import com.project.todo.repository.TaskRepository;
import com.project.todo.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
public class TaskService {

    private final TaskRepository repository;
    private final List<ITaskAction> actions;

    public TaskService(TaskRepository repository, List<ITaskAction> actions) {
        this.repository = repository;
        this.actions = actions;
    }

    public Task create(Task task) {
        return repository.save(task);
    }

    public List<Task> list() {
        return repository.findAll();
    }

    public Task findById(Long id) {
        return repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Task not found with id " + id));
    }

    public List<Task> searchByTitle(String q) {
        if (q == null || q.isBlank()) return list();
        return repository.findByTitleContainingIgnoreCase(q);
    }

    public Task update(Long id, Task update) {
        Task existing = findById(id);
        existing.setTitle(update.getTitle());
        existing.setDescription(update.getDescription());
        existing.setDueDate(update.getDueDate());
        existing.setPriority(update.getPriority());
        existing.setStatus(update.getStatus());
        return repository.save(existing);
    }

    public void delete(Long id) {
        Task existing = findById(id);
        repository.delete(existing);
    }

    public Task applyAction(Long id, String actionName) {
        Task task = findById(id);
        ITaskAction action = actions.stream()
                .filter(a -> a.getName().equalsIgnoreCase(actionName))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Action '" + actionName + "' not found"));
        action.execute(task);
        return repository.save(task);
    }
}
