package com.projects.smarthouse_backend.model;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class LogTest {

    private Log log;

    @BeforeEach
    void setUp() {
        log = new Log();
    }

    @Test
    void testLogProperties() {
        log.setId(1L);
        log.setDeviceName("Thermostat");
        log.setMessage("Device activated");
        log.setDate("2023-11-05");
        log.setStatus("Active");
        log.setUsername("johndoe");

        assertEquals(1L, log.getId());
        assertEquals("Thermostat", log.getDeviceName());
        assertEquals("Device activated", log.getMessage());
        assertEquals("2023-11-05", log.getDate());
        assertEquals("Active", log.getStatus());
        assertEquals("test", log.getUsername());
    }

    @Test
    void testSetAndGetDeviceName() {
        log.setDeviceName("Light Sensor");
        assertEquals("Light Sensor", log.getDeviceName());
    }

    @Test
    void testSetAndGetMessage() {
        log.setMessage("Device turned off");
        assertEquals("Device turned off", log.getMessage());
    }

    @Test
    void testSetAndGetDate() {
        log.setDate("2024-01-01");
        assertEquals("2024-01-01", log.getDate());
    }

    @Test
    void testSetAndGetStatus() {
        log.setStatus("Inactive");
        assertEquals("Inactive", log.getStatus());
    }

    @Test
    void testSetAndGetUsername() {
        log.setUsername("test");
        assertEquals("test", log.getUsername());
    }

    @Test
    void testNoArgsConstructor() {
        Log newLog = new Log();
        assertNotNull(newLog);
    }
}
