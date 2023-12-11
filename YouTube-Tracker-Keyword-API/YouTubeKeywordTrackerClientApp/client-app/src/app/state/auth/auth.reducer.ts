import { createReducer, on } from '@ngrx/store';
import { IUser, DEFAULT_USER_VALUES } from '../../models/user/user';
import { loginFailure, loginSuccess, registerFailure, registerSuccess } from './auth.actions';

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
            token: loginSuccessResponse.token,
            user: {
                username: loginSuccessResponse.username,
                roleId: loginSuccessResponse.roleId,
            },
            loginError: undefined,
        };
    }),
    on(loginFailure, (state, { error }) => {
        return {
            ...state,
            loginError: error,
        }
    }),
    on(registerSuccess, (state) =>  {
        return {
            ...state,
        }
    }),
    on(registerFailure, (state, { error }) => {
        return {
            ...state,
            error: error
        }
    })
);

export function authReducer(state: any, action: any) {
    return _authReducer(state, action);
}



