import { Injectable, inject } from '@angular/core';
import { SubscriptionPackagesClient } from '../../../../core/api/clients';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionPackagesService {
  subscriptionPackagesClient = inject(SubscriptionPackagesClient);

  getSubscriptionPackages() {
    return this.subscriptionPackagesClient.getDashboardViewPage(0, 10, null);
  }
}
