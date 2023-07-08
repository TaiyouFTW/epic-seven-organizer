import { Routes } from '@angular/router';
import { LayoutComponent } from './_shared/components/layout/layout.component';

export const routes: Routes = [
    {
        path: '', component: LayoutComponent, children: [
            { path: 'heroes', loadComponent: () => import('./organizer/organizer.component').then(mod => mod.OrganizerComponent) },
            { path: '', redirectTo: 'heroes', pathMatch: 'full' }
        ]
    },
    { path: '', redirectTo: '', pathMatch: 'full' },
    { path: '**', loadComponent: () => import('./error/error.component').then(mod => mod.ErrorComponent) }
];
