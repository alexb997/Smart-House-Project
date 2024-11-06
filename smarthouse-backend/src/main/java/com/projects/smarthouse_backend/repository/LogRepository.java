package com.projects.smarthouse_backend.repository;

import com.projects.smarthouse_backend.model.Log;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LogRepository extends JpaRepository<Log, Long> {
    Page<Log> findByUsernameOrderByDateDesc(String username, Pageable pageable);
}
