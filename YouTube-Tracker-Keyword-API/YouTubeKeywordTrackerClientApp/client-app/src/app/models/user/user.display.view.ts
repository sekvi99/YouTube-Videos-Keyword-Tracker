import { ISearchKeyword } from "../data/search.keyword";
import { IEntity } from '../entity';

export interface IUserDisplayView extends IEntity{
    username: string;
    addressCity: string;
    addressStreet: string;
    addressPostalCode?: string;
    roleId: number;
    keywords: ISearchKeyword[]
}