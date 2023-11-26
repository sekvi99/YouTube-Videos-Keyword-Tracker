export interface IUser {
    username: string;
    roleId: number
}

export enum UserRole {
    User = 0, // Basic User
    Admin = 1 // Admin
}

export const DEFAULT_USER_VALUES: IUser = {
    username: '',
    roleId: UserRole.User
}