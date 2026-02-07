import { Component, OnInit } from '@angular/core';
import { TaskService } from './services/task.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
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

  this.taskService.addTask(this.newTaskTitle).subscribe({
    next: (createdTask: any) => {
      // ✅ Optimistic update
      this.tasks = [...this.tasks, createdTask];
      this.newTaskTitle = '';
    },
    error: err => {
      console.error('Add task failed', err);
    }
  });
}
completeTask(task: any) {
  this.taskService.completeTask(task.id).subscribe({
    next: () => {
      // ✅ Optimistic UI update
      task.isCompleted = true;
    },
    error: err => {
      console.error('Complete task failed', err);
    }
  });
}

undoTask(task: any) {
  this.taskService.undoTask(task.id).subscribe(() => {
    task.isCompleted = false;
  });
}
deleteTask(task: any) {
  this.taskService.deleteTask(task.id).subscribe({
    next: () => {
      // ✅ Optimistic removal
      this.tasks = this.tasks.filter(t => t.id !== task.id);
    },
    error: err => {
      console.error('Delete task failed', err);
    }
  });
}


}
