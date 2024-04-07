"use client";
import ButtonList from "./buttons/listButtons";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image } from "@nextui-org/react";
import { Issue } from './types';
import { Chip } from "@nextui-org/react";
import { useSession, getSession } from "next-auth/react";
import { useState } from "react";



interface IssuesProps {
    issues: Issue[] | null;
}

export function IssuesUnit({ issues }: IssuesProps) {
    
    return (
        <div>
            {issues &&
                issues.filter(issue => issue !== undefined).map((issue: Issue, index: number) => (
                    <div key={index} className="flex justify-center items-center">
                        <Card isBlurred className="border-none bg-background/60 dark:bg-default-100/50 min-w-[600px] max-w-[600px] min-h-[300px] mb-8">
                            <CardHeader className="flex justify-between">
                                <div className="flex gap-3">
                                    <Image
                                        alt="nextui logo"
                                        height={40}
                                        radius="sm"
                                        src={issue.owner.avatar_url}
                                        width={40}
                                    />
                                    <div className="flex flex-col">
                                        <p className="text-md">{issue.title}</p>
                                        <p className="text-small text-default-500">{issue.owner.login}</p>
                                    </div>
                                </div>
                                <ButtonList issue={issue} />
                            </CardHeader>
                            <Divider />
                            <CardBody style={{ whiteSpace: 'pre-line', wordWrap: 'break-word' }}>
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                    {issue.body && (issue.body.length > 100 ? issue.body.slice(0, 100) + '...' : issue.body)}
                                </ReactMarkdown>
                            </CardBody>                        <Divider />
                            <CardFooter>
                                {issue.labels.map((label, index) => (
                                    <Chip key={index} color="primary" variant="shadow">{label.name}</Chip>
                                ))}
                            </CardFooter>
                        </Card>
                    </div>








                ))}


        </div>
    );
}

export default IssuesUnit;