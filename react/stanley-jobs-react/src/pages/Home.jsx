import JobsList from '../components/JobsList';
import ManagerDashboard from './ManagerDashboard';
import getCookie from '../components/cookieManager';

function Home({ userId, role, user, counter, setCounter }) {
    return (
        <>
            {
                getCookie('role')==='Candidate'?<JobsList userId={getCookie('id')} role={role} user={user} counter={counter} setCounter={setCounter}/>:<></>
            }
            {
                getCookie('role')==='Hiring Manager'?<ManagerDashboard/>:<></>
            }
            
        </>
    )
}

export default Home;