// components/ExamplePage.tsx
"use client";
import { useEffect, useState } from "react";
import { Octokit } from "@octokit/core";
import axios from 'axios';
import { useSession, getSession } from "next-auth/react";
import config from '../../../next.config.mjs'
import UpdateButton from "./buttons/updateButton";
import "../globals.css";
import CreateButton from "./buttons/createbutton";
import CloseButton from "./buttons/closeButton";



const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
});

interface Issue {
  title: string;
  body: string;
  issue_number: number;
  state: string;
  comments: Comments[];
};

interface Comments {
  user: string;
  content: string;
};


const ExamplePage = () => {
  const [myOwner, setmyOwnerName] = useState<String | null>(null);
  const [mySessionName, setMySessionName] = useState<String | null>(null);
  const [isAuthor, setIsAuthor] = useState<Boolean>(false);
  const [myIssues, setmyIssues] = useState<Issue[]>([]);



  useEffect(() => {
    fetchOwner();
    fetchIssues();
    getSessionInfo();
  }, []);

  useEffect(() => {
    if (myOwner && mySessionName) {
      setIsAuthor(CheckIsAuthor());
    }
  }, [myOwner, mySessionName]);

  async function fetchOwner() {
    var issue_number = 1;
    try {
      const response = await octokit.request('GET /repos/{owner}/{repo}', {
        owner: 'IsFolk',
        repo: 'Dcard-Frontend-HW',
        issue_number: issue_number,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        }
      });
      const data = response.data;

      if (data) {
        setmyOwnerName(data.owner.login ?? null);
      }

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }


  async function fetchIssues() {
    try {
      const response = await octokit.request('GET /repos/{owner}/{repo}/issues', {
        owner: 'IsFolk',
        repo: 'Dcard-Frontend-HW',
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        }
      });
      const data = response.data;

      if (data && data.length > 0) {
        const extractedIssues = await Promise.all(data.map(async (issue: any) => {
          return {
            title: issue.title,
            body: issue.body,
            issue_number: issue.number,
            owner: 'IsFolk',
            repo: 'Dcard-Frontend-HW',
            state: issue.state,
            comment: [],
          };
        }));
        // console.log(extractedIssues);
        const updatedIssues: Issue[] = extractedIssues.map((issue: any) => ({
          ...issue,
          comments: [] // Add an empty array for comments
        }));
        setmyIssues(updatedIssues);
      }

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function getSessionInfo() {
    // 獲取當前登入用戶 ID
    const session = await getSession();

    const currentUserName = session?.user?.name ?? null;
    setMySessionName(currentUserName);
    // console.log("CURRENT SESSION NAME:" + mySessionName);
  }

  function CheckIsAuthor() {
    console.log(myOwner);
    console.log(mySessionName);
    return myOwner === mySessionName;
  }

  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);

  const handleIssueClick = async (issue: Issue) => {
    setSelectedIssue(issue);
    try {
      const response = await octokit.request(`GET /repos/{owner}/{repo}/issues/{issue_number}/comments`, {
        owner: 'IsFolk',
        repo: 'Dcard-Frontend-HW',
        issue_number: issue.issue_number,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        }
      });
      const issueData = response.data;
      const comments: Comments[] = issueData.map((comment: any) => ({
        user: comment.user.login,
        content: comment.body
      }));
      setSelectedIssue(prevState => {
        if (prevState === null) {
          // Handle the case where prevState is null
          return null;
        }
      
        return {
          ...prevState,
          comments: comments
        };
      });
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };
  
  const handleClosePopup = () => {
    setSelectedIssue(null);
  };


  

  return (

    <div>

      {/* 新增 */}
      {isAuthor && (
        <CreateButton owner="IsFolk" repo="Dcard-Frontend-HW"></CreateButton>
      )}

      {myIssues.map((issue, index) => (
        issue.state === "open" && (
          <div key={index} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
            <h1>{issue.title}</h1>
            <p>{issue.body}</p>
            <button style={{ background: 'yellow' }} onClick={() => handleIssueClick(issue)}>查看更多</button>

            {isAuthor && (
              <div>
                <CloseButton owner="IsFolk" repo="Dcard-Frontend-HW" issue_number={issue.issue_number}></CloseButton>
                <UpdateButton owner="IsFolk" repo="Dcard-Frontend-HW" issue_number={issue.issue_number}></UpdateButton>
              </div>
            )}
          </div>
        )
      ))}

      {/* 悬浮视窗 */}
      {selectedIssue && (
        <div className="popup" style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
          <div className="popup-content">
            <h2>{selectedIssue.title}</h2>
            <p>{selectedIssue.body}</p>
            {/* 显示评论 */}
            <h3>Comments:</h3>
            <ul>
              {selectedIssue.comments.map((comment, index) => (
                <li key={index}>
                  <strong>{comment.user}: </strong>
                  {comment.content}
                </li>
              ))}
            </ul>
            <button onClick={handleClosePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};
export default ExamplePage;
