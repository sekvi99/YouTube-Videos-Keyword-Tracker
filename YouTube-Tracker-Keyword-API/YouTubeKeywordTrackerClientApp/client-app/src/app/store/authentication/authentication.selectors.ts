import { IState } from "..";
import { createSelector } from "@ngrx/store/src";
import { UserRole } from "../../models/user/user";

const authentication = (state: IState) => state.authentication;

export const isLoadingSelector = createSelector(authentication, state => state.isLoading);

export const userSelector = createSelector(authentication, state => state.user);

export const userRoleSelector = createSelector(userSelector, user => user.role);

export const isAuthenticatedSelector = createSelector(userSelector, user => !!user.token);

export const errorsSelector = createSelector(authentication, state => state.errors);

export const isUserActiveSelector = createSelector(
    userRoleSelector,
    (role: UserRole) => role === 0 || role === 1
);

export const hasUserAdminRights = createSelector(
    userRoleSelector,
    (role: UserRole) => role === 1
);