import { Routes } from '@angular/router';
import { AuthRoutingModule } from './modules/auth/auth-routing.module';
import { TaskRoutes } from './modules/task/task-routing.module';
import { AuthGuard } from '../app/guard/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
    { path: 'auth', children: AuthRoutingModule },
    {
        path: 'tasks', canActivate: [AuthGuard],
        children: TaskRoutes
    },
    { path: '**', redirectTo: 'auth/login' }
];
