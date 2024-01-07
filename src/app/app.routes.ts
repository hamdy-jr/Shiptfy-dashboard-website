import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { AppViewComponent } from './pages/app-view/app-view.component';
import { AdministratorGuard } from './authantication/auth.guard';
import { DashboardRoutes } from './pages/dashboard/dashboard.routes';
import { RegistrationRoutes } from './pages/auth/registration/registration.routes';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  ...RegistrationRoutes,
  ...DashboardRoutes,
  {
    path: 'app-view',
    component: AppViewComponent,
    canActivate: [AdministratorGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];
