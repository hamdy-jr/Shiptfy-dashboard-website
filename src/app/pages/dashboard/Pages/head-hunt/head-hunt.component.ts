import {
  Component,
  ElementRef,
  inject,
  Renderer2,
  signal,
  ViewChild,
} from '@angular/core';
import { AsyncPipe, DatePipe, NgForOf, TitleCasePipe } from '@angular/common';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';

import { HeadHuntService } from './head-hunt.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-head-hunt',
  standalone: true,
  imports: [NgForOf, ReactiveFormsModule, TitleCasePipe, DatePipe, AsyncPipe],
  templateUrl: './head-hunt.component.html',
  styleUrl: './head-hunt.component.css',
})
export class HeadHuntComponent {
  @ViewChild('model') model!: ElementRef;
  headHuntService = inject(HeadHuntService);
  isPostJobModelOpen = signal(false);

  postJobForm = new FormGroup({
    title: new FormControl<string>(''),
    description: new FormControl<string>(''),
    jobTitle: new FormControl<string>(''),
    yearsOfExperience: new FormControl<number | undefined>(undefined),
    deadline: new FormControl<Date | undefined>(undefined),
    skills: new FormArray([]),
  });

  constructor(private renderer: Renderer2) {
    this.renderer.listen('window', 'click', (e: Event) => {
      if (e.target === this.model?.nativeElement) {
        this.closePostJobModel();
      }
    });
  }

  headHunt$ = this.headHuntService
    .getHeadHunts()
    .pipe(map((data) => data.items));

  openPostJobModel() {
    this.isPostJobModelOpen.set(true);
  }
  closePostJobModel() {
    this.isPostJobModelOpen.set(false);
  }
}
