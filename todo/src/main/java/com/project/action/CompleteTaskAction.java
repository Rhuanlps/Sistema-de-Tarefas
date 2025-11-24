package com.project.todo.action;

import com.project.todo.model.Task;
import org.springframework.stereotype.Component;

@Component
public class CompleteTaskAction implements ITaskAction {

    @Override
    public String getName() { return "complete"; }

    @Override
    public Task execute(Task task) {
        task.setStatus(Task.Status.DONE);
        return task;
    }
}
