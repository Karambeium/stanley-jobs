import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import getCookie from './cookieManager';

const CandidateMyProfile = ({ candidateId }) => {
    const nav = useNavigate();

    const [myInfo, setMyInfo] = useState({
        full_name: '',
        email: '',
        address: '',
        phone: '',
        resume: ''
    });

    useEffect(() => {
        getInfo();
    },[]);

    const getInfo = () => {
        fetch(`http://localhost:8080/candidates/${getCookie('id')}`)
        .then(res => res.json())
        .then(info => setMyInfo(info))
    }

    const handleUpdate = (event) => {
        event.preventDefault();
        fetch(`http://localhost:8080/candidates/${getCookie('id')}`,
            {
                method:'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...myInfo }),
            }).then((res) => {
                if (res.ok) {
                    return res.json(); 
                } else {
                    throw new Error('Failed to update profile');
                }
            }).then(() => {
            toast.success('Profile updated successfully!');
            setTimeout(() => {
                nav('/home', {
                    state: { userId: getCookie('id'), role: getCookie('role') },
                });
            }, 3000);
            })
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setMyInfo((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
        // console.log(formData);
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
                <input value="Update" className="submitButton" type="submit"></input>
            </form>
            <ToastContainer/>
        </div>
    )

}

export default CandidateMyProfile;