import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function JobsList({ userId, role, user }) {
    const nav = useNavigate();

    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/jobs")
        .then((res) => res.json())
        .then(arr => setJobs(arr));
    }, []);

    function goToApply(job, role, userId, user) {
        nav('/application', {state:{'job' : job,'role' : role,'userId' : userId,'user' : user}});
    }

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
                            jobs.map((j, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{j.listingTitle}</td>
                                        <td>{j.department}</td>
                                        <td>{new Date(j.dateListed).toLocaleDateString()}</td>
                                        <td>{j.jobTitle}</td>
                                        <td>{j.jobDescription}</td>
                                        <td>{j.listingStatus}</td>
                                        <td>
                                            <button onClick={() => goToApply(j, role, userId, user)} style={{display:j.listingStatus==='Closed'?'none':'block'}}>
                                            <Link to='/application' state = {{
                                                'job' : j,
                                                'role' : role,
                                                'userId' : userId,
                                                'user' : user
                                            }} style={{display:j.listingStatus==='Closed'?'none':'block'}}>Apply</Link>
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