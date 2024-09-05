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
                <input
                    type="text"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleInputChange}
                    required
                    placeholder="Job Title"
                />
            </div>
            <div className="form-group">
                <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    required
                    placeholder="Department"
                />
            </div>
            <div className="form-group">
                <input
                    type="text"
                    name="listingTitle"
                    value={formData.listingTitle}
                    onChange={handleInputChange}
                    required
                    placeholder="Listing Title"
                />
            </div>
            <div className="form-group">
                <select
                    name="listingStatus"
                    value={formData.listingStatus}
                    onChange={handleInputChange}
                    placeholder="Listing Status"
                >
                    <option value="Open">Open</option>
                    <option value="Closed">Closed</option>
                </select>
            </div>
            <div className="form-group">
                <textarea
                    name="jobDescription"
                    value={formData.jobDescription}
                    onChange={handleInputChange}
                    rows="4"
                    required
                    placeholder="Job Description"
                />
            </div>
            <div className="form-group">
                <textarea
                    name="additionalInformation"
                    value={formData.additionalInformation}
                    onChange={handleInputChange}
                    rows="3"
                    placeholder="Additional Information"
                />
            </div><br/>
            <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                    {isEditMode ? 'Save Changes' : 'Create Job'}
                </button>
                <button type="button" className="btn btn-success" onClick={onCancel}>
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default JobForm;
