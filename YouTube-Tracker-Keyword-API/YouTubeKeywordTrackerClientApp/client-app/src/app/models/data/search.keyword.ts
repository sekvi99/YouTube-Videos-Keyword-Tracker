import { IEntity } from '../entity';

export interface ISearchKeyword extends IEntity {
    keyword: string;
    userId: number;
    user?: string;
}