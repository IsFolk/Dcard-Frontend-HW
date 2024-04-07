import { Octokit } from "@octokit/core";
import { useState } from "react";

const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN
});

interface CloseButtonProps {
    owner: string;
    repo: string;
    issue_number: number;
}

const CloseButton: React.FC<CloseButtonProps> = ({ owner, repo, issue_number }) => {

    const octokit = new Octokit({
        auth: process.env.GITHUB_TOKEN
    });

    const [isLoading, setIsLoading] = useState(false);

    const handleClosingIssue = async () => {
        try {
            setIsLoading(true);
            await octokit.request('PATCH /repos/{owner}/{repo}/issues/{issue_number}', {
                owner: owner,
                repo: repo,
                issue_number: issue_number,
                // Add any other parameters you want to update
                state: 'closed',
                headers: {
                    'X-GitHub-Api-Version': '2022-11-28'
                }
            });
            setIsLoading(false);
            alert('Closing issue successfully!');
        } catch (error) {
            setIsLoading(false);
            console.error('Error updating issue:', error);
            alert('Failed to update issue. Please try again later.');
        }
    };

    return (
        <button style={{ background: 'red' }} onClick={handleClosingIssue} disabled={isLoading}>
            {isLoading ? 'Closing...' : 'Closing Issue'}
        </button>
    );
};

export default CloseButton;
