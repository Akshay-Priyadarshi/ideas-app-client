import classNames from "classnames";
import {
    MdDeleteOutline,
    MdMoreVert,
    MdOutlineThumbDown,
    MdOutlineThumbUp,
    MdThumbDown,
    MdThumbUp,
    MdUpdate,
} from "react-icons/md";
import { useQueryClient, useMutation } from "react-query";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { DeleteVariable } from "../../api/helpers";
import { Idea } from "../../models/idea.model";
import {
    ServerErrorResponse,
    ServerSuccessResponse,
} from "../../customs/server";
import { errorMessagesHandler } from "../../helpers/error.helper";
import { toTitleCase } from "../../helpers/string.helper";
import { successMessagesHandler } from "../../helpers/success.helper";
import useAuth from "../../hooks/useAuth";
import DisplayName from "../display-name/DisplayName";
import Dp from "../dp/Dp";
import styles from "./FeedIdea.module.css";
import {
    downvoteIdeaApi,
    DownvoteIdeaVariable,
    upvoteIdeaApi,
    UpvoteIdeaVariable,
} from "../../api/idea.api";
import { deleteApi } from "../../api/crud.api";
import { Link } from "react-router-dom";
import { deleteUpvoteApi, DeleteUpvoteVariable } from "../../api/upvote.api";
import {
    deleteDownvoteApi,
    DeleteDownvoteVariable,
} from "../../api/downvote.api";

interface FeedIdeaProps {
    idea: Idea;
}

const FeedIdea: React.FC<FeedIdeaProps> = ({ idea }) => {
    const queryClient = useQueryClient();

    const { loginData } = useAuth();

    const deletIdeaMutation = useMutation<
        ServerSuccessResponse,
        ServerErrorResponse[] | unknown,
        DeleteVariable
    >("deleteIdea", {
        mutationFn: deleteApi("/ideas"),
        onSuccess: (res) => {
            res.message && successMessagesHandler(res.message);
            queryClient.invalidateQueries({ queryKey: "getIdeas" });
        },
        onError: (err) => {
            if (Array.isArray(err)) errorMessagesHandler(err);
            else console.log(err);
        },
    });

    const upvoteIdeaMutation = useMutation<
        ServerSuccessResponse,
        ServerErrorResponse[] | unknown,
        UpvoteIdeaVariable
    >("upvoteIdea", {
        mutationFn: upvoteIdeaApi(),
        onSuccess: (res) => {
            res.message && successMessagesHandler(res.message);
            queryClient.invalidateQueries({ queryKey: "getIdeas" });
        },
        onError: (err) => {
            if (Array.isArray(err)) errorMessagesHandler(err);
            else console.log(err);
        },
    });

    const downvoteIdeaMutation = useMutation<
        ServerSuccessResponse,
        ServerErrorResponse[] | unknown,
        DownvoteIdeaVariable
    >("downvoteIdea", {
        mutationFn: downvoteIdeaApi(),
        onSuccess: (res) => {
            res.message && successMessagesHandler(res.message);
            queryClient.invalidateQueries({ queryKey: "getIdeas" });
        },
        onError: (err) => {
            if (Array.isArray(err)) errorMessagesHandler(err);
            else console.log(err);
        },
    });

    const removeUpvoteMutation = useMutation<
        ServerSuccessResponse,
        ServerErrorResponse[] | unknown,
        DeleteUpvoteVariable
    >("deleteUpvote", {
        mutationFn: deleteUpvoteApi(),
        onSuccess: (res) => {
            res.message && successMessagesHandler(res.message);
            queryClient.invalidateQueries({ queryKey: "getIdeas" });
        },
        onError: (err) => {
            if (Array.isArray(err)) errorMessagesHandler(err);
            else console.log(err);
        },
    });

    const removeDownvoteMutation = useMutation<
        ServerSuccessResponse,
        ServerErrorResponse[] | unknown,
        DeleteDownvoteVariable
    >("deleteUpvote", {
        mutationFn: deleteDownvoteApi(),
        onSuccess: (res) => {
            res.message && successMessagesHandler(res.message);
            queryClient.invalidateQueries({ queryKey: "getIdeas" });
        },
        onError: (err) => {
            if (Array.isArray(err)) errorMessagesHandler(err);
            else console.log(err);
        },
    });

    const profile = idea.ideator.profile;

    return (
        <div className={styles.feedIdea}>
            <div className={styles.dp}>
                <Dp profile={profile} />
            </div>
            <div className={styles.head}>
                <div>
                    <h3 className={styles.name}>
                        <DisplayName profile={profile} />
                    </h3>{" "}
                    <h5 className={styles.position}>Scrum Designer</h5>
                </div>
                <div className={styles.quickActionTray}>
                    {idea.ideator.id === loginData?.loggedInUserId ? (
                        <>
                            <Tippy content="Delete Idea" duration={200}>
                                <button className={styles.quickActionButton}>
                                    <MdDeleteOutline
                                        className={classNames(
                                            styles.quickActionButtonIcon,
                                            styles.deleteIcon
                                        )}
                                        onClick={() =>
                                            deletIdeaMutation.mutate({
                                                id: idea.id,
                                                accessToken:
                                                    loginData.accessToken as string,
                                            })
                                        }
                                    />
                                </button>
                            </Tippy>
                            <Tippy content="Update Idea" duration={200}>
                                <button className={styles.quickActionButton}>
                                    <MdUpdate
                                        className={classNames(
                                            styles.quickActionButtonIcon,
                                            styles.deleteIcon
                                        )}
                                    />
                                </button>
                            </Tippy>
                        </>
                    ) : null}
                    <Tippy content="More" duration={200}>
                        <button className={styles.quickActionButton}>
                            <MdMoreVert
                                className={styles.quickActionButtonIcon}
                            />
                        </button>
                    </Tippy>
                </div>
            </div>
            <div className={styles.content}>
                <h3 className={styles.title}>{toTitleCase(idea.title)}</h3>
                <p className={styles.desc}>
                    {toTitleCase(idea.desc).substring(0, 200) + "... "}
                    <Link
                        to={`/dashboard/idea/${idea.id}`}
                        className={styles.readMore}
                    >
                        Read More
                    </Link>
                </p>
                <div className={styles.actionTray}>
                    {idea.ifIUpvoted ? (
                        <>
                            <Tippy
                                content={"Remove Upvote"}
                                duration={200}
                                placement="bottom"
                            >
                                <button className={styles.actionButton}>
                                    <MdThumbUp
                                        onClick={() =>
                                            removeUpvoteMutation.mutate({
                                                data: {
                                                    ideaId: idea.id,
                                                    userId: loginData?.loggedInUserId as string,
                                                },
                                                accessToken:
                                                    loginData?.accessToken as string,
                                            })
                                        }
                                        className={styles.actionButtonIcon}
                                    />
                                </button>
                            </Tippy>
                        </>
                    ) : (
                        <Tippy
                            content={"Upvote"}
                            duration={200}
                            placement="bottom"
                        >
                            <button className={styles.actionButton}>
                                <MdOutlineThumbUp
                                    className={styles.actionButtonIcon}
                                    onClick={() =>
                                        upvoteIdeaMutation.mutate({
                                            data: {
                                                ideaId: idea.id,
                                                userId: loginData?.loggedInUserId as string,
                                            },
                                            accessToken:
                                                loginData?.accessToken as string,
                                        })
                                    }
                                />
                            </button>
                        </Tippy>
                    )}
                    <p className={styles.actionText}>{idea.upvotes}</p>
                    {idea.ifIDownvoted ? (
                        <Tippy
                            content={"Remove Downvote"}
                            duration={200}
                            placement="bottom"
                        >
                            <button className={styles.actionButton}>
                                <MdThumbDown
                                    onClick={() =>
                                        removeDownvoteMutation.mutate({
                                            data: {
                                                ideaId: idea.id,
                                                userId: loginData?.loggedInUserId as string,
                                            },
                                            accessToken:
                                                loginData?.accessToken as string,
                                        })
                                    }
                                    className={styles.actionButtonIcon}
                                />
                            </button>
                        </Tippy>
                    ) : (
                        <Tippy
                            content={"Downvote"}
                            duration={200}
                            placement="bottom"
                        >
                            <button className={styles.actionButton}>
                                <MdOutlineThumbDown
                                    onClick={() =>
                                        downvoteIdeaMutation.mutate({
                                            data: {
                                                ideaId: idea.id,
                                                userId: loginData?.loggedInUserId as string,
                                            },
                                            accessToken:
                                                loginData?.accessToken as string,
                                        })
                                    }
                                    className={styles.actionButtonIcon}
                                />
                            </button>
                        </Tippy>
                    )}
                    <p>{idea.downvotes}</p>
                </div>
            </div>
        </div>
    );
};

export default FeedIdea;
