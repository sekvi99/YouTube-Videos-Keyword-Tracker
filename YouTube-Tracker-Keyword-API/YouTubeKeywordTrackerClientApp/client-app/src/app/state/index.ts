import { IAuthState, authReducer } from './auth/auth.reducer';

export interface IState {
    auth: IAuthState
}

export const reducers = {
    authReducer
}