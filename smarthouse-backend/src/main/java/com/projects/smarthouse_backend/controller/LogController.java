package com.projects.smarthouse_backend.controller;

import com.projects.smarthouse_backend.model.Device;
import com.projects.smarthouse_backend.model.Log;
import com.projects.smarthouse_backend.service.LogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/logs")
public class LogController {
    @Autowired
    private LogService logService;

    @GetMapping
    public List<Log> getAllLogs() {
        return logService.getAllLogs();
    }

    @GetMapping("/{username}")
    public List<Log> getAllLogsByUsername(@PathVariable String username) {
        return logService.getLogsByUsername(username);
    }

    @PostMapping
    public Log createLog(@RequestBody Log log){
      return logService.saveLog(log);
    };

    @DeleteMapping("/{id}")
    public void deleteLog(@PathVariable Long id){
        logService.deleteLog(id);
    };
}
