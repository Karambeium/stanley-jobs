package com.stanley.stanley_jobs;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ApplicationRepository extends JpaRepository<Application, Integer> {

    // List<Application> findByManagerId(int managerId);
    List<Application> findByJobId(int jobId);

    List<Application> findByUserId(int userId);
}
