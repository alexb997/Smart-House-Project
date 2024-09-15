package com.projects.smarthouse_backend.repository;

import com.projects.smarthouse_backend.model.Device;
import com.projects.smarthouse_backend.model.DeviceType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DeviceRepository extends JpaRepository<Device, Long> {

    List<Device> findByType(DeviceType type);
    List<Device> findByRoomId(Long roomId);

    Optional<Device> findByName(String newDevice);
}
