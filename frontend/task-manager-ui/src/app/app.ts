import { Component, OnInit } from '@angular/core';
import { TaskService } from './services/task.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
   imports: [FormsModule],
  styleUrls: ['./app.css']
})
export class AppComponent implements OnInit {
  tasks: any[] = [];
  newTaskTitle = '';
  isLoading = true;

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe(data => {
      this.tasks = data;
      this.isLoading = false;
    });
  }

  addTask() {
    if (!this.newTaskTitle.trim()) return;

    this.taskService.addTask(this.newTaskTitle).subscribe(() => {
      this.newTaskTitle = '';
      this.loadTasks(); // refresh list
    });
  }
}
