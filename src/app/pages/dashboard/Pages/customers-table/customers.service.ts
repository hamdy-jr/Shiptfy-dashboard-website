import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  CustomerDashboardView,
  CustomersClient,
  Gender,
  IndexPageOfCustomerDashboardView,
  UserStatus,
} from '../../../../core/api/clients';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  customersClient = inject(CustomersClient);

  getCustomers(
    index: number | undefined,
    size: number | undefined,
    search: string | null | undefined,
    status: UserStatus | null | undefined,
    gender: Gender | null | undefined,
  ) {
    return this.customersClient
      .getDashboardViewPage(index, size, search, status, gender)
      .pipe(
        map((data: IndexPageOfCustomerDashboardView) => {
          return {
            ...data,
            items: data.items.map((item: CustomerDashboardView) => {
              return {
                ...item,
                dateFirstOrder: new Date(
                  item.dateFirstOrder as string,
                ).toLocaleString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  timeZone: 'UTC',
                }),
              };
            }),
          };
        }),
      );
  }
}
