import { Component, inject, signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  AsyncPipe,
  CurrencyPipe,
  NgClass,
  NgForOf,
  NgIf,
  NgStyle,
  TitleCasePipe,
} from '@angular/common';

import { SubscriptionRequestService } from './subscriptionRequest.service';
import { SubscriptionRequestStatus } from '../../../../core/api/clients';
import { catchError, map, startWith, switchMap } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-subscription-requests',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    TitleCasePipe,
    CurrencyPipe,
    ReactiveFormsModule,
    NgStyle,
    NgClass,
    AsyncPipe,
    NgIf,
  ],
  templateUrl: './subscription-requests.component.html',
  styleUrl: './subscription-requests.component.css',
})
export class SubscriptionRequestsComponent {
  subscriptionRequestsService = inject(SubscriptionRequestService);
  reqStatus = signal<'loading' | 'failed' | 'success'>('loading');

  approve(id: string, subscriptionPackageId: string, purchaseOptionId: string) {
    const approve$ =
      this.subscriptionRequestsService.approveSubscriptionRequest(
        id,
        subscriptionPackageId,
        purchaseOptionId,
        1,
        0,
      );
    approve$.subscribe();
  }
  status = new FormControl<SubscriptionRequestStatus | undefined>(undefined);
  status$ = this.status.valueChanges.pipe(startWith(this.status.value));

  subscriptionRequests$ = this.status$.pipe(
    switchMap((status) =>
      this.subscriptionRequestsService
        .getSubscriptionRequests(0, 10, status)
        .pipe(map((data) => data.items)),
    ),
    tap(() => this.reqStatus.set('success')),
    catchError(() => {
      this.reqStatus.set('failed');
      return [];
    }),
  );

  protected readonly SubscriptionRequestStatus = SubscriptionRequestStatus;
}
