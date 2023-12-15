import { createReducer, on } from '@ngrx/store';
import { IEntity } from '../../models/entity';
import { fetch, fetchError, fetchSuccess } from './data.actions';

export interface IDataState {
    isFetching: boolean;
    data: IEntity[]
}

export enum DataReducerEntity {
    Keywords = 'keywordsData',
    KeywordSingle = 'singleKeywordData',
    Users = 'usersData',
    Reports = 'reportsData'
}

const initialState: IDataState = {
    isFetching: false,
    data: [] as IEntity[]
}

const _dataReducer = createReducer(
    initialState,
    on(fetchSuccess, (state, action) => {
        return {
            ...state,
            data: action.collection
        };
    }),
    on(fetch, (state, action) => {
        return {
            ...state,
            isFetching: true
        }
    }),
    on(fetchError, (state, action) => {
        return {
            ...state,
            isFetching: false
        }
    })
);

export function dataReducer(state: any, action: any) {
    return _dataReducer(state, action);
}