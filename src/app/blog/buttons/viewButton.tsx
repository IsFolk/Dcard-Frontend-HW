import { Octokit } from "@octokit/core";
import { useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { Accordion, AccordionItem, Avatar } from "@nextui-org/react";
import Markdown from 'react-markdown';
import {Chip} from "@nextui-org/react";
import {Issue, Comments} from "../types";


interface IssuesProps {
    issues: Issue[] | null;
}

const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN
});

interface UpdateButtonProps {
    issue: Issue;
    isIssueClicked: boolean;  // Add this line
    onClose: () => void;  // Add this line
}

const IssuePopup = ({ issue, isIssueClicked, onClose }: UpdateButtonProps) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handleClose = () => {
        setIsPopupOpen(false);
        onClose();
    };

    useEffect(() => {
        setIsPopupOpen(isIssueClicked);  // Update isPopupOpen when updateOpen changes
        if (isIssueClicked) {
            handleIssueClick(issue);
        }
    }, [isIssueClicked]);


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
                content: comment.body,
                avatar_url: comment.user.avatar_url
            })
            );

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
            {isPopupOpen &&
                <Modal isOpen={isPopupOpen} onOpenChange={handleClose}>
                    <ModalContent>
                        {() => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">{selectedIssue?.title}</ModalHeader>
                                <ModalBody>
                                    <Markdown>
                                        {selectedIssue?.body}
                                    </Markdown>
                                    <Chip size="md">Comments</Chip>

                                    {selectedIssue?.comments.map((comment, index) => (
                                        <Accordion key={index} selectionMode="multiple">
                                            <AccordionItem
                                                key={index}
                                                aria-label={comment.user}
                                                startContent={
                                                    <Avatar
                                                        isBordered
                                                        color="primary"
                                                        radius="lg"
                                                        src={comment.avatar_url}
                                                    />
                                                }
                                                // subtitle="4 unread messages"
                                                title={comment.user}
                                            >



                                                <Markdown>
                                                    {comment.content}
                                                </Markdown>

                                            </AccordionItem>
                                        </Accordion>
                                    ))}



                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={handleClose}>
                                        Close
                                    </Button>
                                    {/* <Button color="primary" onPress={handleClose}>
                          Action
                        </Button> */}
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>









                // (
                //     <div className="popup" style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
                //         <div className="popup-content">
                //         <Textarea
                //                 variant="flat"
                //                 label="Title"
                //                 labelPlacement="outside"
                //                 placeholder="Enter your Title"
                //                 defaultValue= {selectedIssue?.title}
                //                 className="max-w-xs"
                //             />


                //             <Textarea
                //                 variant="flat"
                //                 label="Body"
                //                 labelPlacement="outside"
                //                 placeholder="Enter your body"
                //                 defaultValue= {selectedIssue?.body}
                //                 className="max-w-xs"
                //             />

                //             <h3>Comments:</h3>
                //                     <ul>
                //                     {selectedIssue?.comments.map((comment, index) => (
                //                         <li key={index}>
                //                         <strong>{comment.user}: </strong>
                //                         <Markdown remarkPlugins={[remarkGfm]}>{comment.content}</Markdown>
                //                         </li>
                //                     ))}
                //                     </ul>

                //             <div className="button-container">
                //                 {/* <Button size="sm" onClick={handleUpdateIssue} color="primary" isLoading = {isLoading}  isDisabled= {isLoading || isInvalid}>
                //                     {isLoading ? 'Updating...' : 'Update Issue'}
                //                 </Button> */}

                //                 <Button size="sm" onClick={handleClose}>Close</Button>
                //             </div>
                //         </div>
                //     </div>
                // )


            }
        </div>
    );
};

export default IssuePopup;
