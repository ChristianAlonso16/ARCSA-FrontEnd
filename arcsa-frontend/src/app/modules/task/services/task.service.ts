import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TaskService {
    private api = 'http://localhost:3000/api/tasks';

    constructor(private http: HttpClient) { }

    private getAuthHeaders(): HttpHeaders {
        const token = localStorage.getItem('token');
        return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    }

    getAll(): Observable<any> {
        return this.http.get(this.api, { headers: this.getAuthHeaders() });
    }

    create(data: any): Observable<any> {
        return this.http.post(this.api, data, { headers: this.getAuthHeaders() });
    }

    update(id: number, data: any): Observable<any> {
        return this.http.put(`${this.api}/${id}`, data, { headers: this.getAuthHeaders() });
    }

    delete(id: number): Observable<any> {
        return this.http.delete(`${this.api}/${id}`, { headers: this.getAuthHeaders() });
    }
}
