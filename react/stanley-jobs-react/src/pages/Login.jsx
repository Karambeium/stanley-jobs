import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import getCookie from '../components/cookieManager.js'
import { toast, ToastContainer } from 'react-toastify';


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
                headers:{
                    'Content-Type':'application/json'
                },
                body : JSON.stringify({
                    'username' : email,
                    'password' : password
                })
            }
        ).then((res) => res.json())
        .then((res) => {
            console.log(res);
            setUserId(res.id);
            setUser(res);
            console.log(res.id,res.type);
            console.log(res);
            document.cookie = `id=${res.id}`;
            document.cookie = `role=${res.type}`;
            if(getCookie('role') == "Admin") {
                toast.success('Logged in successfully!');
                setTimeout(() => {
                    nav('/users', {state:{userId:getCookie('id'), role:res.type}});
                }, 500);
            }
            if(getCookie('role') == "Hiring Manager") {
                toast.success('Logged in successfully!');
                setTimeout(() => {
                    nav('/managerDashboard', {state:{userId:getCookie('id'), role:res.type}});
                }, 500);
            }
            if(getCookie('role') == "Candidate") {
                toast.success('Logged in successfully!');
                setTimeout(() => {
                    nav('/home', {state:{userId:getCookie('id'), role:res.type}});
                }, 500);
                
            }
            
        })
        .catch((err) => {
            setShowError(true);
        })
    }

    return (
        <>
        <div className='login-container'>
            <h2>Sign In</h2>
                <form onSubmit={handleLogin}>
                    <input type="text" name="email" placeholder="Email" onChange={e => setEmail(e.target.value)} value={email}></input>
                    <input type="password" name="password" placeholder="Password" onChange={e => setPassword(e.target.value)} value={password}></input>
                    <input type="submit"></input>
                </form>
                <p style={{color:'red', display:showError?'inline-block':'none'}}>Incorrect credentials. Please register or retry</p>
            <ToastContainer></ToastContainer>
            </div>
        </>
    )
}

export default Login;