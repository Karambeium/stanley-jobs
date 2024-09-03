import { application } from 'express';
import React, { useState, useEffect } from 'react';

const CandidateDashboard = ({ candidateId }) => {

    const [myApplications, setMyApplications] = useState([]);

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
            console.log(myApplications);
        } catch (error) {
            console.error('Error fetching your applications:', error);
        }

    };


    return (
        <div>
            <h2>My Applications</h2>
            <div className="manager-dashboard">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Job Id</th>
                            <th>Date Applied</th>
                            <th>Cover Letter</th>
                            <th>Resume</th>
                            <th>Application Status</th>
                        </tr>

                        <tbody>
                            {myApplications.map((application) => (
                                <tr>
                                    <td>{application.JobId}</td>
                                    <td>{application.DateApplied}</td>
                                </tr>

                            ))}

                        </tbody>
                    </thead>



                </table>
            </div>
        </div>
    )

}

export default CandidateDashboard;