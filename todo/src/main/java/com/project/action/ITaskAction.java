package com.project.todo.action;

import com.project.todo.model.Task;

public interface ITaskAction {
    String getName();
    Task execute(Task task);
}
