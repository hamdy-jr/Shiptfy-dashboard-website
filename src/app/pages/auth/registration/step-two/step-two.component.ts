import { Component, inject } from '@angular/core';
import {
  FormGroupDirective,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { RegisterService } from '../register.service';
import { NgForOf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-step-two',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgForOf, RouterLink],
  templateUrl: './step-two.component.html',
  styleUrl: './step-two.component.css',
})
export class StepTwoComponent {
  registerService = inject(RegisterService);
  countries: any;
  cities: any;
  areas: any;
  form: any;
  constructor(private rootFormGroup: FormGroupDirective) {}
  ngOnInit(): void {
    this.registerService.getCountries().subscribe((data) => {
      this.countries = data.items;
      console.log(this.countries);
    });
    this.form = this.rootFormGroup.control;
  }
  onSelectCountry(id: any) {
    this.registerService.getCities(id).subscribe((data) => {
      this.cities = data.items;
      console.log(this.cities);
    });
  }

  onSelectCity(id: any) {
    this.registerService.getAreas(id).subscribe((data) => {
      this.areas = data.items;
      console.log(this.countries);
    });
  }
}
