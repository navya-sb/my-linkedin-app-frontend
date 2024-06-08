import Link from 'next/link';

export default function Candidate() {
    return (
        <div>
            <h1>Candidate Dashboard</h1>
            <nav>
                <ul>
                    <li>
                        <Link href="/upload-cv">Upload CV</Link>
                    </li>
                    <li>
                        <Link href="/apply-job">Apply for Job</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
