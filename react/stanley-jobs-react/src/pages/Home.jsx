import JobsList from '../components/JobsList';

function Home({ userId, role }) {
    return (
        <>
<<<<<<< HEAD
            <h2>Home Page</h2>
            <JobsList />
=======
            <p>Home Page</p>
            <JobsList style={{display:role==='candidate'?'block':'none'}} userId={userId} role={role}/>
>>>>>>> 752af951bb0f31c6b569849f6e89081cdb6bc216
        </>
    )
}

export default Home;