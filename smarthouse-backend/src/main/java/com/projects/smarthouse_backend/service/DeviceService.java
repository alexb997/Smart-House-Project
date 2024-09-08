package com.projects.smarthouse_backend.service;

import com.projects.smarthouse_backend.model.Device;
import com.projects.smarthouse_backend.repository.DeviceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DeviceService {

    @Autowired
    private DeviceRepository deviceRepository;

    public List<Device> getAllDevices() {
        return deviceRepository.findAll();
    }

    public Optional<Device> getDeviceById(Long id) {
        return deviceRepository.findById(id);
    }

    public Device createDevice(Device device) {
        return deviceRepository.save(device);
    }

    public Device updateDevice(Long id, Device deviceDetails) {
        Device device = deviceRepository.findById(id).orElseThrow(() -> new RuntimeException("Device not found with id: " + id));
        device.setName(deviceDetails.getName());
        device.setStatus(deviceDetails.getStatus());
        device.setState(deviceDetails.getState());
        device.setRoom(deviceDetails.getRoom());
        device.setOwner(deviceDetails.getOwner());
        device.setType(deviceDetails.getType());
        return deviceRepository.save(device);
    }

    public void deleteDevice(Long id) {
        deviceRepository.deleteById(id);
    }
}
