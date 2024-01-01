import { inject, Inject, Injectable } from '@angular/core';
import { ActiveSkill, SkillsClient } from '../../../../core/api/clients';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SkillsService {
  skillClient = inject(SkillsClient);

  addSkill(name: string, description: string) {
    return this.skillClient.post({
      name,
      description,
    });
  }
  getSkills() {
    return this.skillClient.getDashboardViewPage(0, 10, undefined);
  }
  changeActiveStatus(id: string, active: boolean) {
    return this.skillClient.active({ id, active });
  }

  updateSkill(id: string, name: string, description: string) {
    return this.skillClient.update({
      id,
      name,
      description,
    });
  }
}
