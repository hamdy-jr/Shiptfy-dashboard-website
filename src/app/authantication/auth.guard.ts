import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const accessToken = localStorage.getItem('accessToken');
  const type = localStorage.getItem('type');
  const router = inject(Router);
  if (accessToken && type) {
    if (type === 'administrator') {
      return router.navigate(['/dashboard']);
    } else {
      return router.navigate(['/app-view']);
    }
  } else {
    return true;
  }
};

export const NotLoginGuard: CanActivateFn = (route, state) => {
  const accessToken = localStorage.getItem('accessToken');
  const router = inject(Router);

  if (accessToken) {
    return true;
  } else {
    return router.navigate(['/login']);
  }
};
export const AdministratorGuard: CanActivateFn = (route, state) => {
  const type = localStorage.getItem('type');
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const router = inject(Router);

  if (type === 'administrator' && accessToken && refreshToken) {
    return true;
  } else {
    return router.navigate(['/app-view']);
  }
};
