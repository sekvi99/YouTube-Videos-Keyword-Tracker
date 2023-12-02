import { IAuthState, authReducer } from './auth/auth.reducer';
import { IDataState, dataReducer } from './data/data.reducer';

export interface IState {
    auth: IAuthState,
    data: IDataState
}

export interface IReducerSelectorEntityProps {
    entityType: string;
}

export const reducers = {
    authReducer,
    dataReducer
}