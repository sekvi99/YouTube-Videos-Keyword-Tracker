import { createAction, props } from "@ngrx/store";
import { IEntity } from '../../models/entity';

export enum DataActionTypes {
    // Data fetch
    DataFetch = '[Data] Data fetch request',
    DataFetchById = '[Data] Data fetch by id',
    DataFetchByIdSuccess = '[Data] Data fetch by id success',
    DataFetchSuccess = '[Data] fetch success',
    DataFetchError = '[Data] fetch error'
}

// Data actions
export const fetch = createAction(
    DataActionTypes.DataFetch,
    props<{ endpoint: string }>()
);

export const fetchById = createAction(
    DataActionTypes.DataFetchById,
    props<{ endpoint: string, id: number }>()
)

export const fetchSuccess = createAction(
    DataActionTypes.DataFetchSuccess,
    props<{ collection: IEntity[] }>()
);

export const fetchByIdSuccess = createAction(
    DataActionTypes.DataFetchByIdSuccess,
    props<{ data: IEntity }>()
);

export const fetchError = createAction(
    DataActionTypes.DataFetchError,
    props<{ error: string }>()
);