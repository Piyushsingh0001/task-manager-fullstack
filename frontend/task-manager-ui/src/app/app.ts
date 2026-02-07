import { Component, OnInit } from '@angular/core';
import { TaskService } from './services/task.service';

@Component({
  selector: 'app-root',
  template: `
    <h1>Task Manager</h1>
    <ul>
      <li *ngFor="let task of tasks">
        {{ task.title }} - {{ task.isCompleted ? 'Done' : 'Pending' }}
      </li>
    </ul>
  `
})
export class AppComponent implements OnInit {
  tasks: any[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.taskService.getTasks().subscribe(data => {
      this.tasks = data;
    });
  }
}
