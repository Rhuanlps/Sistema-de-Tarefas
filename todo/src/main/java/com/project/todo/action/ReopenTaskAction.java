package com.project.todo.action;


import com.project.todo.model.Task;
import org.springframework.stereotype.Component;

@Component
public class ReopenTaskAction implements ITaskAction {

    @Override
    public String getName() { return "reopen"; }

    @Override
    public Task execute(Task task) {
        task.setStatus(Task.Status.PENDING);
        return task;
    }
}
