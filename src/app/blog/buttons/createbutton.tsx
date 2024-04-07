import { Octokit } from "@octokit/core";
import { useState } from "react";

const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN
});

interface CreateButtonProps {
    owner: string;
    repo: string;
}

const CreateButton: React.FC<CreateButtonProps> = ({ owner, repo }) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    const handleCreateIssue = async () => {
        try {
            setIsLoading(true);
            await octokit.request('POST /repos/{owner}/{repo}/issues', {
                owner: owner,
                repo: repo,
                title: title,
                body: body,
                headers: {
                    'X-GitHub-Api-Version': '2022-11-28'
                }
            });
            setIsLoading(false);
            alert('Issue created successfully!');
            setIsPopupOpen(false);
            setTitle('');
            setBody('');
        } catch (error) {
            setIsLoading(false);
            console.error('Error creating issue:', error);
            alert('Failed to create issue. Please try again later.');
        }
    };

    return (
        <div>
            <button style={{ background: "grey", border: "1px solid black", borderRadius: '5px', padding: '5px 10px', margin: '5px' }} onClick={() => setIsPopupOpen(true)}>新增Blog</button>
            {isPopupOpen && (
                <div className="popup" style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
                    <div className="popup-content">
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter New title"
                        />
                        <br />
                        <textarea
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            placeholder="Enter New body"
                        />
                        <button onClick={handleCreateIssue} disabled={isLoading}>
                            {isLoading ? 'Creating...' : 'Create Issue'}
                        </button>
                        <button onClick={() => setIsPopupOpen(false)}>Close</button>



                        {/* <form onSubmit={handleCreateIssue}>
                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter title" />
                            <br/>
                            <textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder="Enter body"></textarea>
                            <br/>
                            <button type="submit" style={{ background: "grey", border: "1px solid black", borderRadius: '5px', padding: '5px 10px', margin: '5px' }}>Submit</button>
                            <button onClick={() => setIsPopupOpen(false)} style={{ background: "grey", border: "1px solid black", borderRadius: '5px', padding: '5px 10px', margin: '5px' }}>Cancel</button>
                        </form> */}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreateButton;
