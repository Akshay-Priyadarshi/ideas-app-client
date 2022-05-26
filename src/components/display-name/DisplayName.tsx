import React from "react";
import { Profile } from "../../models/profile.model";

interface DisplayNameProps {
    profile: Profile | undefined | null;
}

const DisplayName: React.FC<DisplayNameProps> = ({ profile }) => {
    return <>{profile && profile.name ? profile.name.full : "Unknown"}</>;
};

export default DisplayName;
