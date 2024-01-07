import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { TokenService } from './authantication/token.service';

@Component({
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent implements OnInit {
  title = 'shiptfy';

  constructor(
    private readonly _tokenService: TokenService,
    private readonly route: Router,
  ) {}

  ngOnInit() {
    this.autoLogout();
  }

  autoLogout() {
    if (
      !this._tokenService.getAccessToken() &&
      !this._tokenService.getRefreshToken()
    ) {
      this.route.navigate(['/login']);
    }
  }
}
