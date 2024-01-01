import { Component, inject, signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  CurrencyPipe,
  NgClass,
  NgForOf,
  NgStyle,
  TitleCasePipe,
} from '@angular/common';

import { SubscriptionRequestService } from './subscriptionRequest.service';
import {
  IndexPageOfSubscriptionRequestDashboardView,
  SubscriptionRequestDashboardView,
  SubscriptionRequestStatus,
} from '../../../../core/api/clients';

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
  ],
  templateUrl: './subscription-requests.component.html',
  styleUrl: './subscription-requests.component.css',
})
export class SubscriptionRequestsComponent {
  subscriptionRequestsService = inject(SubscriptionRequestService);
  subscriptionRequests = signal<SubscriptionRequestDashboardView[]>([]);

  subscriptionRequestStatusControl = new FormControl<
    SubscriptionRequestStatus | undefined
  >(undefined);

  approve(id: string, subscriptionPackageId: string, purchaseOptionId: string) {
    this.subscriptionRequestsService
      .approveSubscriptionRequest(
        id,
        subscriptionPackageId,
        purchaseOptionId,
        1,
        0,
      )
      .subscribe(
        (data) => {
          this.getSubscriptionRequests();
        },
        (error) => {
          console.log(error);
        },
      );
    this.getSubscriptionRequests();
  }

  getSubscriptionRequests() {
    return this.subscriptionRequestsService
      .getSubscriptionRequests(
        0,
        10,
        this.subscriptionRequestStatusControl.value,
      )
      .subscribe(
        (data: IndexPageOfSubscriptionRequestDashboardView) => {
          this.subscriptionRequests.set(data.items);
        },
        (error: any) => {
          console.log(error);
        },
      );
  }

  ngOnInit() {
    this.getSubscriptionRequests();
  }

  protected readonly SubscriptionRequestStatus = SubscriptionRequestStatus;
  ngOnDestroy() {
    this.getSubscriptionRequests().unsubscribe();
  }
}
