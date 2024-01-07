import {
  Component,
  ElementRef,
  inject,
  Renderer2,
  signal,
  ViewChild,
} from '@angular/core';
import {
  AsyncPipe,
  CurrencyPipe,
  NgClass,
  NgForOf,
  NgIf,
  TitleCasePipe,
} from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { SkillsService } from './skills.service';
import { catchError, map, startWith, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

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
    AsyncPipe,
    NgIf,
  ],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css',
})
export class SkillsComponent {
  @ViewChild('model') model: ElementRef | undefined;
  @ViewChild('editModel') editModel: ElementRef | undefined;
  skillsService = inject(SkillsService);
  subscription: Subscription | undefined;
  reqStatus = signal<'loading' | 'failed' | 'success'>('loading');

  addSkillsForm = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });
  addSkill$ = this.addSkillsForm.valueChanges.pipe(
    startWith(this.addSkillsForm.value),
  );

  editSkillsForm = new FormGroup({
    id: new FormControl<string>('', [Validators.required]),
    name: new FormControl<string>('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });
  editSkill$ = this.editSkillsForm.valueChanges.pipe(
    startWith(this.editSkillsForm.value),
  );

  skills$ = this.skillsService.getSkills().pipe(
    tap((data) => this.reqStatus.set('success')),
    map((data) => {
      return data.items;
    }),
    catchError((err) => {
      this.reqStatus.set('failed');
      return [];
    }),
  );

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

  changeActiveStatus(id: string, active: boolean) {
    return this.skillsService
      .changeActiveStatus(id, !active)
      .subscribe((data) => {
        console.log(data);
      });
  }
  updateSkill(id: string, name: string, description: string) {
    return this.skillsService.updateSkill(id, name, description).subscribe();
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
    this.subscription = this.skillsService
      .addSkill(
        this.addSkillsForm.controls.name.value as string,
        this.addSkillsForm.value.description as string,
      )
      .subscribe();
    this.closeSkillModal();
  }
  onSubmitEditSkillForm(id: string) {
    this.subscription = this.updateSkill(
      this.editSkillsForm.controls.id.value as string,
      this.editSkillsForm.controls.name.value as string,
      this.editSkillsForm.value.description as string,
    );
    this.closeEditSkillModal();
  }
}
