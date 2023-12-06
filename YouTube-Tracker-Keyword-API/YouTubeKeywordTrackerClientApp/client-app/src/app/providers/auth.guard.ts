import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs/operators';
import { IState } from '../state/index';
import { isAuthenticatedSelector } from '../state/auth/auth.selectors';

@Injectable({ providedIn: 'root' })
export class AuthorizationGuard implements CanActivate {
    constructor(private router: Router, private store: Store<IState>) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.store.select(isAuthenticatedSelector).pipe(
            map(isAuthenticated => {
                if (isAuthenticated) {
                    return true;
                }

                return false;
            }),
            take(1)
        );
    }
}