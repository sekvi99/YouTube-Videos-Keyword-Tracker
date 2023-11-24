export interface IUserRegister {
    username: string;
    password: string;
    city: string;
    street: string;
    postalCode?: string;
    roleId: number;
}