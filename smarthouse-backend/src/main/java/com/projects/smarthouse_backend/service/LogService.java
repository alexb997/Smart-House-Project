package com.projects.smarthouse_backend.service;

import com.projects.smarthouse_backend.model.Log;
import com.projects.smarthouse_backend.repository.LogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


@Service
public class LogService {
    @Autowired
    private LogRepository logRepository;

    public Page<Log> getAllLogs(Pageable pageable) {
        return logRepository.findAll(pageable);
    }

    public Page<Log> getLogsByUsername(String username, Pageable pageable) {
        return logRepository.findByUsernameOrderByDateDesc(username, pageable);
    }

    public Log saveLog(Log log) {
        return logRepository.save(log);
    }

    public void deleteLog(Long id) {
        logRepository.deleteById(id);
    }
}
