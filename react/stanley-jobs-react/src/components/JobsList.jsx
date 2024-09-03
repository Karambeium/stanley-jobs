import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function JobsList() {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/jobs")
        .then((res) => res.json())
        .then(arr => setJobs(arr));
    }, []);

    return (
        <>
            <div className="manager-dashboard" style={{maxHeight:"75vh", overflowY:"scroll", overflowX:"auto"}}>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Job Title</th>
                            <th>Department</th>
                            <th>Date Listed</th>
                            <th>Position</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Actions</th>
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
                                            <button>
                                            <Link to='/application' state = {{
                                                'job' : u
                                            }}>Apply</Link>
                                            </button>
                                            
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