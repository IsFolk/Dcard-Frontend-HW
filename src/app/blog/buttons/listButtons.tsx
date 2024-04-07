import React, { useState } from "react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import UpdateBlog from './updateButton';
import IssuePopup from "./viewButton";
import { Issue, Comments } from "../types";


  interface IssuesProps {
    issues: Issue[] | null;
  }

  interface ButtonListProps {
    issue: Issue;
  }

  const ButtonList = ({ issue }: ButtonListProps) => {
    const [isUpdateOpen, setUpdateOpen] = useState(false);
    const [isIssueClicked, setIsIssueClicked] = useState(false);

    const handleUpdateOpen = () => {
        setUpdateOpen(true);
    };

    const handleUpdateClose = () => {
        setUpdateOpen(false);
    };

    const handleIssueClick = () => {
        setIsIssueClicked(true);
    }

    const handleClosePopup = () => {
        setIsIssueClicked(false);
    }

    return (
        <div>
        <Dropdown>
        <DropdownTrigger>
            <Button variant="bordered">Actions</Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Action event example">
            <DropdownItem onClick={handleIssueClick}>View Blog</DropdownItem>
            <DropdownItem onClick={handleUpdateOpen}>Edit Blog</DropdownItem>
            <DropdownItem key="delete" className="text-danger" color="danger">
                Delete Blog
            </DropdownItem>
        </DropdownMenu>
        </Dropdown>
        {isUpdateOpen ? <UpdateBlog issue={issue} updateOpen={isUpdateOpen} onClose={handleUpdateClose} /> : null}
        {isIssueClicked? <IssuePopup issue={issue} isIssueClicked={isIssueClicked} onClose={handleClosePopup} /> : null}

        </div>
    );
};
export default ButtonList;