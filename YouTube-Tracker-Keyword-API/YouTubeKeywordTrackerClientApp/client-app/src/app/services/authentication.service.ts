import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { AppConfig } from "../app.config";
import { Router } from "@angular/router";
import { AuthenticationEndpoints } from "./api-endpoints/endpoints";
import { map } from 'rxjs/operators';
import { IUserRegister } from "../models/user/user.register";
import { IAuthLoginResponse } from "../models/user/login/auth.login";

export enum UserRolesDefinition {
    User = 0,
    Admin = 1
}

@Injectable()
export class AuthenticationService {
    constructor(
        private httpService: HttpClient,
        private config: AppConfig
    ) { }
 
    public login(username: string, password: string): Observable<IAuthLoginResponse> {
        const options = {
            params: new HttpParams()
                .set('username', username)
                .set('password', password)
        };
        
        return this.httpService.post<IAuthLoginResponse>(`https://localhost:7142/api/Authentication/login`, null, options) // TODO Set up propper url
        .pipe(
            map(response => {
                if (response && response.token !== '') {
                    localStorage.setItem('currentToken', JSON.stringify(response.token));
                    localStorage.setItem('currentUser', JSON.stringify(response.username));
                    localStorage.setItem('currentUserRole', JSON.stringify(response.roleId));
                }
                return { ...response };
            })
        )
    }

    public logout(): void {
        localStorage.removeItem('currentToken');
        localStorage.removeItem('currentUser');
        localStorage.removeItem('token');
        localStorage.removeItem('currentUserRole');

        window.location.reload();
    }

    public register(username: string, password: string, city: string, street: string, postalCode?: string): Observable<void> {
        const body = {
            username: username,
            password: password,
            city: city,
            street: street,
            postalCode: postalCode ?? '',
            role: UserRolesDefinition.User
        };
        // TODO Set up propper url
        return this.httpService.post<void>('https://localhost:7142/api/Authentication/register', body);
    }

    // TODO Add roles user remove and so on ...
}