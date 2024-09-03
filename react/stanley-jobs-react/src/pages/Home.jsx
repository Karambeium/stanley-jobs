import JobsList from '../components/JobsList';

function Home({ userId, role }) {
    return (
        <>
            <p>Home Page</p>
            <JobsList style={{display:role==='Candidate'?'block':'none'}} userId={userId} role={role}/>
        </>
    )
}

export default Home;