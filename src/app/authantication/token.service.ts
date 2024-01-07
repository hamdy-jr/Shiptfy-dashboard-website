import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

// define an angular service to access the local storage and set the token
@Injectable({
  providedIn: 'root',
})
export class TokenService {
  setToken(accessToken: string, refreshToken: string) {
    localStorage?.setItem('accessToken', accessToken);
    localStorage?.setItem('refreshToken', refreshToken);
  }

  getAccessToken() {
    return localStorage?.getItem('accessToken') || null;
  }

  getRefreshToken() {
    return localStorage?.getItem('refreshToken') || null;
  }

  getType() {
    return localStorage?.getItem('type') || null;
  }

  clear() {
    localStorage?.removeItem('accessToken');
    localStorage?.removeItem('refreshToken');
  }
}
