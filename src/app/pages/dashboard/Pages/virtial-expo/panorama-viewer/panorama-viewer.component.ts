import { Component, Input } from '@angular/core';
import { PanoramaPreviewComponent } from './panorama-preview/panorama-preview.component';
import { VirtualExpoDashboardView } from '../../../../../core/api/clients';

@Component({
  selector: 'app-panorama-viewer',
  templateUrl: './panorama-viewer.component.html',
  standalone: true,
  styleUrls: ['./panorama-viewer.component.css'],
  imports: [PanoramaPreviewComponent],
})
export class PanoramaViewerComponent {
  @Input({ required: true }) virtualExpo!: VirtualExpoDashboardView;
  openPhotoPreview = false;

  closePreview(event: boolean) {
    this.openPhotoPreview = event;
  }
  openPreview() {
    this.openPhotoPreview = true;
  }
}
