// import styles from "./Tag.module.css";

interface Props {
    name: string;
}

const Tag: React.FC<Props> = ({ name }) => {
    return (
        <>
            <h1>{name}</h1>
        </>
    );
};

export default Tag;
