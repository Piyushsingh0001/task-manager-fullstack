import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private apiUrl = 'https://localhost:5001/api/tasks';

  constructor(private http: HttpClient) {}

  getTasks() {
    return this.http.get<any[]>(this.apiUrl);
  }
}
