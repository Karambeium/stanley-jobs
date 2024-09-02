package com.stanley.stanley_jobs;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
@Table(name = "application")
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "user_id")
    private int userId;

    @Column(name = "job_id")
    private int jobId;

    @Column(name = "date_applied", nullable = false, updatable = false, insertable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    @Temporal(TemporalType.TIMESTAMP)
    private Date dateApplied;

    @Column(name = "cover_letter", columnDefinition = "TEXT")
    private String coverLetter;

    @Column(name = "custom_resume", columnDefinition = "TEXT")
    private String customResume;

    @Column(name = "application_status")
    private String applicationStatus;

    // Default constructor
    public Application() {
        super();
    }

    public Application(int userId, int jobId, String coverLetter, String customResume, String applicationStatus) {
        this.userId = userId;
        this.jobId = jobId;
        this.coverLetter = coverLetter;
        this.customResume = customResume;
        this.applicationStatus = applicationStatus;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getJobId() {
        return jobId;
    }

    public void setJobId(int jobId) {
        this.jobId = jobId;
    }

    public Date getDateApplied() {
        return dateApplied;
    }

    public void setDateApplied(Date dateApplied) {
        this.dateApplied = dateApplied;
    }

    public String getCoverLetter() {
        return coverLetter;
    }

    public void setCoverLetter(String coverLetter) {
        this.coverLetter = coverLetter;
    }

    public String getCustomResume() {
        return customResume;
    }

    public void setCustomResume(String customResume) {
        this.customResume = customResume;
    }

    public String getApplicationStatus() {
        return applicationStatus;
    }

    public void setApplicationStatus(String applicationStatus) {
        this.applicationStatus = applicationStatus;
    }
}
