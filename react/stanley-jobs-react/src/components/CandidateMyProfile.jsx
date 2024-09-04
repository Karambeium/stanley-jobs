import { useState, useEffect } from 'react';

const CandidateMyProfile = ({ candidateId }) => {

    const[myInfo, setMyInfo] = useState({});

    useEffect(() => {
        getInfo();
    },[]);

    const getInfo = () => {
        fetch(`http://localhost:8080/candidates/${candidateId}`)
        .then(res => res.json())
        .then(info => setMyInfo(info))
    }

    const handleUpdate = () => {
        fetch(`http://localhost:8080/candidates/${candidateId}`,
            {
                method:'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...myInfo }),
            }
        )
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setMyInfo((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
        console.log(formData);
    }

    return (
        <div>
            <h2>My Profile</h2>
            <form onSubmit={handleUpdate}>
                <input type="text" name="full_name" placeholder="Full Name" disabled={true} value={myInfo.full_name}></input>
                <input type="text" name="email" placeholder="Email" disabled={true} value={myInfo.email}></input>
                <input type="text" name="address" placeholder="Address" onChange={handleInputChange} value={myInfo.address}></input>
                <input type="text" name="phone" placeholder="Phone Number" onChange={handleInputChange} value={myInfo.phone}></input>
                <textarea name="resume" placeholder="Resume" onChange={handleInputChange} value={myInfo.resume}></textarea>
                <input type="submit"></input>
            </form>
        </div>
    )

}

export default CandidateMyProfile;