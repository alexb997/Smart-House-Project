package com.projects.smarthouse_backend.controller;

import com.projects.smarthouse_backend.model.Device;
import com.projects.smarthouse_backend.model.DeviceType;
import com.projects.smarthouse_backend.service.DeviceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/devices")
public class DeviceController {

    @Autowired
    private DeviceService deviceService;

    @GetMapping
    public List<Device> getAllDevices() {
        return deviceService.getAllDevices();
    }

    @GetMapping("/{deviceId}")
    public ResponseEntity<Device> getDeviceById(@PathVariable Long deviceId) {
        Optional<Device> device = deviceService.getDeviceById(deviceId);
        return device.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/type/{type}")
    public List<Device> getDevicesByType(@PathVariable DeviceType type) {
        return deviceService.getDevicesByType(type);
    }

    @PostMapping
    public Device createDevice(@RequestBody Device device) {
        return deviceService.saveDevice(device);
    }

    @PutMapping("/{deviceId}")
    public ResponseEntity<Device> updateDevice(@PathVariable Long deviceId, @RequestBody Device device) {
        if (deviceService.getDeviceById(deviceId).isPresent()) {
            device.setId(deviceId);
            return ResponseEntity.ok(deviceService.saveDevice(device));
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{deviceId}/control")
    public ResponseEntity<Device> controlDevice(@PathVariable Long deviceId, @RequestBody Map<String, Boolean> action) {
        Optional<Device> optionalDevice = deviceService.getDeviceById(deviceId);

        if (optionalDevice.isPresent()) {
            Device device = optionalDevice.get();
            Boolean turnOn = action.get("status");

            if (turnOn != null) {
                device.setStatus(turnOn);
                Device updatedDevice = deviceService.saveDevice(device);
                return ResponseEntity.ok(updatedDevice);
            } else {
                return ResponseEntity.badRequest().build();
            }
        } else {
            return ResponseEntity.notFound().build(); // If device not found
        }
    }


    @DeleteMapping("/{deviceId}")
    public ResponseEntity<Void> deleteDevice(@PathVariable Long deviceId) {
        if (deviceService.getDeviceById(deviceId).isPresent()) {
            deviceService.deleteDevice(deviceId);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
