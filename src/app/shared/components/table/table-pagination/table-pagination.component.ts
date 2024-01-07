import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForOf } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { PaginationDataType } from './pagination';

@Component({
  selector: 'app-table-pagination',
  standalone: true,
  imports: [NgForOf],
  templateUrl: './table-pagination.component.html',
  styleUrl: './table-pagination.component.css',
})
export class TablePaginationComponent {
  @Input({ required: true }) data!: PaginationDataType;
  @Input({ required: true }) pages: number[] | undefined;
  @Input({ required: true }) getCurrentPage!: BehaviorSubject<number>;

  @Output() currentPage = new EventEmitter<number>();

  nextPage() {
    this.currentPage.emit(this.getCurrentPage.value + 1);
  }
  prevPage() {
    this.currentPage.emit(this.getCurrentPage.value - 1);
  }
  changePage(page: number) {
    this.currentPage.emit(page - 1);
  }
}
