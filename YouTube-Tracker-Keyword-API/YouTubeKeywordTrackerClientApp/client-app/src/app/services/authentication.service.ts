import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { IUser } from "../models/user/user";
import { AppConfig } from "../app.config";
import { Router } from "@angular/router";
import { AuthenticationEndpoints } from "./api-endpoints/endpoints";
import { map } from 'rxjs/operators';
import { IUserRegister } from "../models/user/user.register";

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

    public login(username: string, password: string): Observable<IUser> {
        const options = {
            params: new HttpParams()
                .set('username', username)
                .set('password', password)
        };
        
        return this.httpService.post<IUser>(`${this.config.apiUrl}${AuthenticationEndpoints.Authentication}`, null, options)
        .pipe(
            map(user => {
                if (user && user.token) {
                    localStorage.setItem('currentToken', JSON.stringify(user.token));
                    localStorage.setItem('currentUser', JSON.stringify(user.username));
                    localStorage.setItem('currentUserRole', JSON.stringify(user.role));
                }

                return user;
            })
        )
    }

    public logout(): void {
        localStorage.removeItem('currentToken');
        localStorage.removeItem('currentUser');
        localStorage.removeItem('currentUserRole');

        this.router.navigate(['/']);
    }

    public register(user: IUserRegister): Observable<void> {
        const options = {
            params: new HttpParams()
            .set('username', user.username)
            .set('password', user.password)
            .set('city', user.city)
            .set('street', user.street)
            .set('postalCode', user.postalCode ?? '')
            .set('role', user.roleId)
        }

        return this.httpService.post<void>(`${this.config.apiUrl}${AuthenticationEndpoints.Register}`, null, options);
    }

    // TODO Add roles user remove and so on ...
}