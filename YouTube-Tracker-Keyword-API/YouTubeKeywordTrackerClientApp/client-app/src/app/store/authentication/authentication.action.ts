import { createAction, union, props } from "@ngrx/store/src";
import { IUser, UserRole } from '../../models/user/user';
import { IApiError } from "../../models/errors/api-error";

// Definition of action types
export enum AuthenticationActionTypes {
    LoginStart = '[Authentication] Login start',
    LoginSuccess = '[Authentication] Login success',
    Login = '[Authentication] Login',
    Error = '[Authentication] Error', // Action types for errors in login/register/update/roleAdd/roleUpdate
    Logout = '[Authentication] Logout',
    RegisterStart = '[Authentication] Register start',
    RegisterSuccess = '[Authentication] Register success',
    Register = '[Authentication] Register',
    RemoveUser = '[Authentication] Remove user',
    UpdateStart = '[Authentication] Update start',
    UpdateSuccess = '[Authentication] Update success',
    AddRole = '[Authentication] Add role',
    RemoveRole = '[Authentication] Remove role',
    ResetState = '[Authentication] Reset state'
}

// Declaration of action types
// Login
export const loginStart = createAction(AuthenticationActionTypes.LoginStart);
export const loginSuccess = createAction(AuthenticationActionTypes.LoginSuccess, props<IUser>());
export const authError = createAction(AuthenticationActionTypes.Error, props<{ apiErrors: IApiError[] }>());

// Register
export const registerStart = createAction(AuthenticationActionTypes.RegisterStart);
export const registerSuccess = createAction(AuthenticationActionTypes.RegisterSuccess);
export const registerError = createAction(AuthenticationActionTypes.Error);

// Real actions
// TODO Think about more elegant way of describing this section name
export const login = createAction(
    AuthenticationActionTypes.Login,
    props<{ username: string, password: string }>()
);

export const register = createAction(
    AuthenticationActionTypes.Register,
    props<{ username: string, password: string, city: string, street: string, postalCode?: string, roleId: number }>()
);

// ! Check whether its working for roles

// addROle + removeRole might be the same
export const addRole = createAction(
    AuthenticationActionTypes.AddRole,
    props<{ role: UserRole }>()
);

export const removeRole = createAction(
    AuthenticationActionTypes.RemoveRole,
    props<{ role: UserRole }>()
);

export const removeUser = createAction(
    AuthenticationActionTypes.RemoveUser,
    props<{ user: IUser }>()
)

// TODO Add more

const actions = union({
    loginStart,
    loginSuccess,
    authError,
    registerStart,
    registerSuccess,
    registerError,
    login,
    register,
    addRole
});

export type AuthenticationActionsUnion = typeof actions;