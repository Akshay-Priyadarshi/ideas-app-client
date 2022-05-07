export interface IProfile {
    name: {
        first: string;
        middle?: string;
        last: string;
    };
    dob: {
        year?: number;
        month: number;
        day: number;
    };
    avatarUrl: string;
    updatedAt: string;
    createdAt: string;
}

export class Profile {
    name: {
        first: string;
        middle?: string;
        last: string;
    } | null;
    dob: {
        year?: number;
        month: number;
        day: number;
    } | null;
    avatarUrl: string;
    updatedAt: Date;
    createdAt: Date;

    constructor(_: IProfile) {
        _.name ? (this.name = _.name) : (this.name = null);
        _.dob ? (this.dob = _.dob) : (this.dob = null);
        this.avatarUrl = _.avatarUrl;
        this.createdAt = new Date(_.createdAt);
        this.updatedAt = new Date(_.updatedAt);
    }
}
