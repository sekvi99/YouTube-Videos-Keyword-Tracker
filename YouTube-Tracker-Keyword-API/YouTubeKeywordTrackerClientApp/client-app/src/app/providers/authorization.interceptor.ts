import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store/src";
import { HttpRequest } from "@angular/common/http";
import { HttpInterceptor } from "@angular/common/http";
import { HttpHandler } from "@angular/common/http";
import { Observable } from "rxjs";
import { HttpEvent } from "@angular/common/http";

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {
    constructor() {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let currentTokenString = localStorage.getItem('currentToken');
        let currentToken = currentTokenString !== null ? JSON.parse(currentTokenString) : null;
        if (currentToken && currentToken.length > 0 && currentToken !== null) {
            const authReq = request.clone({ setHeaders: { Authorization: 'Bearer ' + currentToken } });

            return next.handle(authReq);
        } else {
            return next.handle(request);
        }
    }
}