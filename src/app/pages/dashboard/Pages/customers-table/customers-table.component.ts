import {
  AsyncPipe,
  DatePipe,
  NgForOf,
  NgIf,
  TitleCasePipe,
} from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  debounceTime,
  map,
  startWith,
  switchMap,
} from 'rxjs';
import { UserStatus } from '../../../../core/api/clients';
import { CustomersService } from './customers.service';
import { tap } from 'rxjs/operators';
import { TablePaginationComponent } from '../../../../shared/components/table/table-pagination/table-pagination.component';

@Component({
  selector: 'app-customers-table',
  standalone: true,
  imports: [
    NgForOf,
    DatePipe,
    ReactiveFormsModule,
    TitleCasePipe,
    AsyncPipe,
    NgIf,
    TablePaginationComponent,
  ],
  templateUrl: './customers-table.component.html',
  styleUrl: './customers-table.component.css',
  providers: [CustomersService],
})
export class CustomersTableComponent {
  customersService = inject(CustomersService);
  UserStatus = Object.keys(UserStatus);
  reqStatus = signal<'loading' | 'failed' | 'success'>('loading');
  pages!: number[];

  status = new FormControl<UserStatus | null>(null);
  status$ = this.status.valueChanges.pipe(startWith(this.status.value));

  search = new FormControl<string | null>(null);
  search$ = this.search.valueChanges.pipe(
    startWith(this.search.value),
    debounceTime(500),
  );
  CurrentPage = new BehaviorSubject(0);
  page$ = this.CurrentPage.pipe(startWith(this.CurrentPage.value));

  customers$ = combineLatest([this.status$, this.search$, this.page$]).pipe(
    switchMap(([status, search, page]) => {
      return this.customersService
        .getCustomers(page, 2, search, status, undefined)
        .pipe(map((data) => data));
    }),
    tap((data) => {
      this.pages = Array.from({ length: data.totalPages }, (_, i) => i + 1);
      this.reqStatus.set('success');
    }),

    catchError((err) => {
      this.reqStatus.set('failed');
      throw err;
    }),
  );

  changePage(e: number) {
    this.CurrentPage.next(e);
  }
}
