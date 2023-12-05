import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { AppConfig } from "../app.config";
import { Observable } from 'rxjs';
import { FormGroup } from "@angular/forms";

@Injectable({
    providedIn: 'root'
})
export class DataService {

    private readonly apiUrl: string = 'https://localhost:7142/api'

    constructor(
        private http: HttpClient,
        private config: AppConfig
    ) { }

    fetch<T>(url: string): Observable<T> {
        return this.http.get<T>(`${this.apiUrl}${url}`);
        //return this.http.get<T>(`${this.config.apiUrl}${url}`);
    }

    fetchById<T>(url: string, id: number): Observable<T> {
        return this.http.get<T>(`${this.apiUrl}${url}${id}`);
    }

    upload<T>(url: string, formData: FormGroup, params?: any): Observable<HttpEvent<T>> {
        return this.http.post<T>(`${this.apiUrl}${url}`, formData.value, params);
    }

    edit<T>(url: string, formData: FormGroup, params?: any): Observable<HttpEvent<T>> {
        const dataId = formData.value.id;
        const modifiedUrl = `${this.apiUrl}${url}${dataId !== undefined ? `/${dataId}` : ''}`;
        return this.http.put<T>(modifiedUrl, formData.value, params);
    }
}