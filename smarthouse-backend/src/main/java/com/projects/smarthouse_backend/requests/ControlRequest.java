package com.projects.smarthouse_backend.requests;

import lombok.Data;

@Data
public class ControlRequest {
    private String action;

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }
}
