import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnChanges,
  signal,
} from '@angular/core';
import { PanoramaViewerComponent } from './panorama-viewer/panorama-viewer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgForOf, NgIf } from '@angular/common';
import { AddPhotoModelComponent } from './add-photo-model/add-photo-model.component';
import { VirtualService } from './virtual.service';
import { VirtualExpoDashboardView } from '../../../../core/api/clients';

@Component({
  selector: 'app-virtual-expo',
  standalone: true,
  imports: [
    PanoramaViewerComponent,
    ReactiveFormsModule,
    NgIf,
    AddPhotoModelComponent,
    NgForOf,
  ],
  templateUrl: './virtual-expo.component.html',
  styleUrl: './virtual-expo.component.css',
})
export class VirtualExpoComponent {
  virtualService = inject(VirtualService);
  virtualExpoPosts = signal<VirtualExpoDashboardView[]>([]);
  isUploadPhotoModalOpen = false;
  closeUploadPhotoModal(event: boolean) {
    this.isUploadPhotoModalOpen = event;
  }
  openUploadPhotoModal() {
    this.isUploadPhotoModalOpen = true;
  }
  updateVirtualExpoPosts(event: VirtualExpoDashboardView[]) {
    this.getVirtualExpoPosts();
  }
  getVirtualExpoPosts() {
    return this.virtualService.getVirtualExpoPosts().subscribe((res) => {
      this.virtualExpoPosts.set(res.items);
    });
  }
  ngOnInit() {
    this.getVirtualExpoPosts();
  }
}
