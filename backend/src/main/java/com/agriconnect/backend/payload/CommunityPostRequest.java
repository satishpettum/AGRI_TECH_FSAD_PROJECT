package com.agriconnect.backend.payload;

import jakarta.validation.constraints.NotBlank;

public class CommunityPostRequest {

    @NotBlank
    private String title;

    @NotBlank
    private String category;

    @NotBlank
    private String content;

    public CommunityPostRequest() {
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
