import { Injectable } from "@angular/core";
import { HttpRequest } from "@angular/common/http";
import { HttpInterceptor } from "@angular/common/http";
import { HttpHandler } from "@angular/common/http";
import { Observable } from "rxjs";
import { HttpEvent } from "@angular/common/http";
import { Store } from "@ngrx/store";
import { logout } from "../state/auth/auth.actions";
import { ToastService } from "../services/toast.service";
import { LogoutActionMessages } from "../models/toast/toast-messages";
import { tap } from "rxjs";
import { IState } from "../state";

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {
    constructor(private store: Store<IState>, private toastService: ToastService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let currentTokenString = localStorage.getItem('currentToken');
        let currentToken = currentTokenString !== null ? JSON.parse(currentTokenString) : null;
        if (currentToken && currentToken.length > 0 && currentToken !== null) {
            const authReq = request.clone({ setHeaders: { Authorization: 'Bearer ' + currentToken } });

            return next.handle(authReq).pipe(
                tap(
                    () => {},
                    (error: any) => {
                        if (error.status === 401) {
                            this.store.dispatch(logout());
                            this.toastService.error(LogoutActionMessages.NotAuthorized);
                            return;
                        }
                    }
                )
            );
        } else {
            return next.handle(request);
        }
    }
}