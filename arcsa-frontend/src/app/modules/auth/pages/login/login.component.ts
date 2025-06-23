import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule],
    templateUrl: './login.component.html'
  })
export class LoginComponent implements OnInit {
    form!: FormGroup;
    error: string | null = null;

    constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

    ngOnInit(): void {
        this.form = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }

    onSubmit(): void {
        if (this.form.invalid) return;

        this.authService.login(this.form.value).subscribe({
            next: (res) => {
                localStorage.setItem('token', res.user.token);
                this.router.navigate(['/tasks']);
            },
            error: (err) => {
                this.error = err.error.message || 'Credenciales inválidas';
            }
        });
    }
}
