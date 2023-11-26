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
        private router: Router,
        private config: AppConfig
    ) { }
 
    public login(username: string, password: string): Observable<IAuthLoginResponse> {
        const options = {
            params: new HttpParams()
                .set('username', username)
                .set('password', password)
        };
        
        return this.httpService.post<IAuthLoginResponse>(`https://localhost:7142/api/Authentication/login`, null, options)
        .pipe(
            map(response => {
                if (response && response.token !== '') {
                    localStorage.setItem('currentToken', JSON.stringify(response.token));
                    localStorage.setItem('currentUser', JSON.stringify(username));
                    // localStorage.setItem('currentUserRole', JSON.stringify(user.roleId));
                }

                return { ...response };
            })
        )
    }

    public logout(): void {
        localStorage.removeItem('currentToken');
        localStorage.removeItem('currentUser');
        localStorage.removeItem('currentUserRole');

        this.router.navigate(['/']);
    }

    public register(user: IUserRegister): Observable<IUserRegister> {
        const options = {
            params: new HttpParams()
            .set('username', user.username)
            .set('password', user.password)
            .set('city', user.city)
            .set('street', user.street)
            .set('postalCode', user.postalCode ?? '')
            .set('role', user.roleId)
        }

        return this.httpService.post<IUserRegister>(`${this.config.apiUrl}${AuthenticationEndpoints.Register}`, null, options);
    }

    // TODO Add roles user remove and so on ...
}