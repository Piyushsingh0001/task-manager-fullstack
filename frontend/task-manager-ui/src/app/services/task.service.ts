import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private apiUrl = `${environment.apiBaseUrl}/tasks`;

  constructor(private http: HttpClient) {}

  getTasks() {
    return this.http.get<any[]>(this.apiUrl);
  }

  addTask(title: string) {
    return this.http.post(this.apiUrl, { title });
  }

  toggleTask(id: number) {
  return this.http.put(`${this.apiUrl}/${id}`, {});
}
deleteTask(id: number) {
  return this.http.delete(`${this.apiUrl}/${id}`);
}
completeTask(id: number) {
  return this.http.put(`${this.apiUrl}/${id}/complete`, {});
}
undoTask(id: number) {
  return this.http.put(`${this.apiUrl}/${id}/undo`, {});
}

}
