import { Component, inject, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  AsyncPipe,
  CurrencyPipe,
  NgClass,
  NgForOf,
  NgIf,
  TitleCasePipe,
} from '@angular/common';
import { SubscriptionPackagesService } from './subscription-packages.service';
import { SubscriptionPackageDashboardView } from '../../../../core/api/clients';
import { catchError, map } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-subscription-packages',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    ReactiveFormsModule,
    TitleCasePipe,
    CurrencyPipe,
    NgClass,
    AsyncPipe,
    NgIf,
  ],
  templateUrl: './subscription-packages.component.html',
  styleUrl: './subscription-packages.component.css',
})
export class SubscriptionPackagesComponent {
  subscriptionPackagesService = inject(SubscriptionPackagesService);
  reqStatus = signal<'loading' | 'failed' | 'success'>('loading');

  subscriptionPackages$ = this.subscriptionPackagesService
    .getSubscriptionPackages()
    .pipe(
      map((data) => data.items),
      tap(() => this.reqStatus.set('success')),
      catchError((err) => {
        this.reqStatus.set('failed');
        throw err;
      }),
    );
}
