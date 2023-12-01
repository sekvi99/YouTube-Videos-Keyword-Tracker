import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { IState } from '../state/index';
import { map, take } from 'rxjs/operators';
import { hasAdminRightsSelector } from "../state/auth/auth.selectors";
import { Store } from "@ngrx/store";

@Injectable({ providedIn: 'root' })
export class AdminRightsGuard implements CanActivate {
    constructor(private router: Router, private store: Store<IState>) {}

    canActivate() {
        return this.store.select(hasAdminRightsSelector).pipe(
            map(hasAdminRights => {
                if (hasAdminRights) {
                    return true;
                }

                this.router.navigate(['/']);
                return false;
            }),
            take(1)
        );
    }
}
