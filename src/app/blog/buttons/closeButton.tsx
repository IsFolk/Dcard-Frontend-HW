// closeIssue.ts

// function for closing issue
import { Octokit } from "@octokit/core";
import { Issue } from "../types";

const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN
});

export async function closeIssue(issue: Issue) {
    try {
        await octokit.request('PATCH /repos/{owner}/{repo}/issues/{issue_number}', {
            owner: process.env.NEXT_PUBLIC_GITHUB_OWNER || '',
            repo: process.env.NEXT_PUBLIC_GITHUB_REPO || '',
            issue_number: issue.issue_number,
            state: 'closed',
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        });

        console.log("try closing");
        alert('Closing issue successfully!');
    } catch (error) {
        console.error('Error updating issue:', error);
        alert('Failed to close issue. Please try again later.');
    }
}