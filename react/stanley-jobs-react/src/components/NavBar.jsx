import { Link } from 'react-router-dom';

function NavBar() {
    return (
        <>
            <nav>
                <ul>
                    <li><Link to='/login'>Login</Link></li>
                    <li><Link to='/register'>Register</Link></li>
                    <li><Link to='/home'>Home</Link></li>
                </ul>
            </nav>
        </>
    )
}

export default NavBar;