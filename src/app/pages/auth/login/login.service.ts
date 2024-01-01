import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthorizationsClient } from '../../../core/api/clients';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  http = inject(HttpClient);
  authorizationsClient = inject(AuthorizationsClient);
  onInit() {}

  onLogin(identifier: string, password: string) {
    return this.authorizationsClient.credentialLogin({
      identifier: identifier,
      password: password,
      remember: true,
    });
  }
}
