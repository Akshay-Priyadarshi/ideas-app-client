import { Idea } from "../../customs/idea";
import DisplayName from "../display-name/DisplayName";
import Dp from "../dp/Dp";
import styles from "./FeedIdea.module.css";

interface FeedIdeaProps {
    idea: Idea;
}

const FeedIdea: React.FC<FeedIdeaProps> = ({ idea }) => {
    const profile = idea.ideator.profile;

    return (
        <div className={styles.feedIdea}>
            <Dp profile={profile} />
            <div>
                <h3>
                    <DisplayName profile={profile} />
                </h3>
                <h3>{idea.title}</h3>
            </div>
        </div>
    );
};

export default FeedIdea;
