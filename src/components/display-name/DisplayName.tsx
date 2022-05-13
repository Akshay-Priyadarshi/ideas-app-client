import React from "react";
import { Profile } from "../../customs/profile";

interface DisplayNameProps {
    profile: Profile | undefined | null;
}

const DisplayName: React.FC<DisplayNameProps> = ({ profile }) => {
    return (
        <>
            {profile && profile.name
                ? profile.name.first + profile.name.last
                : "Unknown"}
        </>
    );
};

export default DisplayName;
