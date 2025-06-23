import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
    standalone: true,
    selector: 'app-register',
    templateUrl: './register.component.html',
    imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class RegisterComponent {
    form: FormGroup;
    error: string | null = null;

    constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
        this.form = this.fb.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
        });
    }

    onSubmit(): void {
        if (this.form.invalid) return;

        this.authService.register(this.form.value).subscribe({
            next: () => this.router.navigate(['/auth/login']),
            error: (err) => this.error = err.error.message || 'Error al registrar'
        });
    }
}
