package com.projects.smarthouse_backend.service;

import com.projects.smarthouse_backend.model.Device;
import com.projects.smarthouse_backend.model.DeviceType;
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

    public List<Device> getDevicesByType(DeviceType type) {
        return deviceRepository.findByType(type);
    }

    public List<Device> getDevicesByRoomId(Long roomId) {
        return deviceRepository.findByRoomId(roomId);
    }

    public Device saveDevice(Device device) {

        return deviceRepository.save(device);
    }

    public Device updateDevice(Device device) {
        return deviceRepository.save(device);
    }

    public void deleteDevice(Long id) {
        deviceRepository.deleteById(id);
    }
}
