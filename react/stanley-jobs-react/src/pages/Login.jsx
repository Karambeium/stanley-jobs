import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ setRole, setUser, setUserId, userId, user }) {
    const nav = useNavigate();

    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[showError, setShowError] = useState(false);

    const handleLogin = (event) => {
        event.preventDefault();
        fetch("http://localhost:8080/login",
            {
                method : 'POST',
                body : JSON.stringify({
                    'username' : email,
                    'password' : password
                })
            }
        ).then((res) => {
            if (res.status === 200) {
                setUserId(res.body.id);
                setUser(res.body);
                document.cookie = `userId=${res.body.id}`;
                nav('/home', {state:{userId:userId, role:res.body.type}});
            } else {
                setShowError(true);
            }
        }).catch((err) => {
            setShowError(true);
        })
        // setUserId(12);
        // setUser({
        //     username:'k',
        //     password:'hi',
        //     type:'Candidate'
        // });
        // console.log('user');
        // nav('/home', {state:{userId:userId, role:user.type}});
    }

    return (
        <>
            <form onSubmit={handleLogin}>
                <input type="text" name="email" placeholder="Email" onChange={e => setEmail(e.target.value)} value={email}></input>
                <input type="text" name="password" placeholder="Password" onChange={e => setPassword(e.target.value)} value={password}></input>
                <input type="submit"></input>
            </form>
            <p style={{color:'red', display:showError?'inline-block':'none'}}>Incorrect credentials. Please register or retry</p>
        </>
    )
}

export default Login;