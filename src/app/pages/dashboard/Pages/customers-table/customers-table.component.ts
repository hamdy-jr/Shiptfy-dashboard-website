import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { DatePipe, NgForOf, TitleCasePipe } from '@angular/common';

import { CustomersService } from './customers.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  CustomerDashboardView,
  IndexPageOfCustomerDashboardView,
  UserStatus,
} from '../../../../core/api/clients';

@Component({
  selector: 'app-customers-table',
  standalone: true,
  imports: [NgForOf, DatePipe, ReactiveFormsModule, TitleCasePipe],
  templateUrl: './customers-table.component.html',
  styleUrl: './customers-table.component.css',
  providers: [CustomersService],
})
export class CustomersTableComponent implements OnInit, OnDestroy {
  customersService = inject(CustomersService);
  customers = signal<CustomerDashboardView[]>([]);
  status = new FormControl<UserStatus | ''>('');
  search = new FormControl('');

  ngOnInit() {
    this.getCustomers();
  }

  getCustomers() {
    return this.customersService
      .getCustomers(
        0,
        10,
        this.search.value,
        this.status.value === 'active'
          ? UserStatus.Active
          : UserStatus.Inactive,
        undefined,
      )
      .subscribe((data: any) => {
        this.customers.set(data);
      });
  }

  ngOnDestroy() {
    this.getCustomers().unsubscribe();
  }
}
