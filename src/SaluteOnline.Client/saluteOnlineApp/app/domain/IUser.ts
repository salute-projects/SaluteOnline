export interface IUser {
    guid: string;
    id: number;
    username: string;
    password: string;
    email: string;
    isActive: boolean;
    emailVerified: boolean;
    role: number;
    name: string;
    lastName: string;
    phoneMain: string;
    phoneSecond: string;
    birthday: Date;
    avatar: string;
    state: string;
    city: string;
    hideProfile: boolean;
}