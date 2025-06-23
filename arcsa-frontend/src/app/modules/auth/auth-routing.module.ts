import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './pages/main/main.component';

export const AuthRoutingModule: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            {
                path: 'login',
                loadComponent: () =>
                    import('./pages/login/login.component').then((m) => m.LoginComponent)
            },
            {
                path: 'register',
                loadComponent: () =>
                    import('./pages/register/register-component').then((m) => m.RegisterComponent)
            }
        ]
    }
];
