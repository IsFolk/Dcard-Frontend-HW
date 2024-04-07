import { fetchIssues } from "./issueList";
import { IssuesUnit } from "./issues_unit";
import { LoadMore } from "./load-more";
import {MyNavBar} from "./blog-components/navbar";

const BlogPage = async () => {
  const issuesData = await fetchIssues(1); //先抓一些資料讓使用者有東西看 之後再10筆10筆的加
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