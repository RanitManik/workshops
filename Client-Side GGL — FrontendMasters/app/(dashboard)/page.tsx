"use client";

import PageHeader from "../_components/PageHeader";
import { useState } from "react";
import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Spinner,
    Textarea,
    Tooltip,
    useDisclosure,
} from "@nextui-org/react";
import { PlusIcon } from "lucide-react";
import Issue from "../_components/Issue";
import { IssuesQuery } from "@/gql/issuesQuery";
import { useMutation, useQuery } from "@urql/next";
import { CreateIssueMutation } from "@/gql/createIssueMutation";

const IssuesPage = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [issueName, setIssueName] = useState("");
    const [issueDescription, setIssueDescription] = useState("");
    const [{ data, fetching, error }, replay] = useQuery({
        query: IssuesQuery,
    });
    const [newIssueResult, createNewIssue] = useMutation(CreateIssueMutation);

    const onCreate = async (close: any) => {
        const result = await createNewIssue({
            input: { name: issueName, content: issueDescription },
        });

        if (result.data) {
            await replay();
            close();
            setIssueName("");
            setIssueDescription("");
        }
    };
    return (
        <div>
            <PageHeader title="All issues">
                <Tooltip content="New Issue">
                    <button
                        className="text-white bg-black p-1 rounded-md"
                        onClick={onOpen}
                    >
                        <PlusIcon size={14} />
                    </button>
                </Tooltip>
            </PageHeader>

            {fetching && <Spinner />}
            {error && <div>error</div>}
            {data &&
                data.issues.map((issue: any) => (
                    <div key={issue.id}>
                        <Issue issue={issue} />
                    </div>
                ))}
            <Modal
                size="2xl"
                isOpen={isOpen}
                placement="top-center"
                onOpenChange={onOpenChange}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                <span className="text-sm text-black/70">
                                    New issue
                                </span>
                            </ModalHeader>
                            <ModalBody>
                                <div>
                                    <input
                                        autoFocus
                                        type="text"
                                        className="w-full border-none outline-none focus:outline-none focus:border-none py-2 text-xl text-black/70"
                                        placeholder="Issue name"
                                        value={issueName}
                                        onChange={(e) =>
                                            setIssueName(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="bg-white">
                                    <Textarea
                                        size="lg"
                                        variant="bordered"
                                        placeholder="Issue description"
                                        className="bg-white"
                                        value={issueDescription}
                                        onChange={(e) =>
                                            setIssueDescription(e.target.value)
                                        }
                                        classNames={{
                                            inputWrapper:
                                                "bg-white border-none shadow-none p-0",
                                            base: "bg-white p-0",
                                            input: "bg-white p-0",
                                            innerWrapper: "bg-white p-0",
                                        }}
                                    />
                                </div>
                            </ModalBody>
                            <ModalFooter className="border-t">
                                <Button
                                    variant="ghost"
                                    onPress={() => onOpenChange()}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant="solid"
                                    className="bg-black text-white"
                                    onPress={() => onCreate(onClose)}
                                >
                                    Create Issue
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
};

export default IssuesPage;
