package com.projects.smarthouse_backend.controller;

import com.projects.smarthouse_backend.model.Device;
import com.projects.smarthouse_backend.model.DeviceType;
import com.projects.smarthouse_backend.model.Room;
import com.projects.smarthouse_backend.model.User;
import com.projects.smarthouse_backend.service.DeviceService;
import com.projects.smarthouse_backend.service.RoomService;
import com.projects.smarthouse_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/devices")
public class DeviceController {

    @Autowired
    private DeviceService deviceService;
    @Autowired
    private RoomService roomService;
    @Autowired
    private UserService userService;

    private Device getDeviceOrThrow(Long deviceId) {
        return deviceService.getDeviceById(deviceId)
                .orElseThrow(() -> new RuntimeException("Device not found: " + deviceId));
    }

    private Room getRoomOrThrow(Long roomId) {
        return roomService.getRoomById(roomId)
                .orElseThrow(() -> new RuntimeException("Room not found: " + roomId));
    }

    private User getUserOrThrow(Long userId) {
        return userService.getUserById(userId)
                .orElseThrow(() -> new RuntimeException("User not found: " + userId));
    }

    @GetMapping
    public List<Device> getAllDevices() {
        return deviceService.getAllDevices();
    }

    @GetMapping("/{deviceId}")
    public ResponseEntity<Device> getDeviceById(@PathVariable Long deviceId) {
        return ResponseEntity.ok(getDeviceOrThrow(deviceId));
    }

    @GetMapping("/type/{type}")
    public List<Device> getDevicesByType(@PathVariable DeviceType type) {
        return deviceService.getDevicesByType(type);
    }

    @PostMapping
    public ResponseEntity<Device> createDevice(@RequestBody Map<String, Object> requestData) {
        Map<String, Object> deviceData = (Map<String, Object>) requestData.get("device");

        String name = deviceData.get("name").toString();
        String typeString = deviceData.get("type").toString();
        boolean status = Boolean.parseBoolean(deviceData.get("status").toString());
        Integer brightness = deviceData.get("brightness") != null ? Integer.valueOf(deviceData.get("brightness").toString()) : null;
        Integer temperature = deviceData.get("temperature") != null ? Integer.valueOf(deviceData.get("temperature").toString()) : null;

        Long roomId = Long.valueOf(requestData.get("roomId").toString());
        Long userId = Long.valueOf(requestData.get("userId").toString());

        DeviceType type = DeviceType.valueOf(typeString);

        Device device = new Device();
        device.setName(name);
        device.setType(type);
        device.setStatus(status);
        device.setBrightness(brightness);
        device.setTemperature(temperature);

        Room room = roomService.getRoomById(roomId)
                .orElseThrow(() -> new RuntimeException("Room not found " + roomId));

        User user = userService.getUserById(userId)
                .orElseThrow(() -> new RuntimeException("User not found " + userId));

        device.setRoom(room);
        device.setUser(user);

        Device savedDevice = deviceService.saveDevice(device);
        return ResponseEntity.ok(savedDevice);
    }

    @PutMapping("/{deviceId}")
    public ResponseEntity<Device> updateDevice(@PathVariable Long deviceId, @RequestBody Map<String, Object> updates) {
        Device existingDevice = getDeviceOrThrow(deviceId);

        updates.forEach((key, value) -> {
            switch (key) {
                case "name" -> existingDevice.setName(value.toString());
                case "type" -> existingDevice.setType(DeviceType.valueOf(value.toString()));
                case "status" -> existingDevice.setStatus(Boolean.parseBoolean(value.toString()));
                case "brightness" -> existingDevice.setBrightness(Integer.valueOf(value.toString()));
                case "temperature" -> existingDevice.setTemperature(Integer.valueOf(value.toString()));
            }
        });

        Device savedDevice = deviceService.updateDevice(existingDevice);
        return ResponseEntity.ok(savedDevice);
    }

    @PostMapping("/{deviceId}/assign-room/{roomId}")
    public ResponseEntity<Device> assignDeviceToRoom(@PathVariable Long deviceId, @PathVariable Long roomId) {
        Device device = getDeviceOrThrow(deviceId);
        device.setRoom(getRoomOrThrow(roomId));

        Device updatedDevice = deviceService.updateDevice(device);
        return ResponseEntity.ok(updatedDevice);
    }

    @PutMapping("/{deviceId}/control")
    public ResponseEntity<Device> controlDevice(@PathVariable Long deviceId, @RequestBody Map<String, Boolean> action) {
        Boolean turnOn = action.get("status");
        if (turnOn == null) {
            return ResponseEntity.badRequest().build();
        }

        Device device = getDeviceOrThrow(deviceId);
        device.setStatus(turnOn);

        Device updatedDevice = deviceService.updateDevice(device);
        return ResponseEntity.ok(updatedDevice);
    }

    @DeleteMapping("/{deviceId}")
    public ResponseEntity<Void> deleteDevice(@PathVariable Long deviceId) {
        getDeviceOrThrow(deviceId);
        deviceService.deleteDevice(deviceId);
        return ResponseEntity.noContent().build();
    }
}
