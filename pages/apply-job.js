import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ApplyJob() {
    const [jobs, setJobs] = useState([]);
    const [jobId, setJobId] = useState('');
    const [candidateId, setCandidateId] = useState('');
    const [cvId, setCvId] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8000/api/job-posts')
            .then(response => setJobs(response.data))
            .catch(error => console.error(error));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const applicationData = {
            job_post_id: jobId,
            candidate_id: candidateId,
            cv_candidate_id: cvId,
        };

        try {
            const response = await axios.post('http://localhost:8000/api/applications', applicationData);
            alert('Application submitted successfully');
            // Clear the form
            setJobId('');
            setCandidateId('');
            setCvId('');
        } catch (error) {
            console.error(error);
            alert('Failed to submit application');
        }
    };

    return (
        <div>
            <h1>Apply for a Job</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Job:</label>
                    <select value={jobId} onChange={(e) => setJobId(e.target.value)} required>
                        <option value="">Select a job</option>
                        {jobs.map(job => (
                            <option key={job.id} value={job.id}>{job.title}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Candidate ID:</label>
                    <input 
                        type="text" 
                        value={candidateId}
                        onChange={(e) => setCandidateId(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>CV ID:</label>
                    <input 
                        type="text" 
                        value={cvId}
                        onChange={(e) => setCvId(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Submit Application</button>
            </form>
        </div>
    );
}
