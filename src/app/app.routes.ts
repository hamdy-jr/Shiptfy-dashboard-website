import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { AppViewComponent } from './pages/app-view/app-view.component';
import { authGuard, NotLoginGuard } from './authantication/auth.guard';
import { DashboardRoutes } from './pages/dashboard/dashboard.routes';
import { RegistrationRoutes } from './pages/auth/registration/registration.routes';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [authGuard] },
  ...RegistrationRoutes,
  ...DashboardRoutes,
  {
    path: 'app-view',
    component: AppViewComponent,
    canActivate: [NotLoginGuard],
  },
];
