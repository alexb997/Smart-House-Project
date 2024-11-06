package com.projects.smarthouse_backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.projects.smarthouse_backend.model.Log;
import com.projects.smarthouse_backend.service.LogService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import java.util.Arrays;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(LogController.class)
class LogControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private LogService logService;

    @Autowired
    private ObjectMapper objectMapper;

    private Log log1;
    private Log log2;

    @BeforeEach
    void setUp() {
        log1 = new Log();
        log1.setId(1L);
        log1.setUsername("user1");
        log1.setDeviceName("Thermostat");
        log1.setMessage("Device activated");
        log1.setDate("2023-11-05");
        log1.setStatus("Online");

        log2 = new Log();
        log2.setId(2L);
        log2.setUsername("user2");
        log2.setDeviceName("Smart Light");
        log2.setMessage("Device turned on");
        log2.setDate("2023-11-05");
        log2.setStatus("Online");
    }

    @Test
    void testGetAllLogs() throws Exception {
        Page<Log> page = new PageImpl<>(Arrays.asList(log1, log2));
        Pageable pageable = PageRequest.of(0, 10);

        when(logService.getAllLogs(pageable)).thenReturn(page);

        mockMvc.perform(get("/api/logs")
                        .param("page", "0")
                        .param("size", "10"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content", hasSize(2)))
                .andExpect(jsonPath("$.content[0].username", is("user1")))
                .andExpect(jsonPath("$.content[1].username", is("user2")));
    }

    @Test
    void testGetAllLogsByUsername() throws Exception {
        Page<Log> page = new PageImpl<>(Arrays.asList(log1));
        Pageable pageable = PageRequest.of(0, 10);

        when(logService.getLogsByUsername("user1", pageable)).thenReturn(page);

        mockMvc.perform(get("/api/logs/user1")
                        .param("page", "0")
                        .param("size", "10"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content", hasSize(1)))
                .andExpect(jsonPath("$.content[0].username", is("user1")));
    }

    @Test
    void testCreateLog() throws Exception {
        when(logService.saveLog(Mockito.any(Log.class))).thenReturn(log1);

        mockMvc.perform(post("/api/logs")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(log1)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(1)))
                .andExpect(jsonPath("$.username", is("user1")))
                .andExpect(jsonPath("$.deviceName", is("Thermostat")))
                .andExpect(jsonPath("$.message", is("Device activated")));
    }

    @Test
    void testDeleteLog() throws Exception {
        Long logId = 1L;
        Mockito.doNothing().when(logService).deleteLog(logId);

        mockMvc.perform(delete("/api/logs/{id}", logId))
                .andExpect(status().isOk());

        Mockito.verify(logService, Mockito.times(1)).deleteLog(logId);
    }
}
