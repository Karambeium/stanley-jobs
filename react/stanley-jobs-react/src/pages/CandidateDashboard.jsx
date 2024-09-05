import React, { useState, useEffect } from 'react';
import ApplicationEditForm from '../components/ApplicationEditForm';

const CandidateDashboard = ({ candidateId }) => {
    //DONE: 'My Profile'
    //DONE: 'My Applications'

    const [myApplications, setMyApplications] = useState([]);
    const [editingAppId, setEditingAppId] = useState(null);
    const [editedAppDetails, setEditedAppDetails] = useState(null);

    useEffect(() => {
        getMyApplications();
    }, []);

    const getMyApplications = async () => {
        try {
            const response = await fetch(`http://localhost:8080/applications/user/${candidateId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setMyApplications(data);
        } catch (error) {
            console.error('Error fetching your applications:', error);
        }

    };

    const handleEditClick = (application, event) => {
        event.stopPropagation();
        setEditingAppId(application.id);
        setEditedAppDetails(application);
    }

    const handleWithdrawClick = async (applicationId, event) => {
        event.stopPropagation();
        try {
            const response = await fetch(`http://localhost:8080/applications/${applicationId}`, 
            {
                method: 'DELETE'
            });

            if(!response.ok) {
                throw new Error('Network response was not ok');
            }
            getMyApplications();
        }
        catch(error) {
            console.error('Error withdrawing your application:', error);
        }

    }

    //TODO: modify below to this component
    const handleSave = async (appData) => {
        try {
            const method = 'PUT';
            const url = `http://localhost:8080/applications/${editingAppId}`;

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...appData }),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            getMyApplications();
            setEditingAppId(null);
        } catch (error) {
            console.error('Error updating your application:', error);
        }
    };

    const handleCancel = () => {
        setEditingAppId(null);
    };


    return (
        <div>
            <h2>My Applications</h2>
            {editingAppId ? (
                <ApplicationEditForm
                    applicationDetails={editedAppDetails}
                    onSave={handleSave}
                    onCancel={handleCancel}
                />
            ) : (
            <div className="manager-dashboard">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Job Id</th>
                            <th>Date Applied</th>
                            <th>Cover Letter</th>
                            <th>Resume</th>
                            <th>Application Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myApplications.length === 0? (
                            <tr>
                                <td colSpan="6" style={{ textAlign: 'center', padding: '20px', fontSize: '16px', color: '#888' }}>
                                    You haven't applied to any jobs yet!
                                </td>
                
                            </tr>
                        ) : (
                            myApplications.map((application) => (
                            <tr key={application.id}>
                                <td>{application.jobId}</td>
                                <td>{new Date(application.dateApplied).toLocaleDateString()}</td>
                                <td>{application.coverLetter}</td>
                                <td>{application.customResume}</td>
                                <td>{application.applicationStatus}</td>

                                <td>
                                <button className="btn btn-warning" disabled={application.applicationStatus === 'Reviewed' ||application.applicationStatus === 'Interviewed' || application.applicationStatus === 'Accepted' || application.applicationStatus === 'Rejected'}
                                onClick={(event) => handleEditClick(application, event)} >
                                    Edit
                                </button>

                                <button className="btn btn-danger"
                                                onClick={(event) => handleWithdrawClick(application.id, event)}>Withdraw</button>
                                                                 
                                </td>       
                            </tr>
                            
                        )))}
                        
                    </tbody>



                </table>
            </div>
            )}
        </div>
            
    )

}

export default CandidateDashboard;