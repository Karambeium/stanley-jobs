import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function JobsList({ userId, role }) {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/jobs")
        .then((res) => res.json())
        .then(arr => setJobs(arr));
    }, []);

    return (
        <>
            <div style={{maxHeight:"75vh", overflowY:"scroll", overflowX:"auto"}}>
                <table>
                    <thead>
                        <tr>
                            <td>Job</td>
                            <td>Department</td>
                            <td>Listing Date</td>
                            <td>Position</td>
                            <td>Description</td>
                            <td>Status</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            jobs.map((u, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{u.listingTitle}</td>
                                        <td>{u.department}</td>
                                        <td>{u.dateListed}</td>
                                        <td>{u.jobTitle}</td>
                                        <td>{u.jobDescription}</td>
                                        <td>{u.listingStatus}</td>
                                        <td>
                                            <Link to='/application' state = {{
                                                'job' : u,
                                                'role' : role,
                                                'userId' : userId
                                            }}>Apply</Link>
                                            
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default JobsList;