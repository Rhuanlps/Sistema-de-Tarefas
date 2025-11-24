package com.project.action;


import com.project.model.Task;
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
