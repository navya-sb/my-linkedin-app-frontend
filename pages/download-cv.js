import { useState, useEffect } from 'react';
import axios from 'axios';

export default function DownloadCV() {
    const [cvs, setCVs] = useState([]);

    useEffect(() => {
        axios.get('/api/cvs')
            .then(response => setCVs(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div>
            <h1>Download CVs</h1>
            <ul>
                {cvs.map(cv => (
                    <li key={cv.id}>
                        <a href={cv.file_path} download>{cv.file_path}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
}
