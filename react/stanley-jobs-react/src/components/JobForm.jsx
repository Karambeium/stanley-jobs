import React, { useState, useEffect } from 'react';

const JobForm = ({ jobDetails, onSave, onCancel, isEditMode }) => {
    const [formData, setFormData] = useState({
        jobTitle: '',
        department: '',
        listingTitle: '',
        jobDescription: '',
        additionalInformation: '',
        listingStatus: 'Open',
    });

    // Pre-populate the form when editing
    useEffect(() => {
        if (isEditMode && jobDetails) {
            setFormData({
                jobTitle: jobDetails.jobTitle || '',
                department: jobDetails.department || '',
                listingTitle: jobDetails.listingTitle || '',
                jobDescription: jobDetails.jobDescription || '',
                additionalInformation: jobDetails.additionalInformation || '',
                listingStatus: jobDetails.listingStatus || 'Open',
            });
        }
    }, [isEditMode, jobDetails]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData); // Pass the form data to the onSave function
    };

    return (
        <form onSubmit={handleSubmit} className="job-form">
            <div className="form-group">
                <label>Job Title:</label>
                <input
                    type="text"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className="form-group">
                <label>Department:</label>
                <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className="form-group">
                <label>Listing Title:</label>
                <input
                    type="text"
                    name="listingTitle"
                    value={formData.listingTitle}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className="form-group">
                <label>Job Description:</label>
                <textarea
                    name="jobDescription"
                    value={formData.jobDescription}
                    onChange={handleInputChange}
                    rows="4"
                    required
                />
            </div>
            <div className="form-group">
                <label>Additional Information:</label>
                <textarea
                    name="additionalInformation"
                    value={formData.additionalInformation}
                    onChange={handleInputChange}
                    rows="3"
                />
            </div>
            <div className="form-group">
                <label>Listing Status:</label>
                <select
                    name="listingStatus"
                    value={formData.listingStatus}
                    onChange={handleInputChange}
                >
                    <option value="Open">Open</option>
                    <option value="Closed">Closed</option>
                </select>
            </div>
            <div className="form-actions">
                <button type="submit" className="btn btn-success">
                    {isEditMode ? 'Save Changes' : 'Create Job'}
                </button>
                <button type="button" className="btn btn-secondary" onClick={onCancel}>
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default JobForm;
