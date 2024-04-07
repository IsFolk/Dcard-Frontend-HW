// function for opening issue

import { Octokit } from "@octokit/core";
import { useEffect, useState } from "react";
import {Textarea, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link} from "@nextui-org/react";

const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN
});

interface CreateButtonProps {
    owner: string;
    repo: string;
}

const CreateButton: React.FC<CreateButtonProps> = ({ owner, repo }) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [isInvalid, setIsInvalid] = useState(false);
    const [isTitleInvalid, setIsTitleInvalid] = useState(false);

    const handleClose = () => {
        setIsPopupOpen(false);
    };


    useEffect(() => {
        setIsInvalid(body.length < 30);
    }, [body]);

    useEffect(() => {
        console.log(title);
        setIsTitleInvalid(title.length === 0);
    }, [title]);

    
    const handleCreateIssue = async () => {
        try {
            setIsLoading(true);
            await octokit.request('POST /repos/{owner}/{repo}/issues', {
                owner: owner,
                repo: repo,
                title: title,
                body: body,
                headers: {
                    'X-GitHub-Api-Version': '2022-11-28'
                }
            });
            setIsLoading(false);
            alert('Issue created successfully!');
            setIsPopupOpen(false);
            window.location.reload(); // Add this line to refresh the page
        } catch (error) {
            setIsLoading(false);
            console.error('Error creating issue:', error);
            alert('Failed to create issue. Please try again later.');
        }
    };

    return (
        <div>
            <Button onClick={() => setIsPopupOpen(true)}> New Blog</Button>
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
                                    <Button color="primary" onPress={handleCreateIssue} isLoading = {isLoading}  isDisabled= {isLoading || isInvalid || isTitleInvalid}>
                                    {isLoading ? 'Creating...' : 'Create Issue'}
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

export default CreateButton;
