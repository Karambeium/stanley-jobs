import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import getCookie from '../components/cookieManager';
import { toast, ToastContainer } from 'react-toastify';


function Register({ setUser, user, setRole, setUserId }) {
    const nav=useNavigate();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        addressLine: '',
        city: '',
        state: '',
        zipCode: '',
        phone: '',
        resume: '',
        password: ''
    });

    const handleRegister = (event) => {
        event.preventDefault();

        const newUser = {
            full_name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            address: `${formData.addressLine}, ${formData.city}, ${formData.state} ${formData.zipCode}`,
            phone: formData.phone,
            resume: formData.resume,
            password: formData.password
        };

        fetch("http://localhost:8080/register", {
            method: 'POST',
            body: JSON.stringify(newUser),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => res.json())
            .then((user) => {
                setUser(user);
                setUserId(user.id);
                setRole(user.type);
                document.cookie = `id=${user.id}`;
                document.cookie = `role=${user.type}`;
                toast.success('Registered successfully!');
                setTimeout(() => {
                    nav('/home', {state:{userId:user.id, role:user.type}});
                }, 1000);
            })

        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            addressLine: '',
            city: '',
            state: '',
            zipCode: '',
            phone: '',
            resume: '',
            password: ''
        });
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    }

    return (
        <>
            <div className='register-container'>
                <div className='register-form'>
                    <h2>Sign Up</h2>
                    <form onSubmit={handleRegister}>
                        <input type="text" name="firstName" placeholder="First Name" onChange={handleInputChange} value={formData.firstName}></input>
                        <input type="text" name="lastName" placeholder="Last Name" onChange={handleInputChange} value={formData.lastName}></input>
                        <input type="text" name="email" placeholder="Email" onChange={handleInputChange} value={formData.email}></input>
                        <input type="text" name="addressLine" placeholder="Address Line" onChange={handleInputChange} value={formData.addressLine}></input>
                        <input type="text" name="city" placeholder="City" onChange={handleInputChange} value={formData.city}></input>
                        <input type="text" name="state" placeholder="State" onChange={handleInputChange} value={formData.state}></input>
                        <input type="text" name="zipCode" placeholder="Zipcode" onChange={handleInputChange} value={formData.zipCode}></input>
                        <input type="text" name="phone" placeholder="Phone Number" onChange={handleInputChange} value={formData.phone}></input>
                        <textarea name="resume" placeholder="Resume" onChange={handleInputChange} value={formData.resume}></textarea>
                        <input type="password" name="password" placeholder="Password" onChange={handleInputChange} value={formData.password}></input>
                        <input type="submit"></input>
                    </form>
                </div>
            </div>
            <ToastContainer></ToastContainer>
        </>
    );
}

export default Register;
