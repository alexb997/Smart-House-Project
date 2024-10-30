package com.projects.smarthouse_backend.service;

import com.projects.smarthouse_backend.model.Log;
import com.projects.smarthouse_backend.repository.LogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LogService {
    @Autowired
    private LogRepository logRepository;

    public List<Log> getAllLogs() {
        return logRepository.findAll();
    }

    public List<Log> getLogsByUsername(String username) {
        return logRepository.findByUsername(username);
    }

    public Log saveLog(Log log) {
        return logRepository.save(log);
    }

    public void deleteLog(Long id) {
        logRepository.deleteById(id);
    }
}
