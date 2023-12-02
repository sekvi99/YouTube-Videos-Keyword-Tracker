import { IAuthState, authReducer } from './auth/auth.reducer';
import { IDataState, dataReducer } from './data/data.reducer';

export interface IState {
    auth: IAuthState,
    data: IDataState
}

export const reducers = {
    authReducer,
    dataReducer
}