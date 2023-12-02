import { createSelector } from '@ngrx/store';
import { IState } from '..';
import { IDataState } from './data.reducer';
import { IReducerSelectorEntityProps } from '..';

const data = (state: IState, { entityType }: IReducerSelectorEntityProps) => state.data as IDataState;

export const dataSelector = createSelector(
    data,
    state => state.data
);

export const isFetchingSelector = createSelector(
    data,
    state => state.isFetching
);