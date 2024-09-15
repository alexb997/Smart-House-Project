package com.projects.smarthouse_backend.controller;

import com.projects.smarthouse_backend.model.Room;
import com.projects.smarthouse_backend.service.RoomService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(RoomController.class)
class RoomControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private RoomService roomService;

    private Room room;

    @BeforeEach
    void setup() {
        room = new Room();
        room.setId(1L);
        room.setName("Living Room");
    }

    @Test
    void getAllRoomsTest() throws Exception {
        when(roomService.getAllRooms()).thenReturn(List.of(room));

        mockMvc.perform(get("/api/rooms"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name").value(room.getName()));
    }

    @Test
    void getRoomByIdTest() throws Exception {
        when(roomService.getRoomById(1L)).thenReturn(Optional.of(room));

        mockMvc.perform(get("/api/rooms/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value(room.getName()));
    }

    @Test
    void getRoomByIdNotFoundTest() throws Exception {
        when(roomService.getRoomById(any())).thenReturn(Optional.empty());

        mockMvc.perform(get("/api/rooms/1"))
                .andExpect(status().isNotFound());
    }

    @Test
    void createRoomTest() throws Exception {
        when(roomService.saveRoom(any(Room.class))).thenReturn(room);

        mockMvc.perform(post("/api/rooms")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"name\": \"Living Room\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Living Room"));
    }

    @Test
    void updateRoomTest() throws Exception {
        when(roomService.getRoomById(1L)).thenReturn(Optional.of(room));
        when(roomService.saveRoom(any(Room.class))).thenReturn(room);

        mockMvc.perform(put("/api/rooms/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"name\": \"Updated Room\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Updated Room"));
    }

    @Test
    void deleteRoomTest() throws Exception {
        when(roomService.getRoomById(1L)).thenReturn(Optional.of(room));

        mockMvc.perform(delete("/api/rooms/1"))
                .andExpect(status().isNoContent());
    }
}
