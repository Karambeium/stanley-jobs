import { useState, useEffect } from 'react';
//rootroot123!

function UserList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/users")
        .then((res) => res.json())
        .then(arr => setUsers(arr));
    }, []);

    return (
        <>
            <div style={{maxHeight:"75vh", overflowY:"scroll", overflowX:"auto"}}>
                <table>
                    <thead>
                        <tr>
                            {/* <td>Name</td>
                            <td>Email</td>
                            <td>Password</td>
                            <td>Role</td>
                            <td>Address</td>
                            <td>Phone</td>
                            <td>Actions</td> */}
                            <td>Id</td>
                            <td>Username</td>
                            <td>Password</td>
                            <td>Type</td>
                            <td>Actions</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((u, i) => {
                                return (
                                    <tr key={i}>
                                        {/* <td>{u.name}</td>
                                        <td>{u.email}</td>
                                        <td>{u.password}</td>
                                        <td>{u.role}</td>
                                        <td>{u.address}</td>
                                        <td>{u.phone}</td> */}
                                        <td>{u.id}</td>
                                        <td>{u.username}</td>
                                        <td>{u.password}</td>
                                        <td>{u.type}</td>
                                        <td>
                                            <button style={{backgroundColor:'white'}}>Modify User</button>
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

export default UserList;