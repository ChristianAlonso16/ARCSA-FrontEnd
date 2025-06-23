import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';

@Component({
    standalone: true,
    selector: 'app-task-list',
    templateUrl: './task-list.component.html',
    imports: [CommonModule, RouterModule, FormsModule],
})
export class TaskListComponent implements OnInit {
    tasks: any[] = [];
    searchTerm = '';

    constructor(private taskService: TaskService, private router: Router) { }

    ngOnInit(): void {
        this.loadTasks();
    }

    get filteredTasks(): any[] {
        return this.tasks.filter(task =>
            task.title.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
    }

    loadTasks(): void {
        this.taskService.getAll().subscribe({
            next: (data) => (this.tasks = data),
            error: (err) => console.error(err),
        });
    }

    editTask(task: any): void {
        console.log('Pasando task al form:', task); // ✅ Agrega este log
        this.router.navigate(['/tasks/form'], { state: { task } });
    }
      

    deleteTask(id: number): void {
        if (!confirm('¿Estás seguro de eliminar esta tarea?')) return;

        this.taskService.delete(id).subscribe({
            next: () => this.loadTasks(),
            error: (err) => console.error(err),
        });
    }
    logout(): void {
        localStorage.removeItem('token');
        this.router.navigate(['/auth/login']);
    }
      
}
