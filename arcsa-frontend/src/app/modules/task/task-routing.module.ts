import { Routes } from '@angular/router';

export const TaskRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./pages/task-list/task-list.component').then((m) => m.TaskListComponent),
            },
            {
                path: 'new',
                loadComponent: () =>
                    import('./pages/task-form/task-form.component').then((m) => m.TaskFormComponent),
            },
            {
                path: 'form',
                loadComponent: () =>
                    import('./pages/task-form/task-form.component').then(m => m.TaskFormComponent)
            }
              
              
        ],
    },
];
