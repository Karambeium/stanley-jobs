package com.stanley.stanley_jobs;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class JobService {

    @Autowired
    private JobRepository jobRepository;

    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    public Optional<Job> getJobById(int id) {
        return jobRepository.findById(id);
    }

    public List<Job> getJobsByManagerId(int managerId) {
        return jobRepository.findByManagerId(managerId);
    }

    public Job postJob(Job newJob) {
        return jobRepository.save(newJob);
    }

    public Job updateJob(int id, Job jobUpdates) {
        Optional<Job> existingJobOpt = jobRepository.findById(id);

        if (existingJobOpt.isPresent()) {
            Job existingJob = existingJobOpt.get();

            if (jobUpdates.getDepartment() != null) {
                existingJob.setDepartment(jobUpdates.getDepartment());
            }
            if (jobUpdates.getListingTitle() != null) {
                existingJob.setListingTitle(jobUpdates.getListingTitle());
            }
            if (jobUpdates.getDateListed() != null) {
                existingJob.setDateListed(jobUpdates.getDateListed());
            }
            if (jobUpdates.getDateClosed() != null) {
                existingJob.setDateClosed(jobUpdates.getDateClosed());
            }
            if (jobUpdates.getJobTitle() != null) {
                existingJob.setJobTitle(jobUpdates.getJobTitle());
            }
            if (jobUpdates.getJobDescription() != null) {
                existingJob.setJobDescription(jobUpdates.getJobDescription());
            }
            if (jobUpdates.getAdditionalInformation() != null) {
                existingJob.setAdditionalInformation(jobUpdates.getAdditionalInformation());
            }
            if (jobUpdates.getListingStatus() != null) {
                existingJob.setListingStatus(jobUpdates.getListingStatus());
            }

            return jobRepository.save(existingJob);
        } else {
            throw new NoSuchElementException("Job not found with id: " + id);
        }
    }

    public void deleteJobById(int id) {
        if (jobRepository.existsById(id)) {
            jobRepository.deleteById(id);
        } else {
            throw new NoSuchElementException("Job not found with id: " + id);
        }
    }
}
