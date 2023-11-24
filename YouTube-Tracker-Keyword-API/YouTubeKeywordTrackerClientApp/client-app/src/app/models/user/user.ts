export interface IUser {
    token: string;
    username: string;
    role: UserRole
}

export enum UserRole {
    User = 0, // Basic User
    Admin = 1 // Admin
}

export const DEFAULT_USER_VALUES: IUser = {
    token: '',
    username: '',
    role: {} as UserRole
}