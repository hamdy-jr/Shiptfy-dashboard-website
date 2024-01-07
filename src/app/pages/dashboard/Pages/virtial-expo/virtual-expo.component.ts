import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnChanges,
  signal,
} from '@angular/core';
import { PanoramaViewerComponent } from './panorama-viewer/panorama-viewer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { AddPhotoModelComponent } from './add-photo-model/add-photo-model.component';
import { VirtualService } from './virtual.service';
import { VirtualExpoDashboardView } from '../../../../core/api/clients';
import { catchError, map } from 'rxjs';
import { data } from 'autoprefixer';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-virtual-expo',
  standalone: true,
  imports: [
    PanoramaViewerComponent,
    ReactiveFormsModule,
    NgIf,
    AddPhotoModelComponent,
    NgForOf,
    AsyncPipe,
  ],
  templateUrl: './virtual-expo.component.html',
  styleUrl: './virtual-expo.component.css',
})
export class VirtualExpoComponent {
  virtualService = inject(VirtualService);
  isUploadPhotoModalOpen = false;
  reqStatus = signal<'loading' | 'failed' | 'success'>('loading');

  closeUploadPhotoModal(event: boolean) {
    this.isUploadPhotoModalOpen = event;
  }
  openUploadPhotoModal() {
    this.isUploadPhotoModalOpen = true;
  }

  virtualExpoPosts$ = this.virtualService.getVirtualExpoPosts().pipe(
    map((data) => data.items),
    tap((data) => this.reqStatus.set('success')),
    catchError((err) => {
      this.reqStatus.set('failed');
      throw err;
    }),
  );
}
