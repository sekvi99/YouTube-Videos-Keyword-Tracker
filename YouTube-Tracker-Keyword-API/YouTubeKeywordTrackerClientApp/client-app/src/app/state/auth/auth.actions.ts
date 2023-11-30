import { createAction, props } from "@ngrx/store";
import { IAuthLoginResponse } from "../../models/user/login/auth.login";

export enum AuthenticationActionTypes {
    // Login Actions
    LoginRequest = '[Auth] Login request',
    LoginSuccess = '[Auth] Login success',
    LoginFailure = '[Auth] Login failure',

    // Register Actions
    RegisterRequest = '[Auth] Register request',
    RegisterSuccess = '[Auth] Register success',
    RegisterFailure = '[Auth] Register failure',

    // Logout
    Logout = '[Auth] Logout request'
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
export const registerRequest = createAction(
    AuthenticationActionTypes.RegisterRequest,
    props<{ registerCredentials: { username: string, password: string, city: string, street: string, postalCode: string } }>()
);

export const registerSuccess = createAction(
    AuthenticationActionTypes.RegisterSuccess,
);

export const registerFailure = createAction(
    AuthenticationActionTypes.RegisterFailure,
    props<{ error: string}>()
);

// Logout Action
export const logout = createAction(
    AuthenticationActionTypes.Logout,
)