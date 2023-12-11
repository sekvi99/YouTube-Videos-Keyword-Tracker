export interface IUser {
    username: string;
    roleId: number;
}

export enum UserRole {
    User = 1, // Basic User
    Admin = 2 // Admin
}

export const DEFAULT_USER_VALUES: IUser = {
    username: '',
    roleId: UserRole.User,
}