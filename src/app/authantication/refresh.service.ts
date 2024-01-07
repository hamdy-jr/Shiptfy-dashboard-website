import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, share, tap } from 'rxjs/operators';
import { AuthorizationsClient } from '../core/api/clients';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class RefreshService {
  private _currentRefreshToken: Observable<void> | null = null;

  get currentRefreshToken(): Observable<void> | null {
    return this._currentRefreshToken;
  }

  constructor(
    private authorizationsClient: AuthorizationsClient,
    private tokenService: TokenService,
    private http: HttpClient
  ) {}

  public refreshToken(originalError: unknown): Observable<void> {
    const refreshToken = this.tokenService.getRefreshToken();

    if (!refreshToken) {
      return throwError(() => originalError);
    }

    if (!this._currentRefreshToken) {
      this._currentRefreshToken = this.authorizationsClient
        .refresh({ token: refreshToken })
        .pipe(
          // Share the result of the request with all the subscribers
          share(),
          // Set the new tokens
          tap((res) => {
            this.tokenService.setToken(res.accessToken, res.refreshToken);
            this._currentRefreshToken = null;
          }),
          // Don't give the access to the result because we don't need it
          map(() => {})
        );
    }

    return this._currentRefreshToken;
  }
}
