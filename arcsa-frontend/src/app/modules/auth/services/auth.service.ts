import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private api = 'http://localhost:3000/api/auth';

    constructor(private http: HttpClient) { }

    login(data: { email: string; password: string }): Observable<any> {
        return this.http.post(`${this.api}/login`, data);
    }

    register(data: { name: string; email: string; password: string }): Observable<any> {
        return this.http.post(`${this.api}/register`, data);
    }
}
