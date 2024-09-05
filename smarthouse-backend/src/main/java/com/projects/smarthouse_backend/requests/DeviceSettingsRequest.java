package com.projects.smarthouse_backend.requests;

import lombok.Data;

@Data
public class DeviceSettingsRequest {
    private String type;
    private int brightness;
    private int temperature;
}
