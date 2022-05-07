import { IProfile, Profile } from "./profile";

export enum UserRole {
    ADMIN = "ADMIN",
    USER = "USER",
}

interface IUser {
    _id: string;
    email: string;
    role: UserRole;
    verified: boolean;
    createdAt: string;
    updatedAt: string;
    profile: IProfile;
}

export class User {
    id: string;
    email: string;
    role: UserRole;
    verified: boolean;
    createdAt: Date;
    updatedAt: Date;
    profile: Profile | null;

    constructor(_: IUser) {
        this.id = _._id;
        this.email = _.email;
        this.role = _.role;
        this.verified = _.verified;
        this.createdAt = new Date(_.createdAt);
        this.updatedAt = new Date(_.updatedAt);
        _.profile
            ? (this.profile = new Profile(_.profile))
            : (this.profile = null);
    }
}
