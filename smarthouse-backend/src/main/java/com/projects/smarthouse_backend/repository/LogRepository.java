package com.projects.smarthouse_backend.repository;

import com.projects.smarthouse_backend.model.Device;
import com.projects.smarthouse_backend.model.DeviceType;
import com.projects.smarthouse_backend.model.Log;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LogRepository extends JpaRepository<Log, Long> {
    List<Log> findByUsername(String username);
}
