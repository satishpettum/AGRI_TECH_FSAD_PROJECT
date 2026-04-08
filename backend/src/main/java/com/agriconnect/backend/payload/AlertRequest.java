package com.agriconnect.backend.payload;

import jakarta.validation.constraints.NotBlank;

public class AlertRequest {
    @NotBlank
    private String type;

    @NotBlank
    private String title;

    @NotBlank
    private String description;

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
