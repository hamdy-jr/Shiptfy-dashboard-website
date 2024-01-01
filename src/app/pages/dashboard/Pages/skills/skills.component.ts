import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  Renderer2,
  signal,
  ViewChild,
} from '@angular/core';
import { CurrencyPipe, NgClass, NgForOf, TitleCasePipe } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { IndexPageOfSkillView, SkillView } from '../../../../core/api/clients';
import { SkillsService } from './skills.service';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [
    CurrencyPipe,
    FormsModule,
    NgForOf,
    TitleCasePipe,
    ReactiveFormsModule,
    NgClass,
  ],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css',
})
export class SkillsComponent {
  @ViewChild('model') model: ElementRef | undefined;
  @ViewChild('editModel') editModel: ElementRef | undefined;
  skillsService = inject(SkillsService);

  skills = signal<SkillView[]>([]);
  isAddSkillModalOpen: boolean = false;
  isEditSkillModalOpen: boolean = false;
  constructor(private renderer: Renderer2) {
    this.renderer.listen('window', 'click', (e: Event) => {
      if (e.target === this.editModel?.nativeElement) {
        this.isEditSkillModalOpen = false;
      }
    });
    this.renderer.listen('window', 'click', (e: Event) => {
      if (e.target === this.model?.nativeElement) {
        this.isAddSkillModalOpen = false;
      }
    });
  }
  addSkillsForm = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });
  editSkillsForm = new FormGroup({
    id: new FormControl<string>('', [Validators.required]),
    name: new FormControl<string>('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

  ngOnInit() {
    this.getSkills();
  }
  getSkills() {
    return this.skillsService
      .getSkills()
      .subscribe((data: IndexPageOfSkillView) => {
        this.skills.set(data.items);
      });
  }
  changeActiveStatus(id: string, active: boolean) {
    return this.skillsService
      .changeActiveStatus(id, !active)
      .subscribe((data) => {
        console.log(data);
        this.getSkills();
      });
  }
  updateSkill(id: string, name: string, description: string) {
    return this.skillsService
      .updateSkill(id, name, description)
      .subscribe((data) => {
        console.log(data);
        this.getSkills();
      });
  }
  closeEditSkillModal() {
    this.isEditSkillModalOpen = false;
  }
  openSkillModal() {
    this.isAddSkillModalOpen = true;
  }
  openEditSkillModal(skill: {
    name: string | null;
    description: string | null;
    id: string | null;
  }) {
    this.isEditSkillModalOpen = true;
    this.editSkillsForm.controls.name.setValue(skill.name);
    this.editSkillsForm.controls.id.setValue(skill.id);
    this.editSkillsForm.controls.description.setValue(skill.description);
  }

  closeSkillModal() {
    this.isAddSkillModalOpen = false;
  }
  onSubmitAddSkillForm() {
    this.skillsService
      .addSkill(
        this.addSkillsForm.controls.name.value as string,
        this.addSkillsForm.value.description as string,
      )
      .subscribe((data: any) => {
        console.log(data);
        this.getSkills();
      });
    this.closeSkillModal();
  }
  onSubmitEditSkillForm(id: string) {
    console.log(id);
    this.updateSkill(
      this.editSkillsForm.controls.id.value as string,
      this.editSkillsForm.controls.name.value as string,
      this.editSkillsForm.value.description as string,
    );
    this.closeEditSkillModal();
  }

  ngOnDestroy() {
    this.getSkills().unsubscribe();
  }
}
