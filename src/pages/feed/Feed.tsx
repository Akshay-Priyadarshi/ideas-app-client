import axios from "axios";
import { useQuery } from "react-query";
import FeedIdea from "../../components/feed-idea/FeedIdea";
import { Idea, IIdea } from "../../models/idea.model";
import { ServerSuccessResponse } from "../../customs/server";
import useAuth from "../../hooks/useAuth";
import styles from "./Feed.module.css";

const Feed = () => {
    const { loginData } = useAuth();

    const {
        isLoading,
        isError,
        error,
        data: getIdeasRes,
    } = useQuery("getIdeas", () =>
        axios.get<ServerSuccessResponse, ServerSuccessResponse>("/ideas", {
            headers: {
                Authorization: loginData?.accessToken as string,
            },
        })
    );

    if (isLoading) {
        return <h3>Loading....</h3>;
    }

    if (isError) {
        return <h3>{JSON.stringify(error)}</h3>;
    }

    return (
        <div className={styles.feeds}>
            <>
                {getIdeasRes?.data.length === 0 ? (
                    <div>No ideas to show</div>
                ) : (
                    getIdeasRes?.data.map((i: IIdea) => {
                        const idea = new Idea(i);
                        return <FeedIdea idea={idea} key={idea.id} />;
                    })
                )}
            </>
        </div>
    );
};

export default Feed;
