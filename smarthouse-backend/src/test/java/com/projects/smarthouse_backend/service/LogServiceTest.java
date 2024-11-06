package com.projects.smarthouse_backend.service;

import com.projects.smarthouse_backend.model.Log;
import com.projects.smarthouse_backend.repository.LogRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class LogServiceTest {

    @Mock
    private LogRepository logRepository;

    @InjectMocks
    private LogService logService;

    private Log log1;
    private Log log2;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        log1 = new Log();
        log1.setId(1L);
        log1.setUsername("user1");
        log1.setDeviceName("Thermostat");

        log2 = new Log();
        log2.setId(2L);
        log2.setUsername("user2");
        log2.setDeviceName("Smart Light");
    }

    @Test
    void testGetAllLogs() {
        Pageable pageable = PageRequest.of(0, 10);
        Page<Log> page = new PageImpl<>(Arrays.asList(log1, log2));

        when(logRepository.findAll(pageable)).thenReturn(page);

        Page<Log> result = logService.getAllLogs(pageable);

        assertEquals(2, result.getContent().size());
        assertTrue(result.getContent().contains(log1));
        assertTrue(result.getContent().contains(log2));
    }

    @Test
    void testGetLogsByUsername() {
        Pageable pageable = PageRequest.of(0, 10);
        Page<Log> page = new PageImpl<>(Arrays.asList(log1));

        when(logRepository.findByUsernameOrderByDateDesc("user1", pageable)).thenReturn(page);

        Page<Log> result = logService.getLogsByUsername("user1", pageable);

        assertEquals(1, result.getContent().size());
        assertEquals("user1", result.getContent().get(0).getUsername());
    }

    @Test
    void testSaveLog() {
        when(logRepository.save(log1)).thenReturn(log1);

        Log savedLog = logService.saveLog(log1);

        assertNotNull(savedLog);
        assertEquals(log1.getId(), savedLog.getId());
        verify(logRepository, times(1)).save(log1);
    }

    @Test
    void testDeleteLog() {
        Long logId = 1L;

        logService.deleteLog(logId);

        verify(logRepository, times(1)).deleteById(logId);
    }
}
