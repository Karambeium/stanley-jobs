package com.stanley.stanley_jobs;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface JobRepository extends JpaRepository<Job, Integer> {

    List<Job> findByManagerId(int managerId);
}
