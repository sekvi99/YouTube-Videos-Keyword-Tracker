import { IAuthenticationState } from "./authentication/authentication.reducer";
import { authenticationReducer } from "./authentication/authentication.reducer";

export interface IState {
    authentication: IAuthenticationState
}

export interface IReducerSelectorEntityProps {
    entityType: string;
}

export const reducers = {
    authenticationReducer
};