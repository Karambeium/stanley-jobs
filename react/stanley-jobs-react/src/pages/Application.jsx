import { useState } from 'react';
import { useLocation } from 'react-router-dom';

function Application() {

    const {job, userId, role, user} = useLocation().state;
    const[formData, setFormData] = useState({
        coverLetter : ''
    });

    const handleApply = (event) => {
        event.preventDefault();
        console.log('appplication',userId);
        fetch(`http://localhost:8080/candidates/${userId}`)
        .then((res) => res.json())
        .then((candidate) => {
            fetch("http://localhost:8080/applications", {
                method: 'POST',
                body: JSON.stringify({
                    jobId : job.jobId,
                    userId : userId,
                    dateApplied : new Date().toISOString().slice(0, 10),
                    coverLetter : formData.coverLetter,
                    customResume : candidate.resume
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
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
            <p>Job Descrption</p>
            <p>Position : {job.jobTitle}</p>
            <p>Department : {job.department}</p>
            <p>Description : {job.jobDescription}</p>
            <p>Additional Information : {job.additionalInformation}</p>
            <form onSubmit={handleApply}>
                <div className="form-group">
                    <label>Cover Letter:</label>
                    <textarea
                        name="coverLetter"
                        value={formData.coverLetter}
                        onChange={handleInputChange}
                    />
                </div>
                <input type="submit"></input>
            </form>
        </>
    )
}

export default Application;