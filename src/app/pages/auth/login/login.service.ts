import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthorizationsClient } from '../../../core/api/clients';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  http = inject(HttpClient);
  authorizationsClient = inject(AuthorizationsClient);

  onLogin(identifier: string, password: string) {
    return this.authorizationsClient.credentialLogin({
      identifier: identifier,
      password: password,
      remember: true,
    });
  }
}
