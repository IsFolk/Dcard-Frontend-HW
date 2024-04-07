import { Octokit } from "@octokit/core";
import { useEffect, useState } from "react";
import {Textarea} from "@nextui-org/react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link} from "@nextui-org/react";




interface Comments {
    user: string;
    content: string;
  }
  
  interface Issue {
    title: string;
    body: string;
    issue_number: number;
    state: string;
    comments: Comments[];
  }
  
  interface IssuesProps {
    issues: Issue[] | null;
  }

const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN
});

interface UpdateButtonProps {
    issue: Issue;
    updateOpen: boolean;  // Add this line
    onClose: () => void;  // Add this line
}

const UpdateBlog = ({ issue, updateOpen, onClose }: UpdateButtonProps) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [title, setTitle] = useState(issue.title);
    const [body, setBody] = useState(issue.body);

    const [isInvalid, setIsInvalid] = useState(false);
    const [isTitleInvalid, setIsTitleInvalid] = useState(false);


    const handleClose = () => {
        setIsPopupOpen(false);
        onClose();
    };

    useEffect(() => {
        setIsPopupOpen(updateOpen);  // Update isPopupOpen when updateOpen changes
    }, [updateOpen]);

    useEffect(() => {
        setIsInvalid(body.length < 30);
    }, [body]);

    useEffect(() => {
        console.log(title);
        setIsTitleInvalid(title.length === 0);
    }, [title]);


    const handleUpdateIssue = async () => {
        try {
            setIsLoading(true);
            await octokit.request('PATCH /repos/{owner}/{repo}/issues/{issue_number}', {
                owner: "IsFolk",
                repo: "Dcard-Frontend-HW",
                issue_number: issue.issue_number,
                title: title,
                body: body,
                headers: {
                    'X-GitHub-Api-Version': '2022-11-28'
                }
            });
            setIsLoading(false);
            alert('Issue updated successfully!');
            setIsPopupOpen(false);
            setTitle(title);
            setBody(body);
        } catch (error) {
            setIsLoading(false);
            console.error('Error updating issue:', error);
            alert('Failed to update issue. Please try again later.');
        }
    };

    return (
        <div>
            {isPopupOpen && (
                            <Modal 
                            placement="top-center"
                            isOpen={isPopupOpen}
                            onClose={handleClose}
                            >
                            <ModalContent>
                            {(onClose) => (
                                <>
                                <ModalHeader className="flex flex-col gap-1"></ModalHeader>
                                <ModalBody>
                                    <Input
                                    isInvalid={isTitleInvalid}
                                    autoFocus
                                    label="Title"
                                    placeholder="Enter your Title"
                                    defaultValue= {title}
                                    errorMessage= {isTitleInvalid? "Cannot be None." : ""}
                                    variant="bordered"
                                    onChange={(e) => setTitle(e.target.value)}
                                    />
                                    <Textarea
                                    isInvalid={isInvalid}
                                    autoFocus
                                    label="Body"
                                    placeholder="Enter your Body"
                                    type="text"
                                    variant="bordered"
                                    defaultValue= {body}
                                    errorMessage= {isInvalid? "Should be at least 30 characters long." : ""}
                                    onChange={(e) => setBody(e.target.value)}
                                    />
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="flat" onPress={handleClose}>
                                    Close
                                    </Button>
                                    <Button color="primary" onPress={handleUpdateIssue} isLoading = {isLoading}  isDisabled= {isLoading || isInvalid || isTitleInvalid}>
                                    {isLoading ? 'Updating...' : 'Update Issue'}
                                    </Button>
                                </ModalFooter>
                                </>
                            )}
                            </ModalContent>
                            </Modal>

            )}
        </div>
    );
};

export default UpdateBlog;
