package com.agriconnect.backend.payload;

import jakarta.validation.constraints.NotBlank;

public class TaskRequest {
    @NotBlank
    private String title;

    private boolean isCompleted;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public boolean isCompleted() {
        return isCompleted;
    }

    public void setCompleted(boolean completed) {
        isCompleted = completed;
    }
}
