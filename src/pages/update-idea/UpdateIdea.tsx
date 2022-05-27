import { useParams } from "react-router-dom";
import UpdateIdeaForm from "../../forms/update-idea-form/UpdateIdeaForm";

const UpdateIdea = () => {
    const { id } = useParams();

    return (
        <>
            <UpdateIdeaForm ideaId={id as string} />
        </>
    );
};

export default UpdateIdea;
