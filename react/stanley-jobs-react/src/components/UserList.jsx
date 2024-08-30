import { useState, useEffect } from 'react';

function UserList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // TODO : load users from backend
        setUsers([
            {
                "name": "karam jivani",
                "email": "kjivani07@gmail.com",
                "password": "123",
                "role": "admin",
                "address": "123 main st, duluth, ga 30096",
                "phone": "1234567890"
            },
            {
                "name": "alex johnson",
                "email": "alex.johnson@example.com",
                "password": "abc123",
                "role": "user",
                "address": "456 elm st, atlanta, ga 30301",
                "phone": "2345678901"
            },
            {
                "name": "samantha lee",
                "email": "samantha.lee@example.com",
                "password": "password1",
                "role": "user",
                "address": "789 oak st, marietta, ga 30060",
                "phone": "3456789012"
            },
            {
                "name": "michael smith",
                "email": "michael.smith@example.com",
                "password": "1234abcd",
                "role": "editor",
                "address": "101 pine st, norcross, ga 30071",
                "phone": "4567890123"
            },
            {
                "name": "jessica brown",
                "email": "jessica.brown@example.com",
                "password": "qwerty",
                "role": "user",
                "address": "202 cedar st, lawrenceville, ga 30043",
                "phone": "5678901234"
            },
            {
                "name": "david wilson",
                "email": "david.wilson@example.com",
                "password": "letmein",
                "role": "admin",
                "address": "303 maple st, sandy springs, ga 30328",
                "phone": "6789012345"
            },
            {
                "name": "emily davis",
                "email": "emily.davis@example.com",
                "password": "emily2024",
                "role": "user",
                "address": "404 birch st, decatur, ga 30030",
                "phone": "7890123456"
            },
            {
                "name": "johnson clark",
                "email": "johnson.clark@example.com",
                "password": "johnson12",
                "role": "editor",
                "address": "505 spruce st, roswell, ga 30075",
                "phone": "8901234567"
            },
            {
                "name": "olivia martin",
                "email": "olivia.martin@example.com",
                "password": "olivia2024",
                "role": "user",
                "address": "606 walnut st, alpharetta, ga 30022",
                "phone": "9012345678"
            },
            {
                "name": "william taylor",
                "email": "william.taylor@example.com",
                "password": "william123",
                "role": "admin",
                "address": "707 fir st, johns creek, ga 30024",
                "phone": "0123456789"
            },
            {
                "name": "isabella thomas",
                "email": "isabella.thomas@example.com",
                "password": "isabella99",
                "role": "user",
                "address": "808 ash st, peachtree city, ga 30269",
                "phone": "1234567891"
            }
        ])
    }, []);

    return (
        <>
            <div style={{maxHeight:"75vh", overflowY:"scroll", overflowX:"auto"}}>
                <table>
                    <thead>
                        <tr>
                            <td>Name</td>
                            <td>Email</td>
                            <td>Password</td>
                            <td>Role</td>
                            <td>Address</td>
                            <td>Phone</td>
                            <td>Actions</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((u, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{u.name}</td>
                                        <td>{u.email}</td>
                                        <td>{u.password}</td>
                                        <td>{u.role}</td>
                                        <td>{u.address}</td>
                                        <td>{u.phone}</td>
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