import { inject, Injectable } from '@angular/core';
import { HeadhuntClient, SkillsClient } from '../../../../core/api/clients';

@Injectable({
  providedIn: 'root',
})
export class HeadHuntService {
  headHuntClients = inject(HeadhuntClient);
  skillsClient = inject(SkillsClient);
  getSkillsAppView() {
    // return this.skillsClient.getSkillsAppView(0, 10, null);
  }

  getHeadHunts() {
    return this.headHuntClients.getDashboardViewPage(0, 10, null, undefined);
  }
}
