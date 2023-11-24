import { environment } from "../environments/environment";
import { Injectable } from '@angular/core';

@Injectable()
export class AppConfig {
    public readonly apiUrl = environment.API_URL;
    public readonly baseUrl = environment.BASE_URL;
}