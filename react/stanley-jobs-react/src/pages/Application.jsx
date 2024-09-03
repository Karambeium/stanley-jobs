import { useState } from 'react';
import { useLocation } from 'react-router-dom';

function Application() {

    const {job, userId, role} = useLocation().state;
    const[formData, setFormData] = useState({
        coverLetter : ''
    });

    const handleApply = (event) => {
        fetch("http://localhost:8080/application", {
            method: 'POST',
            body: {
                jobId : job.jobId,
                userId : userId,
                dateApplied : new Date().toISOString().slice(0, 10),
                coverLetter : formData.coverLetter
            }
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
                    <label>Job Description:</label>
                    <textarea
                        name="coverLetter"
                        value={formData.coverLetter}
                        onChange={handleInputChange}
                    />
                </div>
            </form>
        </>
    )
}

export default Application;