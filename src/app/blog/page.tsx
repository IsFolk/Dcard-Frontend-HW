import { fetchIssues } from "./issueList";
import { IssuesUnit } from "./issues_unit";
import { LoadMore } from "./load-more";
import {MyNavBar} from "./blog-components/navbar";

const BlogPage = async () => {
  const issuesData = await fetchIssues(1);
  const issues = issuesData || null;

  

  return (
      <div>
        <MyNavBar/>
        <IssuesUnit issues={issues} />
        <LoadMore />
      </div>
  );
};


export default BlogPage;