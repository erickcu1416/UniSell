export interface IUser {
    _id?: string | number;
    username?: string;
    email?: string;
    avatar?: string;
    userIdNoti?: string | number;
    pushToken?: string | number;
    member?: boolean;
}
