import { inject, Injectable } from '@angular/core';
import {
  ApproveSubscriptionRequest,
  SubscriptionRequestsClient,
  SubscriptionRequestStatus,
} from '../../../../core/api/clients';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionRequestService {
  subscriptionRequestsClient = inject(SubscriptionRequestsClient);

  approveSubscriptionRequest(
    id: string,
    subscriptionPackageId: string,
    purchaseOptionId: string,
    intervalCount: number,
    extraDiscount: number,
  ) {
    const req = {
      id,
      subscriptionPackageId,
      purchaseOptionId,
      intervalCount,
      extraDiscount,
    };
    return this.subscriptionRequestsClient.approve(req);
  }
  getSubscriptionRequests(
    index: number | undefined,
    size: number | undefined,
    status: SubscriptionRequestStatus | null | undefined,
  ) {
    return this.subscriptionRequestsClient.getDashboardViewPage(
      index,
      size,
      status,
    );
  }
}
