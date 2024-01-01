import { Component, inject, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CurrencyPipe, NgClass, NgForOf, TitleCasePipe } from '@angular/common';
import { SubscriptionPackagesService } from './subscription-packages.service';
import { SubscriptionPackageDashboardView } from '../../../../core/api/clients';

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
  ],
  templateUrl: './subscription-packages.component.html',
  styleUrl: './subscription-packages.component.css',
})
export class SubscriptionPackagesComponent {
  subscriptionPackagesService = inject(SubscriptionPackagesService);
  subscriptionPackages = signal<SubscriptionPackageDashboardView[]>([]);

  getSubscriptionPackages() {
    return this.subscriptionPackagesService
      .getSubscriptionPackages()
      .subscribe((data) => {
        this.subscriptionPackages.set(data.items);
      });
  }
  ngOnInit() {
    this.getSubscriptionPackages();
  }
  ngOnDestroy() {
    this.getSubscriptionPackages().unsubscribe();
  }
}
