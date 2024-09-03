import JobsList from '../components/JobsList';

function Home({ userId, role, user }) {
    return (
        <>
            <h2>Home Page</h2>
            <JobsList style={{display:role==='Candidate'?'block':'none'}} userId={userId} role={role} user={user}/>
        </>
    )
}

export default Home;