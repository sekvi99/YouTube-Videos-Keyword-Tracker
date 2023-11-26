import { createReducer, on } from '@ngrx/store';
import { IUser, DEFAULT_USER_VALUES } from '../../models/user/user';
import { loginFailure, loginSuccess } from './auth.actions';

// Definition of auth state
export interface IAuthState {
    token: string;
    user: IUser;
    loginError?: string;
}

// Definition of base auth state
export const initialState: IAuthState = {
    token: "",
    user: DEFAULT_USER_VALUES,
}

const _authReducer = createReducer(
    initialState,
    on(loginSuccess, (state, { loginSuccessResponse }) => {
        return {
            ...state,
            token: loginSuccessResponse.token ?? ''
        }
    }),
    on(loginFailure, (state, { error }) => {
        return {
            ...state,
            loginError: error,
        }
    }),
);

export function authReducer(state: any, action: any) {
    return _authReducer(state, action);
}


