import React, { useState } from 'react';

const ApplicationEditForm = ({ applicationDetails, onSave, onCancel }) => {
    const [formData, setFormData] = useState(applicationDetails);
    console.log(formData)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        //TODO: Add styling to the div maybe a border and make labels tags and pretty!!
        <div className="application-edit-form">
            <div className='label-container'>
                <div className={`label-tag ${
      formData.applicationStatus === 'Pending' || formData.applicationStatus === 'Reviewed' || formData.applicationStatus === 'Interviewed'
        ? 'status-pending'
        : formData.applicationStatus === 'Accepted'
        ? 'status-accepted'
        : formData.applicationStatus === 'Rejected'
        ? 'status-rejected'
        : ' '
    }`}>
                    <label>Application Status: {formData.applicationStatus}</label>
                </div>
                <div className='label-tag'>
                    <label>Date Applied: {new Date(formData.dateApplied).toLocaleDateString()}</label>
                </div>
                <div className='label-tag'>
                    <label>Job Id: {formData.jobId}</label>
                </div>
            </div>
            <h3>Edit Application</h3>
            <form onSubmit={handleSubmit} className="job-form">
                <div className="form-group">
                    <textarea
                        id="coverLetter"
                        name="coverLetter"
                        value={formData.coverLetter}
                        onChange={handleChange}
                        rows="4"
                        className="form-control"
                        placeholder="Cover Letter"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="customResume">Resume:</label>
                    <textarea
                        id="customResume"
                        name="customResume"
                        value={formData.customResume}
                        onChange={handleChange}
                        rows="4"
                        className="form-control"
                    />
                </div>
                <div className="form-actions">
                    <button type="submit" className="btn btn-success">Update</button>
                    <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default ApplicationEditForm;
