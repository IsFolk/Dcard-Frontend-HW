"use server"
import { Octokit } from "@octokit/core";
  

const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN
  });
  
  export async function fetchIssues(page: number, perPage: number = 10) {
    try {
      const response = await octokit.request('GET https://api.github.com/repos/IsFolk/Dcard-Frontend-HW/issues', {
        owner: 'IsFolk',
        repo: 'Dcard-Frontend-HW',
        page: page,
        per_page: perPage,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
          'Cache-Control': 'no-cache',
        },
      });
      

        const data = response.data;
        console.log(data[0]);

        if (data && data.length > 0) {
            const extractedIssues = await Promise.all(data.map(async (issue: any) => {
                const labels = issue.labels.map((label: any) => {
                    return {
                      name: label.name,
                      color: label.color
                    }
                  });

              return {
                owner: {avatar_url: issue.user.avatar_url, login: issue.user.login},
                title: issue.title,
                body: issue.body,
                issue_number: issue.number,
                state: issue.state,
                comments: [], // Changed from 'comment' to 'comments'
                labels: labels
              };
            }));

            // const 
            return extractedIssues;
          }
    
      } catch (error) {
        console.error("Error fetching data:", error);
        return null;
      }
  
}