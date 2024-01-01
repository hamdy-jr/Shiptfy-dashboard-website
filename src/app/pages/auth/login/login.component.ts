import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgIf, NgOptimizedImage } from '@angular/common';

import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NgIf, NgOptimizedImage],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [LoginService],
})
export class LoginComponent {
  loginService = inject(LoginService);
  route = inject(Router);
  isSubmitted = false;

  loginForm = new FormGroup({
    identifier: new FormControl<string>('', {
      validators: [Validators.required, Validators.email],
      updateOn: 'submit',
    }),
    password: new FormControl<string>('', {
      validators: [Validators.required, Validators.minLength(8)],
      updateOn: 'submit',
    }),
  });

  onSubmit() {
    console.log(this.loginForm.value);
    if (this.loginForm.valid) {
      this.loginService
        .onLogin(
          this.loginForm.controls.identifier.value as string,
          this.loginForm.controls.password.value as string,
        )
        .subscribe((res) => {
          console.log(res);
          localStorage.setItem('accessToken', res.accessToken);
          localStorage.setItem('refreshToken', res.refreshToken);
          localStorage.setItem('type', res.user.type);
          console.log('Logged in!');
          if (res.user?.type === 'administrator') {
            this.route.navigate(['/dashboard']);
          } else {
            this.route.navigate(['/app-view']);
          }
        });
    }
    this.isSubmitted = true;
  }
}
