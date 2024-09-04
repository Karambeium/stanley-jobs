import React, { useState } from 'react';

const ApplicationList = ({ applications, onSaveStatus }) => {
    
    const [editingApplicationId, setEditingApplicationId] = useState(null);
    const [editedStatus, setEditedStatus] = useState('');

    const editApplicationStatus = (application) => {
        setEditingApplicationId(application.id);
        setEditedStatus(application.applicationStatus);
    };

    const saveStatus = (application) => {
        console.log(editedStatus);
        onSaveStatus(application.id, editedStatus);
        setEditingApplicationId(null);
        
    };

    const cancelEdit = () => {
        setEditingApplicationId(null);
        setEditedStatus('');
    };

    return (
        <div className="application-list">
            <h3>Applications</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th>Application ID</th>
                        <th>User ID</th>
                        <th>Date Applied</th>
                        <th>Status</th>
                        <th>Cover Letter</th>
                        <th>Custom Resume</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {applications.map((application) => (
                        <tr key={application.id}>
                            <td>{application.id}</td>
                            <td>{application.userId}</td>
                            <td>{new Date(application.dateApplied).toLocaleDateString()}</td>
                            <td>
                                {editingApplicationId != null && editingApplicationId === application.id ? (
                                    <select
                                        value={editedStatus}
                                        onChange={(e) => setEditedStatus(e.target.value)}
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Reviewed">Reviewed</option>
                                        <option value="Interviewed">Interviewed</option>
                                        <option value="Accepted">Accepted</option>
                                        <option value="Rejected">Rejected</option>
                                    </select>
                                ) : (
                                    application.applicationStatus
                                )}
                            </td>
                            <td>{application.coverLetter}</td>
                            <td>{application.customResume}</td>
                            <td>
                                {editingApplicationId != null && editingApplicationId === application.id ? (
                                    <>
                                        <button 
                                            className="btn btn-success"
                                            onClick={() => saveStatus(application)}
                                        >
                                            Save
                                        </button>
                                        <button 
                                            className="btn btn-secondary" 
                                            onClick={cancelEdit}
                                        >
                                            Cancel
                                        </button>
                                    </>
                                ) : (
                                    <button 
                                        className="btn btn-warning"
                                        onClick={() => editApplicationStatus(application)}
                                    >
                                        Edit
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ApplicationList;
