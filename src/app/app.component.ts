import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  route = Inject(Router);
  title = 'shiptfy';

  ngOnInit() {
    this.autoLogout();
  }

  autoLogout() {
    if (
      !localStorage.getItem('accessToken') &&
      !localStorage.getItem('refreshToken')
    ) {
      this.route.navigate(['/login']);
    }
  }
}
