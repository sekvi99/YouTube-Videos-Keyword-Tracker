import { createSelector } from "@ngrx/store";
import { IState } from "..";
import { UserRole } from "../../models/user/user";

const authentication = (state: IState) => state.auth;

export const userSelector = createSelector(authentication, state => state.user);

export const userRoleSelector = createSelector(authentication, state => state.user.roleId);

// TODO Refactor based on state
export const isAuthenticatedSelector = createSelector(userSelector, () => !!localStorage.getItem('currentToken'));

export const hasAdminRightsSelector = createSelector(userRoleSelector, () => {
    const storedUserRole = localStorage.getItem('currentUserRole');
    console.log(storedUserRole);
    console.log(Number(storedUserRole) >= UserRole.Admin);
    return storedUserRole !== null && Number(storedUserRole) >= UserRole.Admin;
});