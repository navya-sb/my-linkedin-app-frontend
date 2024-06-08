import { useState } from 'react';
import axios from 'axios';

export default function UploadCV() {
    const [candidateId, setCandidateId] = useState('');
    const [file, setFile] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('candidate_id', candidateId);
        formData.append('file', file);

        try {
            await axios.post('/api/cvs', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('CV uploaded successfully');
        } catch (error) {
            console.error(error);
            alert('Failed to upload CV');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Candidate ID:</label>
                <input 
                    type="text" 
                    value={candidateId}
                    onChange={(e) => setCandidateId(e.target.value)}
                />
            </div>
            <div>
                <label>CV File:</label>
                <input 
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                />
            </div>
            <button type="submit">Upload CV</button>
        </form>
    );
}
