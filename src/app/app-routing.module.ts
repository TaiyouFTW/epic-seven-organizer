import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { LayoutComponent } from './_shared/components/layout/layout.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
    ]
  },
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
