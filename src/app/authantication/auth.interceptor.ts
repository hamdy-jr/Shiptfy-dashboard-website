import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, retry, switchMap, throwError } from 'rxjs';
import { inject } from '@angular/core';

import { AuthorizationsClient, RefreshAccessToken } from '../core/api/clients';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authorizationsClient = inject(AuthorizationsClient);

  let accessToken = localStorage.getItem('accessToken');
  const getRefreshToken = localStorage.getItem('refreshToken');
  const refreshToken: RefreshAccessToken = {
    token: getRefreshToken as string,
  };

  const authReq = req.clone({
    headers: req.headers.set('Authorization', 'Bearer ' + accessToken),
  });
  return next(authReq).pipe(
    retry(1),
    catchError((error) => {
      if (error.status === 401) {
        return authorizationsClient.refresh(refreshToken).pipe(
          switchMap((res) => {
            localStorage.setItem('accessToken', res.accessToken);
            localStorage.setItem('refreshToken', res.refreshToken);
            const retryReq = req.clone({
              headers: req.headers.set(
                'Authorization',
                'Bearer ' + res.accessToken,
              ),
            });
            return next(retryReq);
          }),
        );
      }
      return throwError(error);
    }),
  );
};
