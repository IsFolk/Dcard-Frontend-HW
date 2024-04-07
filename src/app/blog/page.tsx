import ExamplePage from "./issues";
import Pagination from "./scroll";
import { fetchIssues } from "./issueList";
import { IssuesUnit } from "./issues_unit";
import { LoadMore } from "./load-more";
import {NextUIProvider} from "@nextui-org/react";

const BlogPage = async () => {
  const issuesData = await fetchIssues(1);
  const issues = issuesData || null;

  return (
      <div>
        <h1>blog</h1>
        <IssuesUnit issues={issues} />
        {/* <Spinner /> */}
        <LoadMore />
      </div>
  );
};


export default BlogPage;