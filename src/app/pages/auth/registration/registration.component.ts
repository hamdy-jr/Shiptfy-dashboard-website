import { Component, inject, OnInit, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgFor, NgIf, NgStyle } from '@angular/common';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';
import { RegisterService } from './register.service';
import { FileParameter } from '../../../core/api/clients';
import { StepOneComponent } from './step-one/step-one.component';
import { StepTwoComponent } from './step-two/step-two.component';
import { StepThreeComponent } from './step-three/step-three.component';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule,
    RouterLink,
    NgFor,
    NgStyle,
    StepOneComponent,
    StepTwoComponent,
    StepThreeComponent,
    RouterOutlet,
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css',
})
export class RegistrationComponent implements OnInit {
  registerService = inject(RegisterService);
  activeRoute = inject(Router);
  step = this.activeRoute.url === '/register/step-three' ? 3 : 1;
  countries: any;

  subscriptionPackages: any;

  selectedFile: File | undefined;

  ngOnInit() {
    this.registerService.getCountries().subscribe((data) => {
      this.countries = data.items;
      console.log(this.countries);
    });
    this.registerService.getSubscriptionPackages().subscribe((data) => {
      this.subscriptionPackages = data.items;
      console.log(this.subscriptionPackages);
    });
  }

  registrationForm = new FormGroup({
    nameFirst: new FormControl<string>('', [Validators.required]),
    nameLast: new FormControl<string>('', [Validators.required]),
    gender: new FormControl<string>('', [Validators.required]),
    email: new FormControl<string>('', [Validators.required]),
    phoneNumber: new FormControl<string>('', [Validators.required]),
    phoneNumberCode: new FormControl<string>('', [Validators.required]),
    jobTitle: new FormControl<string>('', [Validators.required]),
    field: new FormControl<string>('', [Validators.required]),
    bio: new FormControl<string>('', [Validators.required]),
    website: new FormControl<string>('', [Validators.required]),
    linkedIn: new FormControl<string>('', [Validators.required]),
    areaId: new FormControl<string>('', [Validators.required]),
    cityId: new FormControl<string>('', [Validators.required]),
    countryId: new FormControl<string>('', [Validators.required]),
    password: new FormControl<string>('', [Validators.required]),
    address: new FormControl<string>('', [Validators.required]),
    subscriptionPackageId: new FormControl<string>('', [Validators.required]),
    subscriptionPackagePurchaseOptionId: new FormControl<string>('', [
      Validators.required,
    ]),
  });
}
