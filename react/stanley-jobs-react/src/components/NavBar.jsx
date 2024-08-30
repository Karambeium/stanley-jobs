import { Link } from 'react-router-dom';
import {useEffect} from 'react';

function NavBar({userId, userName, role}) {

    useEffect(() => {
        console.log('navbar log', userId);
        console.log('navbar log', userName);
    })

    return (
        <>
            <nav style={{position:'fixed', top:'0', right:'0', display:'inline-flex', gap:'20px', backgroundColor:'lightgreen'}}>
                <Link to='/users' style={{display:role==='admin'?'block':'none'}}>Manage Users</Link>
                <Link to='/login' style={{display:!userId?'inline':'block'}}>Login</Link>
                <Link to='/register' style={{display:!userId?'inline':'block'}}>Register</Link>
                <Link to='/home'>Home</Link>
                <div style={{display:userId?'inline':'block', color:'black'}}>Welcome, {userName}</div>
            </nav>
        </>
    )
}

export default NavBar;