package com.stanley.stanley_jobs;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ApplicationService {

    @Autowired
    private ApplicationRepository applicationRepository;

    public List<Application> getAllApplications() {
        return applicationRepository.findAll();
    }

    public Optional<Application> getApplicationById(int id) {
        return applicationRepository.findById(id);
    }

    // public List<Application> getApplicationsByManagerId(int managerId) {
    //     return applicationRepository.findByManagerId(managerId);
    // }
    public List<Application> getApplicationsByJobId(int jobId) {
        return applicationRepository.findByJobId(jobId);
    }

    public List<Application> getApplicationByUserId(int userId) {
        return applicationRepository.findByUserId(userId);
    }

    public Application postApplication(Application newApplication) {
        return applicationRepository.save(newApplication);
    }

    public Application updateApplication(int id, Application applicationUpdates) {
        Optional<Application> existingApplicationOpt = applicationRepository.findById(id);

        if (existingApplicationOpt.isPresent()) {
            Application existingApplication = existingApplicationOpt.get();

            if (applicationUpdates.getCoverLetter() != null) {
                existingApplication.setCoverLetter(applicationUpdates.getCoverLetter());
            }
            if (applicationUpdates.getCustomResume() != null) {
                existingApplication.setCustomResume(applicationUpdates.getCustomResume());
            }
            if (applicationUpdates.getApplicationStatus() != null) {
                existingApplication.setApplicationStatus(applicationUpdates.getApplicationStatus());
            }

            return applicationRepository.save(existingApplication);
        } else {
            throw new NoSuchElementException("Application not found with id: " + id);
        }
    }

    public void deleteApplicationById(int id) {
        if (applicationRepository.existsById(id)) {
            applicationRepository.deleteById(id);
        } else {
            throw new NoSuchElementException("Application not found with id: " + id);
        }
    }
}
