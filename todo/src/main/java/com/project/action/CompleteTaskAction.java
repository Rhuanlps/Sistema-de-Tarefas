package com.project.action;

import com.project.model.Task;
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
