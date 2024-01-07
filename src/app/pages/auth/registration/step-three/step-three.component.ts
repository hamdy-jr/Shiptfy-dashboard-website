import { AsyncPipe, NgForOf } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormGroupDirective,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { RegisterService } from '../register.service';

@Component({
  selector: 'app-step-three',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgForOf, RouterLink, AsyncPipe],
  templateUrl: './step-three.component.html',
  styleUrl: './step-three.component.css',
})
export class StepThreeComponent {
  registerService = inject(RegisterService);
  countries: any;
  route = inject(Router);

  subscriptionPackages$ = this.registerService
    .getSubscriptionPackages()
    .pipe(map((data) => data?.items));

  registrationForm: any;
  constructor(private rootFormGroup: FormGroupDirective) {}
  ngOnInit(): void {
    this.registrationForm = this.rootFormGroup.form;
    this.registrationForm = this.rootFormGroup.control;
    this.registerService.getCountries().subscribe((data) => {
      this.countries = data.items;
      console.log(this.countries);
    });
  }
  onSubmit() {
    const requestData = {
      firstName: this.registrationForm.controls.nameFirst.value,
      lastName: this.registrationForm.controls.nameLast.value,
      gender: this.registrationForm.controls.gender.value,
      field: this.registrationForm.controls.field.value,
      email: this.registrationForm.controls.email.value,
      phoneNumberCode: this.registrationForm.controls.phoneNumberCode.value,
      phoneNumber: this.registrationForm.controls.phoneNumber.value,
      password: this.registrationForm.controls.password.value,
      jobTitle: this.registrationForm.controls.jobTitle.value,
      bio: this.registrationForm.controls.bio.value,
      website: this.registrationForm.controls.website.value,
      linkedIn: this.registrationForm.controls.linkedIn.value,
      address: this.registrationForm.controls.address.value,
      areaId: this.registrationForm.controls.areaId.value,
      cityId: this.registrationForm.controls.cityId.value,
      countryId: this.registrationForm.controls.countryId.value,
      avatar: null,
      coordinateLatitude: this.countries[0].coordinate.latitude,
      coordinateLongitude: this.countries[0].coordinate.longitude,
      subscriptionPackageId:
        this.registrationForm.controls.subscriptionPackageId.value,
      subscriptionPackagePurchaseOptionId:
        this.registrationForm.controls.subscriptionPackagePurchaseOptionId
          .value,
    };
    console.log(this.registrationForm.value);
    if (this.registrationForm.valid) {
      this.registerService.onRegister(requestData);
      this.route.navigate(['/login']);
    }
  }
}
