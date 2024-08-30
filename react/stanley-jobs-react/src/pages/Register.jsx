import { useState } from 'react';

function Register({ setUser, user, setRole, setUserId }) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [addressLine, setAddressLine] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [phone, setPhone] = useState('');
    const [resume, setResume] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = (event) => {
        // TODO : post user to backend and set id and role accordingly
        event.preventDefault();
        setUser({
            name: `${firstName} ${lastName}`,
            email: email,
            address: `${addressLine} ${city} ${state} ${zipCode}`,
            phone: phone,
            resume: resume,
            password: password
        });
        setUserId(1); // TODO : remove
        setFirstName('');
        setLastName('');
        setEmail('');
        setAddressLine('');
        setCity('');
        setState('');
        setZipCode('');
        setPhone('');
        setResume('');
        setPassword('');
        setRole('candidate');
        console.log('register log', user);
    }

    return (
        <>
            <p>Register Page</p>
            <form onSubmit={handleRegister}>
                <input type="text" name="firstName" placeholder="First Name" onChange={e => setFirstName(e.target.value)} value={firstName}></input>
                <input type="text" name="lastName" placeholder="Last Name" onChange={e => setLastName(e.target.value)} value={lastName}></input>
                <input type="text" name="email" placeholder="Email" onChange={e => setEmail(e.target.value)} value={email}></input>
                <input type="text" name="addressLine" placeholder="Address Line" onChange={e => setAddressLine(e.target.value)} value={addressLine}></input>
                <input type="text" name="city" placeholder="City" onChange={e => setCity(e.target.value)} value={city}></input>
                <input type="text" name="state" placeholder="State" onChange={e => setState(e.target.value)} value={state}></input>
                <input type="text" name="zipcode" placeholder="Zipcode" onChange={e => setZipCode(e.target.value)} value={zipCode}></input>
                <input type="text" name="phone" placeholder="Phone Number" onChange={e => setPhone(e.target.value)} value={phone}></input>
                <textarea name="resume" placeholder="Resume" onChange={e => setResume(e.target.value)} value={resume}></textarea>
                <input type="password" name="password" placeholder="Password" onChange={e => setPassword(e.target.value)} value={password}></input>
                <input type="submit"></input>
            </form>
        </>
    )
}

export default Register;