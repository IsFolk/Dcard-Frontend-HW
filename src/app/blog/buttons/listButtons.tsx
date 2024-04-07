import React, { useState } from "react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import UpdateBlog from './updateButton';
import IssuePopup from "./viewButton";
import { closeIssue } from './closeButton';

import { Issue, Comments } from "../types";




  interface ButtonListProps {
    issue: Issue;
    isAuthor: boolean;
  }

  const ButtonList = ({ issue, isAuthor }: ButtonListProps) => {
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

    const handleIssueClose = async () => {
        await closeIssue(issue);
        window.location.reload();
    }
    return (
        <div>
        <Dropdown>
        <DropdownTrigger>
            <Button variant="bordered">Actions</Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Action event example" disabledKeys={isAuthor? [] : ["edit", "delete"]}>            
        <DropdownItem key="view" onClick={handleIssueClick}>View Blog</DropdownItem>
                <DropdownItem key="edit" onClick={handleUpdateOpen}>Edit Blog</DropdownItem>
                <DropdownItem key="delete" onClick={handleIssueClose} className="text-danger" color="danger">
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