import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import getCookie from '../components/cookieManager';

function JobsList({ userId, role, user, counter }) {
    const nav = useNavigate();

    const [jobs, setJobs] = useState([]);
    const [appliedJobs, setAppliedJobs] = useState([]);

    useEffect(() => {
        fetchJobs();
        fetchAppliedJobs(); 
    }, [counter]);

    const fetchJobs = () => {
        fetch("http://localhost:8080/jobs")
        .then((res) => res.json())
        .then(arr => {
            setJobs(arr)
        });
    };

    const fetchAppliedJobs = () => {
        fetch(`http://localhost:8080/applications/user/${getCookie('id')}`) 
        .then(res => res.json())
        .then(data => {
            console.log(data)
            const appliedJobIds = data.map(app => app.jobId)
            setAppliedJobs(appliedJobIds);  
        })
        .then(() => console.log(appliedJobs));
    };

    function goToApply(job, role, userId, user) {
        nav('/application', {state:{'job' : job,'role' : role,'userId' : getCookie('id'), 'user':user, 'appliedJobs':appliedJobs}});
    }

    return (
        <>
            <h2>Job Listing</h2>
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
                        { jobs.length === 0 ? (
                            <tr>
                                <td colSpan="7" style={{ textAlign: 'center', padding: '20px', fontSize: '16px', color: '#888' }}>
                                No active jobs right now! Please check back later.
                                </td>
                            </tr>
                        ) : (
                            jobs.map((j, i) => {
                                const hasApplied = appliedJobs.includes(j.id);
                                return (
                                    <tr key={i}>
                                        <td>{j.listingTitle}</td>
                                        <td>{j.department}</td>
                                        <td>{new Date(j.dateListed).toLocaleDateString()}</td>
                                        <td>{j.jobTitle}</td>
                                        <td>{j.jobDescription}</td>
                                        <td>{j.listingStatus}</td>
                                        <td>
                                        {hasApplied ? (

                                            <span className="status-applied">Applied</span>  
                                        ) : (
                                            <button
                                                onClick={() => goToApply(j, role, getCookie('id'), user)}
                                                className="btn btn-success"
                                                style={{ display: j.listingStatus === 'Closed' ? 'none' : 'block' }}
                                            >
                                                Apply
                                            </button>
                                        )}
                                            </td>

                                    </tr>
                                )} 
                                )) 
                                }
                        
                            
                        
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default JobsList;