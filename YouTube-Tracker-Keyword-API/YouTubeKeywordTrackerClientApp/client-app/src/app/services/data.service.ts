import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { AppConfig } from "../app.config";
import { Observable } from 'rxjs';
import { FormGroup } from "@angular/forms";
import { IEntity } from '../models/entity';

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

    edit<T>(url: string, formData: FormGroup, params?: any): Observable<HttpEvent<string>> {
        const dataId = formData.value.id;
        const modifiedUrl = `${this.apiUrl}${url}${dataId !== undefined ? `/${dataId}` : ''}`;
        const options = { params, observe: 'response' as const, responseType: 'text' as const };
      
        return this.http.put(modifiedUrl, formData.value, options);
    }

    delete<T>(url: string, data: IEntity, params?: any): Observable<HttpEvent<string>> {
        const dataId = data.id;
        const options = { params, observe: 'response' as const, responseType: 'text' as const };
        return this.http.delete(`${this.apiUrl}${url}/${dataId}`, options);
    }
}