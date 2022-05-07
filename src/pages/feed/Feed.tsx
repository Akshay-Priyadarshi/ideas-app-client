import React from "react";
import FeedIdea from "../../components/feed-idea/FeedIdea";
import styles from "./Feed.module.css";

const Feed = () => {
    return (
        <div className={styles.feeds}>
            <FeedIdea />
            <FeedIdea />
            <FeedIdea />
            <FeedIdea />
            <FeedIdea />
        </div>
    );
};

export default Feed;
