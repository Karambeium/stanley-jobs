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
                                        <td>{u.listing_title}</td>
                                        <td>{u.department}</td>
                                        <td>{u.date_listed}</td>
                                        <td>{u.job_title}</td>
                                        <td>{u.job_description}</td>
                                        <td>{u.listing_status}</td>
                                        <td>
                                            <Link to='/application' state = {{
                                                'job' : u
                                            }}>Apply for Job</Link>
                                            <button style={{backgroundColor:'red'}}>Delete User</button>
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