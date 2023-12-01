import { createAction, props } from "@ngrx/store";
import { IEntity } from '../../models/entity';

export enum DataActionTypes {
    // Data fetch
    DataFetch = '[Data] Data fetch request',
    DataFetchSuccess = '[Data] fetch success',
    DataFetchError = '[Data] fetch error'
}

// Data actions
export const fetch = createAction(
    DataActionTypes.DataFetch,
    props<{ endpoint: string }>()
);

export const fetchSuccess = createAction(
    DataActionTypes.DataFetchSuccess,
    props<{ collection: IEntity[] }>()
);

export const fetchError = createAction(
    DataActionTypes.DataFetchError,
    props<{ error: string }>()
);