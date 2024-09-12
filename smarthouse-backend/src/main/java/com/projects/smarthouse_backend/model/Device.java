package com.projects.smarthouse_backend.model;

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

    @Enumerated(EnumType.STRING)
    private DeviceType type;

    private boolean status;

    @Column(nullable = true)
    private Integer brightness;

    @Column(nullable = true)
    private Integer temperature;

    @Column(nullable = true)
    private Boolean motionDetectionEnabled;

    @ManyToOne
    @JoinColumn(name = "room_id")
    private Room room;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
