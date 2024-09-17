package com.projects.smarthouse_backend.repository;

import com.projects.smarthouse_backend.model.Room;
import com.projects.smarthouse_backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {
    Optional<Room> findByName(String kitchen);
    List<Room> findByUser(User user);
}
