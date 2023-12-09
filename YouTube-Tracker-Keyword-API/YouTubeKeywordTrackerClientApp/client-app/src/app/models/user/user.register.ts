import { IEntity } from '../entity';

export interface IUserRegister extends IEntity {
    username: string;
    password: string;
    city: string;
    street: string;
    postalCode?: string;
    roleId: number;
}