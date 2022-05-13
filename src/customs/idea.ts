import { IUser, User } from "./user";

export interface IIdea {
    _id: string;
    title: string;
    upvotes: number;
    downvotes: number;
    desc: string;
    ideator: IUser;
    ifIUpvoted: boolean;
    ifIDownvoted: boolean;
    createdAt: string;
    updatedAt: string;
}

export class Idea {
    id: string;
    title: string;
    desc: string;
    upvotes: number;
    downvotes: number;
    ideator: User;
    ifIUpvoted: boolean;
    ifIDownvoted: boolean;
    createdAt: Date;
    updatedAt: Date;

    constructor(_: IIdea) {
        this.id = _._id;
        this.title = _.title;
        this.desc = _.desc;
        this.upvotes = _.upvotes;
        this.downvotes = _.downvotes;
        this.ideator = new User(_.ideator);
        this.ifIUpvoted = _.ifIUpvoted;
        this.ifIDownvoted = _.ifIDownvoted;
        this.createdAt = new Date(_.createdAt);
        this.updatedAt = new Date(_.updatedAt);
    }
}
