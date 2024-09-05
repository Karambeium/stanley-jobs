import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import getCookie from '../components/cookieManager';
import { toast, ToastContainer } from 'react-toastify';

function Application({ setCounter, counter }) {

    const nav = useNavigate();

    const {job, userId, role, user, fetchAppliedJobs, appliedJobs, setAppliedJobs} = useLocation().state;
    const[formData, setFormData] = useState({
        coverLetter : ''
    });

    const handleApply = (event) => {
        event.preventDefault();
        console.log('appplication',userId);
        fetch(`http://localhost:8080/candidates/${getCookie('id')}`)
        .then((res) => res.json())
        .then((candidate) => 
            fetch("http://localhost:8080/applications", {
                method: 'POST',
                body: JSON.stringify({
                    jobId : job.id,
                    userId : getCookie('id'),
                    dateApplied : new Date().toISOString().slice(0, 10),
                    coverLetter : formData.coverLetter,
                    customResume : candidate.resume,
                    applicationStatus: 'Pending'
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        )
        .then(() => {
            setCounter(counter++);
            toast.success('Application Submitted Successfully!');
            setTimeout(() => {
                nav('/home');
            }, 1000);
            //fetchAppliedJobs();
            // window.reload();
        })
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
        console.log(formData);
    }

    return (
        <>
            <h1>Application for {job.listingTitle}</h1>
            <p>Job Description</p>
            <p>Position : {job.jobTitle}</p>
            <p>Department : {job.department}</p>
            <p>Description : {job.jobDescription}</p>
            <p>Additional Information : {job.additionalInformation}</p>
            <form onSubmit={handleApply}>
                <div className="form-group">
                    <textarea
                        name="coverLetter"
                        value={formData.coverLetter}
                        onChange={handleInputChange}
                        placeholder="Cover Letter"
                    />
                </div>
                <input type="submit"></input>
            </form>
            <ToastContainer></ToastContainer>
        </>
    )
}

export default Application;