import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AppConfig } from "../app.config";
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    constructor(
        private http: HttpClient,
        private config: AppConfig
    ) { }

    fetch<T>(url: string): Observable<T> {
        return this.http.get<T>('https://localhost:7142/api/SearchKeyword/user');
        //return this.http.get<T>(`${this.config.apiUrl}${url}`);
    }

    fetchById<T>(url: string, id: number): Observable<T> {
        return this.http.get<T>(`${this.config.apiUrl}${url}${id}`);
    }
}