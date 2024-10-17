package com.projects.smarthouse_backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;

@Entity
@Data
@NoArgsConstructor
public class Device {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private boolean status;

    @Enumerated(EnumType.STRING)
    private DeviceType type;

    @Column(nullable = true)
    private Integer brightness;

    @Column(nullable = true)
    private Integer temperature;

    @Column(nullable = true)
    private Boolean motionDetectionEnabled;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id")
    @JsonIgnore
    private Room room;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;
}
