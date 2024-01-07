import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from './token.service';

export const AdministratorGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);

  const isAuthenticated =
    tokenService.getAccessToken() && tokenService.getRefreshToken();

  if (!isAuthenticated) {
    return router.parseUrl('/login');
  }

  if (tokenService.getType() === 'administrator') {
    return true;
  }

  return router.parseUrl('/app-view');
};
