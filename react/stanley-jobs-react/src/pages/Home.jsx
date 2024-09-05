import JobsList from '../components/JobsList';
import ManagerDashboard from './ManagerDashboard';
import getCookie from '../components/cookieManager';

function Home({ userId, role, user }) {
    return (
        <>
            {
                getCookie('role')==='Candidate'?<JobsList userId={userId} role={role} user={user}/>:<></>
            }
            {
                getCookie('role')==='Hiring Manager'?<ManagerDashboard/>:<></>
            }
            
        </>
    )
}

export default Home;