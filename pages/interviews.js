import { useEffect, useState } from 'react';
import axios from 'axios';

const Interviews = () => {
  const [interviews, setInterviews] = useState([]);
  const [newInterview, setNewInterview] = useState({ job_post_id: '', candidate_id: '', interview_date: '' });
  const [editInterview, setEditInterview] = useState(null);

  useEffect(() => {
    fetchInterviews();
  }, []);

  const fetchInterviews = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/interviews');
      setInterviews(response.data);
    } catch (error) {
      console.error('Error fetching interviews:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editInterview) {
      setEditInterview({ ...editInterview, [name]: value });
    } else {
      setNewInterview({ ...newInterview, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editInterview) {
        const response = await axios.put(`http://localhost:8000/api/interviews/${editInterview.id}`, editInterview);
        setInterviews(interviews.map((interview) => (interview.id === editInterview.id ? response.data : interview)));
        setEditInterview(null);
      } else {
        const response = await axios.post('http://localhost:8000/api/interviews', newInterview);
        setInterviews([...interviews, response.data]);
      }
      setNewInterview({ job_post_id: '', candidate_id: '', interview_date: '' });
    } catch (error) {
      console.error('Error saving interview:', error);
    }
  };

  const handleEdit = (interview) => {
    setEditInterview(interview);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/interviews/${id}`);
      setInterviews(interviews.filter((interview) => interview.id !== id));
    } catch (error) {
      console.error('Error deleting interview:', error);
    }
  };

  return (
    <div>
      <h1>Interviews</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="job_post_id"
          value={editInterview ? editInterview.job_post_id : newInterview.job_post_id}
          onChange={handleInputChange}
          placeholder="Job Post ID"
          required
        />
        <input
          type="number"
          name="candidate_id"
          value={editInterview ? editInterview.candidate_id : newInterview.candidate_id}
          onChange={handleInputChange}
          placeholder="Candidate ID"
          required
        />
        <input
          type="datetime-local"
          name="interview_date"
          value={editInterview ? editInterview.interview_date : newInterview.interview_date}
          onChange={handleInputChange}
          required
        />
        <button type="submit">{editInterview ? 'Update' : 'Add'} Interview</button>
      </form>
      <ul>
        {interviews.map((interview) => (
          <li key={interview.id}>
            <h2>Interview {interview.id}</h2>
            <p>Job Post ID: {interview.job_post_id}</p>
            <p>Candidate ID: {interview.candidate_id}</p>
            <p>Interview Date: {interview.interview_date}</p>
            <button onClick={() => handleEdit(interview)}>Edit</button>
            <button onClick={() => handleDelete(interview.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Interviews;
