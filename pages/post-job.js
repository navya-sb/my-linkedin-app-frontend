import { useState } from 'react';
import axios from 'axios';

export default function PostJob() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [salary, setSalary] = useState('');
    const [employerId, setEmployerId] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const jobData = {
            title,
            description,
            salary,
            employer_id: employerId,
        };

        try {
            const response = await axios.post('http://localhost:8000/api/job-posts', jobData);
            alert('Job posted successfully');
            // Clear the form
            setTitle('');
            setDescription('');
            setSalary('');
            setEmployerId('');
        } catch (error) {
            console.error(error);
            alert('Failed to post job');
        }
    };

    return (
        <div>
            <h1>Post a New Job</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Job Title:</label>
                    <input 
                        type="text" 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Job Description:</label>
                    <textarea 
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Salary:</label>
                    <input 
                        type="number" 
                        value={salary}
                        onChange={(e) => setSalary(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Employer ID:</label>
                    <input 
                        type="number" 
                        value={employerId}
                        onChange={(e) => setEmployerId(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Post Job</button>
            </form>
        </div>
    );
}
