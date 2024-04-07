"use client"

import { useEffect, useState } from "react";
import { useInView } from 'react-intersection-observer';
import { CustomSpinner } from "./spinner";
import { fetchIssues } from "./issueList";
import IssuesUnit from "./issues_unit";
import { Issue } from "./types";


function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function LoadMore() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [pagesLoaded, setPagesLoaded] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const { ref, inView } = useInView();

  const LoadMoreIssues = async () => {
    await delay(2000);
    const nextPages = (pagesLoaded % 10) + 1;
    const newIssues = await fetchIssues(nextPages) ?? [];

    if (newIssues.length === 0) {
      setHasMore(false);
    } else {
      setIssues((prevIssues: Issue[]) => [...prevIssues, ...newIssues]);
      setPagesLoaded(nextPages);
    }
  }

  useEffect(() => {
    if (inView && hasMore) {
      console.log("scrolled to the end");
      LoadMoreIssues();
    }
  }, [inView, hasMore])

  return (
    <div>
      <IssuesUnit issues={issues} />
      <div ref={ref}>
        <div className="flex gap-4 justify-center items-center">
            {hasMore ? 
            <CustomSpinner />:
            <p>You have reached the end</p>}
        </div>
      </div>
    </div>
  );
}