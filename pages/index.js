import { useRouter } from 'next/router';

export default function Home() {
    const router = useRouter();

    const handleEmployerClick = () => {
        router.push('/employer');
    };

    const handleCandidateClick = () => {
        router.push('/candidate');
    };

    return (
        <div>
            <h1>Welcome to the Job Portal</h1>
            <div>
                <button onClick={handleEmployerClick}>Employer</button>
                <button onClick={handleCandidateClick}>Candidate</button>
            </div>
        </div>
    );
}
