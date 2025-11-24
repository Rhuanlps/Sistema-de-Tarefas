package com.project.action;


import com.project.model.Task;

public interface ITaskAction {
    String getName();
    Task execute(Task task);
}
