import React, { useState, useEffect } from 'react';
import JobForm from '../components/JobForm';
import ApplicationList from '../components/ApplicationList';

const AdminDashboard = ({ }) => {
    const [users, setUsers] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [roleChangeId, setRoleChangeId] = useState();

    useEffect(() => {
        fetchUsers();
        fetchJobs();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch(`http://localhost:8080/users`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching job listings:', error);
        }
    };

    const fetchJobs = () => {
        try {
            fetch('http://localhost:8080/jobs')
            .then(res => res.json())
            .then(res => setJobs(res));
        } catch (e) {
            console.error('Error fetching jobs:', e);
        }
    }

    const upgradeUser = (id, user) => {
        fetch(`http://localhost:8080/users/${id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user)
            }
        ).then((res) => {
            if (res.ok) {
            if (user.type === 'Hiring Manager') {
                const managerData = {
                    userId: id,  
                    fullName: user.full_name,  
                    email: user.username,  
                    department: user.department || '',  
                    phone: user.phone || '',  
                };

                fetch(`http://localhost:8080/manager`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(managerData),
                }).then((res) => {
                    if (res.ok) {
                        console.log('User successfully added as a Hiring Manager');
                    } else {
                        console.error('Error adding user to manager table');
                    }
                });
            }
                setRoleChangeId();
            }
        });
    }

    const deleteUser = (id) => {
        fetch(`http://localhost:8080/users/${id}`,
            {
                method: 'DELETE'
            }
        ).then((res) => {
            if (res.ok) {
                fetchUsers();
            }
        })
    }

    const deleteListing = (id) => {
        fetch(`http://localhost:8080/jobs/${id}`,
            {
                method: 'DELETE'
            }
        ).then((res) => {
            if (res.ok) {
                fetchJobs();
            }
        })
    }

    const showTypeEditor = (id) => {
        setRoleChangeId(id);
    }

    return (
        <>
        <h2>Users</h2>
        <div style={{maxHeight:"75vh", overflowY:"scroll", overflowX:"auto"}}>
                <div className="admin-dashboard">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>User Id</th>
                                <th>Username</th>
                                <th>Role</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((u, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>{u.id}</td>
                                            <td>{u.username}</td>
                                            <td>{u.type}</td>
                                            <td>
                                            <div style={{alignItems:'flex'}} className='btn-group'>
                                                <button style={{display:roleChangeId!==u.id?'inline':'none'}} onClick={() => showTypeEditor(u.id)}>Edit Role</button>
                                                <select style={{display:roleChangeId===u.id?'inline':'none'}} onChange={(e) => u.type = e.target.value}>
                                                    <option value='Candidate'>Candidate</option>
                                                    <option value='Hiring Manager'>Hiring Manager</option>
                                                    <option value='Admin'>Admin</option>
                                                </select>
                                                    <button className='btn' style={{display:roleChangeId===u.id?'inline':'none'}} onClick={() => upgradeUser(u.id, u)}>Save User</button>
                                                    <button className="btn btn-danger" onClick={() => deleteUser(u.id)}>Delete User</button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
        </div>
        <h2>Job Listings</h2>
        <div style={{maxHeight:"75vh", overflowY:"scroll", overflowX:"auto"}}>
            <div className="admin-dashboard">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Listing Id</th>
                            <th>Manager Id</th>
                            <th>Department</th>
                            <th>Job Title</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            jobs.map((j, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{j.id}</td>
                                        <td>{j.managerId}</td>
                                        <td>{j.department}</td>
                                        <td>{j.jobTitle}</td>
                                        <td>{j.description}</td>
                                        <td>
                                            <button className="btn btn-danger" onClick={() => deleteListing(j.id)}>Delete Listing</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
    </div>
    </>

    );
};

export default AdminDashboard;
