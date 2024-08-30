import { useState } from 'react';

function Login(setRole, setUser, setUserId, userId) {
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');

    const handleLogin = () => {
        // TODO : send creds to backend, check if user exists. if user exists, set role and user info
        setUserId(1); // TODO : remove
        setUser({
            name:'karam',
            email:'kjivani07@gmail.com'
        }) // TODO : remove
    }

    return (
        <>
            <form onSubmit={handleLogin}>
                <input type="text" name="email" placeholder="Email" onChange={e => setEmail(e.target.value)} value={email}></input>
                <input type="text" name="password" placeholder="Password" onChange={e => setPassword(e.target.value)} value={password}></input>
            </form>
        </>
    )
}

export default Login;