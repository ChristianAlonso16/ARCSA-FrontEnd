import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TaskService } from '../../services/task.service';

@Component({
    standalone: true,
    selector: 'app-task-form',
    templateUrl: './task-form.component.html',
    imports: [CommonModule, ReactiveFormsModule, RouterModule],
})
export class TaskFormComponent implements OnInit {
    form: FormGroup;
    isEditMode = false;
    taskId: number | null = null;

    constructor(
        private fb: FormBuilder,
        private taskService: TaskService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.form = this.fb.group({
            title: ['', Validators.required],
            description: ['', Validators.required],
        });
    }

    ngOnInit(): void {
        const taskFromState = history.state?.task;

        if (taskFromState && taskFromState.id) {
            this.isEditMode = true;
            this.taskId = taskFromState.id;
            this.form.patchValue({
                title: taskFromState.title,
                description: taskFromState.description
            });
        } else if (Object.keys(history.state).length === 0) {
            // Si no viene data, redirige (evita uso indebido del path)
            this.router.navigate(['/tasks']);
        }
    }
      

    loadTask(id: number): void {
        this.taskService.getAll().subscribe({
            next: (tasks) => {
                const task = tasks.find((t: any) => t.id === id);
                if (task) {
                    this.form.patchValue({
                        title: task.title,
                        description: task.description,
                    });
                }
            },
            error: (err) => console.error(err),
        });
    }

    onSubmit(): void {
        if (this.form.invalid) return;

        const payload = this.form.value;

        if (this.isEditMode && this.taskId !== null) {
            this.taskService.update(this.taskId, payload).subscribe({
                next: () => this.router.navigate(['/tasks']),
                error: (err) => console.error(err),
            });
        } else {
            this.taskService.create(payload).subscribe({
                next: () => this.router.navigate(['/tasks']),
                error: (err) => console.error(err),
            });
        }
    }
}
