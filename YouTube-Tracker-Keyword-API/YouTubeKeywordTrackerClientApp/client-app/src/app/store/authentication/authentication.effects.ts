import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { IState } from '..';
import { Observable, of } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { map, mergeMap, tap, catchError } from 'rxjs/operators';
import { 
    loginStart,
    loginSuccess,
    authError,
    registerStart,
    registerSuccess,
    registerError,
    login,
    register,
    addRole,
    removeRole,
    removeUser

} from './authentication.action';
import { IUserRegister } from '../../models/user/user.register';

@Injectable()
export class AuthenticationEffects {

    constructor(
        private actions$: Actions,
        private store: Store<IState>,
        private authenticationService: AuthenticationService,
        private router: Router
    ) { }

    login$ = createEffect(() => 
        this.actions$.pipe(
            ofType(login),
            tap(() => this.store.dispatch(loginStart())),
            mergeMap(({username, password}) => {
                return this.authenticationService.login(username, password).pipe(
                    map(user => {
                        this.router.navigate(['/']);
                        return loginSuccess(user);
                    })
                )
                // TODO add catching errors for this effect
            })
        )
    );

    register$ = createEffect(() => 
        this.actions$.pipe(
            ofType(register),
            tap(() => this.store.dispatch(registerStart())),
            mergeMap(action => {
                const user: IUserRegister = {
                    username: action.username,
                    password: action.password,
                    city: action.city,
                    street: action.street,
                    postalCode: action.postalCode,
                    roleId: action.roleId
                };
                return this.authenticationService.register(user).pipe(
                    map(user => {
                        this.router.navigate(['/']);
                        return registerSuccess();
                    })
                )
            })
        ),
        // TODO add catching errors for this effect
    );
}