package com.project.todo.controller;

import com.project.todo.model.Task;
import com.project.todo.service.TaskService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "*")
public class TaskController {

    private final TaskService service;

    public TaskController(TaskService service) { this.service = service; }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Task create(@RequestBody Task task) {
        return service.create(task);
    }

    @GetMapping
    public List<Task> list() { return service.list(); }

    @GetMapping("/{id}")
    public Task getById(@PathVariable Long id) { return service.findById(id); }

    @GetMapping("/search")
    public List<Task> search(@RequestParam(name = "q", required = false, defaultValue = "") String q) {
        return service.searchByTitle(q);
    }

    @PutMapping("/{id}")
    public Task update(@PathVariable Long id, @RequestBody Task task) { return service.update(id, task); }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) { service.delete(id); }

    @PostMapping("/{id}/action/{actionName}")
    public Task action(@PathVariable Long id, @PathVariable String actionName) { return service.applyAction(id, actionName); }
}
