import { Link } from 'react-router-dom';
import {useEffect} from 'react';

function NavBar({userId, userName, role}) {

    function getCookie(c) {
        const cookies = document.cookie.split('; ');
        for (let cookie of cookies) {
            let [cookieName, cookieValue] = cookie.split('=');
            if (cookieName === c) {
                return cookieValue;
            }
        }
        return null;
    }

    useEffect(() => {
        // console.log('navbar log', userId);
        // console.log('navbar log', userName);
        console.log(getCookie('id'));
        console.log(getCookie('role'));
    })

    function logOut() {
        document.cookie='id=';
        document.cookie='role=';
        console.log(document.cookie);
        console.log(getCookie('role'));
        window.reload();
    }

    return (
        <>
            <nav style={{
    position: 'fixed', 
    top: '0', 
    left: '0', 
    width:'100vw',
    display: 'inline-flex', 
    flexWrap: 'wrap', /* Allows links to wrap if they exceed available width */
    gap: '20px', 
    padding: '10px 20px', /* Added padding to ensure content stays within bounds */
    backgroundColor: 'lightgreen',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' // Optional: for better visual depth
  }}>
                <Link to='/users' style={{display:getCookie('role')==='Admin'?'block':'none'}}>Manage System</Link>
                <Link to='/login' style={{display:!getCookie('id')?'inline':'none'}}>Login</Link>
                <Link to='/register' style={{display:!getCookie('id')?'inline':'none'}}>Register</Link>
                <Link to='/home' style={{display:getCookie('id')?'block':'none'}}>Home</Link>
                <Link to='/candidateProfile' style={{display:getCookie('role')==='Candidate'?'inline':'none', color:'black'}}>My Profile</Link>
                <Link to='/managerDashboard' style={{display:getCookie('role')==='Hiring Manager'?'inline':'none', color:'black'}}>Manager Dashboard</Link>
                <Link to='/candidateApplications' style={{display:getCookie('role')==='Candidate'?'inline':'none'}}>My Applications</Link>
                <Link to='/login' style={{display:getCookie('id')?'inline':'none'}} onClick={logOut}>Log Out</Link>
            </nav>
        </>
    )
}

export default NavBar;