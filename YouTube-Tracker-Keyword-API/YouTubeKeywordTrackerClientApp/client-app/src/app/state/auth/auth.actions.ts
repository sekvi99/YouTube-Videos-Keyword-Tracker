import { createAction, props } from "@ngrx/store";
import { IAuthLoginResponse } from "../../models/user/login/auth.login";

export enum AuthenticationActionTypes {
    LoginRequest = '[Auth] Login request',
    LoginSuccess = '[Auth] Login success',
    LoginFailure = '[Auth] Login failure',
}

// Login Actions
export const loginRequest = createAction(
    AuthenticationActionTypes.LoginRequest,
    props<{ credentials: { username: string, password: string } }>()
)

export const loginSuccess = createAction(
    AuthenticationActionTypes.LoginSuccess,
    props<{ loginSuccessResponse: IAuthLoginResponse }>()
)

export const loginFailure = createAction(
    AuthenticationActionTypes.LoginRequest,
    props<{ error: string }>()
)

// Register Actions