import React, { useState, useEffect } from 'react';
import JobForm from './JobForm';
import ApplicationList from './ApplicationList';

const ManagerDashboard = ({ managerId }) => {
    const [jobListings, setJobListings] = useState([]);
    const [editingJobId, setEditingJobId] = useState(null);
    const [editedJobDetails, setEditedJobDetails] = useState(null);
    const [isCreatingJob, setIsCreatingJob] = useState(false);
    const [applications, setApplications] = useState([]);
    const [selectedJobId, setSelectedJobId] = useState(null);

    useEffect(() => {
        fetchJobListings();
    }, []);

    const fetchJobListings = async () => {
        try {
            const response = await fetch(`http://localhost:8080/jobs/manager/${managerId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setJobListings(data);
        } catch (error) {
            console.error('Error fetching job listings:', error);
        }
    };

    const handleEditClick = (job, event) => {
        event.stopPropagation();
        setEditingJobId(job.id);
        setEditedJobDetails(job);
        setIsCreatingJob(false);
    };

    const handleCreateClick = () => {
        setEditingJobId(null);
        setEditedJobDetails(null);
        setIsCreatingJob(true);
    };

    const handleSave = async (jobData) => {
        try {
            const method = isCreatingJob ? 'POST' : 'PUT';
            const url = isCreatingJob
                ? `http://localhost:8080/jobs`
                : `http://localhost:8080/jobs/${editingJobId}`;

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...jobData, managerId }),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            fetchJobListings();
            setEditingJobId(null);
            setIsCreatingJob(false);
        } catch (error) {
            console.error('Error saving job listing:', error);
        }
    };

    const handleCancel = () => {
        setEditingJobId(null);
        setIsCreatingJob(false);
    };

    const deleteJobListing = async (jobId, event) => {
        event.stopPropagation();
        try {
            const response = await fetch(`http://localhost:8080/jobs/${jobId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            fetchJobListings();
        } catch (error) {
            console.error('Error deleting job listing:', error);
        }
    };

    const closeJobListing = async (jobId, event) => {
        event.stopPropagation();
        try {
            const response = await fetch(`http://localhost:8080/jobs/${jobId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ listingStatus: 'Closed' }),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            fetchJobListings();
        } catch (error) {
            console.error('Error closing job listing:', error);
        }
    };

    const fetchApplications = async (jobId) => {
        try {
            const response = await fetch(`http://localhost:8080/applications/job/${jobId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setApplications(data);
            setSelectedJobId(jobId);
        } catch (error) {
            console.error('Error fetching applications:', error);
        }
    };

    const handleJobClick = (jobId) => {
        if (selectedJobId === jobId) {
            setSelectedJobId(null);
            setApplications([]);
        } else {
            fetchApplications(jobId);
        }
    };

    const saveApplicationStatus = async (applicationId, newStatus) => {
        try {
            const response = await fetch(`http://localhost:8080/applications/${applicationId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ application_status: newStatus }),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            fetchApplications(selectedJobId);
        } catch (error) {
            console.error('Error updating application status:', error);
        }
    };

    return (
        <div style={{maxHeight:"75vh", overflowY:"scroll", overflowX:"auto"}}>
            <h2>Job Listings</h2>
            <button className="btn btn-primary" onClick={handleCreateClick}>
                Create New Job Listing
            </button>

            {isCreatingJob || editingJobId ? (
                <JobForm
                    jobDetails={editedJobDetails}
                    onSave={handleSave}
                    onCancel={handleCancel}
                    isEditMode={!!editingJobId}
                />
            ) : (
                <div className="manager-dashboard">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Job Title</th>
                                <th>Department</th>
                                <th>Date Listed</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {jobListings.map((job) => (
                                <React.Fragment key={job.id}>
                                    <tr
                                        onClick={() => handleJobClick(job.id)}
                                        className={selectedJobId === job.id ? 'selected-row' : ''}
                                    >
                                        <td>{job.jobTitle}</td>
                                        <td>{job.department}</td>
                                        <td>{new Date(job.dateListed).toLocaleDateString()}</td>
                                        <td>{job.listingStatus}</td>
                                        <td>
                                            <button
                                                className="btn btn-warning"
                                                onClick={(event) => handleEditClick(job, event)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="btn btn-danger"
                                                onClick={(event) => deleteJobListing(job.id, event)}
                                            >
                                                Delete
                                            </button>
                                            <button
                                                className={`btn btn-secondary ${job.listingStatus === 'Closed' ? 'disabled-btn' : ''}`}
                                                onClick={(event) => closeJobListing(job.id, event)}
                                                disabled={job.listingStatus === 'Closed'}
                                            >
                                                Close Job
                                            </button>
                                        </td>
                                    </tr>
                                    {selectedJobId === job.id && (
                                        <tr className="application-row">
                                            <td colSpan="5">
                                                <ApplicationList 
                                                    applications={applications}
                                                    onSaveStatus={saveApplicationStatus}
                                                />
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ManagerDashboard;
