import { inject, Injectable } from '@angular/core';
import {
  AddVirtualExpoPostPhoto,
  VirtualExpoPostsClient,
} from '../../../../core/api/clients';

@Injectable({
  providedIn: 'root',
})
export class VirtualService {
  virtualClient = inject(VirtualExpoPostsClient);

  getVirtualExpoPosts() {
    return this.virtualClient.getDashboardViewPage(0, 10, undefined);
  }

  add(
    order: number,
    title: string,
    description: string,
    link: string,
    photos: AddVirtualExpoPostPhoto[],
  ) {
    return this.virtualClient.add(order, title, description, link, photos);
  }
}
