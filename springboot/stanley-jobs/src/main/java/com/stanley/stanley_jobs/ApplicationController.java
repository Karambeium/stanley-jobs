package com.stanley.stanley_jobs;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/applications")
public class ApplicationController {

    @Autowired
    private ApplicationService applicationService;

    @GetMapping
    public List<Application> getAllApplications() {
        return applicationService.getAllApplications();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Application>> getApplicationById(@PathVariable int id) {
        Optional<Application> application = applicationService.getApplicationById(id);
        if (application.isPresent()) {
            return ResponseEntity.ok(application);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    // @GetMapping("/manager/{managerId}")
    // public List<Application> getApplicationsByManagerId(@PathVariable int managerId) {
    //     return applicationService.getApplicationsByManagerId(managerId);
    // }
    @GetMapping("/job/{jobId}")
    public List<Application> getApplicationsByJobId(@PathVariable int jobId) {
        return applicationService.getApplicationsByJobId(jobId);
    }

    @PostMapping
    public ResponseEntity<Application> postApplication(@RequestBody Application newApplication) {
        try {
            Application createdApplication = applicationService.postApplication(newApplication);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdApplication);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Application> updateApplication(@PathVariable int id, @RequestBody Application applicationUpdates) {
        try {
            Application updatedApplication = applicationService.updateApplication(id, applicationUpdates);
            return ResponseEntity.ok(updatedApplication);
        } catch (NoSuchElementException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteApplicationById(@PathVariable int id) {
        try {
            applicationService.deleteApplicationById(id);
            return ResponseEntity.noContent().build();
        } catch (NoSuchElementException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
