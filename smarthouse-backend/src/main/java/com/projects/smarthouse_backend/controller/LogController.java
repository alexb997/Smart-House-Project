package com.projects.smarthouse_backend.controller;

import com.projects.smarthouse_backend.model.Log;
import com.projects.smarthouse_backend.service.LogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

@RestController
@RequestMapping("/api/logs")
public class LogController {

    @Autowired
    private LogService logService;

    @GetMapping
    public Page<Log> getAllLogs(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return logService.getAllLogs(pageable);
    }

    @GetMapping("/{username}")
    public Page<Log> getAllLogsByUsername(
            @PathVariable String username,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return logService.getLogsByUsername(username, pageable);
    }

    @PostMapping
    public Log createLog(@RequestBody Log log) {
        return logService.saveLog(log);
    }

    @DeleteMapping("/{id}")
    public void deleteLog(@PathVariable Long id) {
        logService.deleteLog(id);
    }
}
