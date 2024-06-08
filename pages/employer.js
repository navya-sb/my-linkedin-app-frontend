import Link from 'next/link';

export default function Employer() {
    return (
        <div>
            <h1>Employer Dashboard</h1>
            <nav>
                <ul>
                    <li>
                        <Link href="/post-job">Post Job</Link>
                    </li>
                    <li>
                        <Link href="/download-cv">Download CV</Link>
                    </li>
                    <li>
                        <Link href="/interviews">Schedule Interview</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
