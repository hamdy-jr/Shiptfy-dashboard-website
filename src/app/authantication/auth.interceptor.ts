import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, of, switchMap, throwError } from 'rxjs';
import { RefreshService } from './refresh.service';
import { TokenService } from './token.service';

const refreshPath = '/authentications/refresh';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);
  const refreshService = inject(RefreshService);

  var url = new URL(req.url);

  if (url.pathname === refreshPath) {
    return next(req);
  }

  const accessToken = tokenService.getAccessToken();

  if (!accessToken) {
    return next(req);
  }

  return (refreshService.currentRefreshToken ?? of(void null)).pipe(
    switchMap(() => {
      const newReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + accessToken),
      });

      return next(newReq).pipe(
        catchError((originalError) => {
          if (originalError?.status !== 401) {
            return throwError(() => originalError);
          }

          return refreshService.refreshToken(originalError).pipe(
            switchMap(() => {
              const newAccessToken = tokenService.getAccessToken();

              const retryReq = req.clone({
                headers: req.headers.set(
                  'Authorization',
                  'Bearer ' + newAccessToken
                ),
              });

              return next(retryReq);
            })
          );
        })
      );
    })
  );
};
