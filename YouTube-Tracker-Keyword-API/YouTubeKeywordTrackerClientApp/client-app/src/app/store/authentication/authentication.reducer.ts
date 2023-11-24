import { IApiError } from "../../models/errors/api-error";
import { IUser } from "../../models/user/user";
import { AuthenticationActionTypes, AuthenticationActionsUnion } from "./authentication.action";

// State of authentication
export interface IAuthenticationState {
    isLoading: boolean;
    errors?: IApiError[];
    user: IUser;
}

// Base state of authentication
const initialState: IAuthenticationState = {
    isLoading: false,
    user: {} as IUser,
}


export function authenticationReducer(state = initialState, action: AuthenticationActionsUnion) {
    switch (action.type) {
        case AuthenticationActionTypes.LoginStart:
        case AuthenticationActionTypes.Register:
        case AuthenticationActionTypes.AddRole:
            return { ...state, isLoading: true };

        case AuthenticationActionTypes.LoginSuccess:
            return {
                ...state,
                isLoading: false,
                user: { token: action.token, email: action.username, role: action.role }
            };

        // case AuthenticationActionTypes.Error:
        //     return { ...state, isLoading: false, errors: action };

        case AuthenticationActionTypes.RegisterSuccess:
            return {
                ...state,
                isLoading: false
            };

        // case AuthenticationActionTypes.ResetState:
        //     return initialState;

        default:
            return state;
    }
}