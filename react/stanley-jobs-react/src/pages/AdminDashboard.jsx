import React, { useState, useEffect } from 'react';
import JobForm from '../components/JobForm';
import ApplicationList from '../components/ApplicationList';

const AdminDashboard = ({ }) => {
    const [users, setUsers] = useState([]);
    const [roleChangeId, setRoleChangeId] = useState();

    useEffect(() => {
        fetchUsers();
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

    const upgradeUser = (id, user) => {
        const newUser = {...user};
        newUser.id = id;
        fetch(`http://localhost:8080/users/${id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser)
            }
        ).then((res) => {
            if (res.ok) {
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

    const showTypeEditor = (id) => {
        setRoleChangeId(id);
    }

    return (
        <div style={{maxHeight:"75vh", overflowY:"scroll", overflowX:"auto"}}>
            <h2>Users</h2>
                <div className="admin-dashboard">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>User Id</th>
                                <th>Username</th>
                                <th>Type</th>
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
                                                <button style={{display:roleChangeId!==u.id?'block':'none'}} onClick={() => showTypeEditor(u.id)}>Edit User Type</button>
                                                <select style={{display:roleChangeId===u.id?'block':'none'}}>
                                                    <option value='Candidate'>Candidate</option>
                                                    <option value='Hiring Manager'>Hiring Manager</option>
                                                    <option value='Admin'>Admin</option>
                                                </select>
                                                <button style={{display:roleChangeId===u.id?'block':'none'}} onClick={() => upgradeUser(u.id, u)}>Save User</button>
                                                <button onClick={() => deleteUser(u.id)}>Delete User</button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
        </div>
    );
};

export default ManagerDashboard;
