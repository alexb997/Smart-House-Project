package com.projects.smarthouse_backend.service;

import com.projects.smarthouse_backend.model.Device;
import com.projects.smarthouse_backend.repository.DeviceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DeviceService {

    @Autowired
    private DeviceRepository deviceRepository;

    public List<Device> getAllDevices() {
        return deviceRepository.findAll();
    }

    public ResponseEntity<Device> getDeviceById(Long id) {
        Device device = deviceRepository.findById(id).orElse(null);
        return device != null ? ResponseEntity.ok(device) : ResponseEntity.notFound().build();
    }

    public Device createDevice(Device device) {
        return deviceRepository.save(device);
    }

    public ResponseEntity<Device> updateDevice(Long id, Device deviceDetails) {
        Device device = deviceRepository.findById(id).orElse(null);
        if (device == null) {
            return ResponseEntity.notFound().build();
        }
        device.setName(deviceDetails.getName());
        device.setType(deviceDetails.getType());
        device.setStatus(deviceDetails.getStatus());
        device.setState(deviceDetails.getState());
        device.setRoom(deviceDetails.getRoom());
        return ResponseEntity.ok(deviceRepository.save(device));
    }

    public ResponseEntity<Void> deleteDevice(Long id) {
        Device device = deviceRepository.findById(id).orElse(null);
        if (device == null) {
            return ResponseEntity.notFound().build();
        }
        deviceRepository.delete(device);
        return ResponseEntity.noContent().build();
    }
}
