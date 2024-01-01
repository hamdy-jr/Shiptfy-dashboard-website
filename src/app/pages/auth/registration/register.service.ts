import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {
  CustomersClient,
  IndexPageOfAreaAppView,
  IndexPageOfCityAppView,
  IndexPageOfCountryAppView,
  IndexPageOfSubscriptionPackageAppView,
} from '../../../core/api/clients';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  http = inject(HttpClient);

  customersClient = inject(CustomersClient);

  getCountries() {
    return this.http.get<IndexPageOfCountryAppView>(
      'http://localhost:4476/countries/app-view',
    );
  }

  getCities(id: string) {
    return this.http.get<IndexPageOfCityAppView>(
      `http://localhost:4476/countries/${id}/cities/app-view`,
    );
  }

  getAreas(id: any) {
    return this.http.get<IndexPageOfAreaAppView>(
      `http://localhost:4476/cities/${id}/areas/app-view`,
    );
  }

  getSubscriptionPackages() {
    return this.http.get<IndexPageOfSubscriptionPackageAppView>(
      'http://localhost:4476/subscription-packages/app-view',
    );
  }

  onRegister(formData: any) {
    this.customersClient
      .register(
        formData.firstName,
        formData.lastName,
        formData.gender,
        formData.field,
        formData.email,
        formData.phoneNumberCode,
        formData.phoneNumber,
        formData.password,
        formData.jobTitle,
        formData.bio,
        formData.website,
        formData.linkedIn,
        formData.address,
        formData.areaId,
        formData.cityId,
        formData.countryId,
        formData.avatar,
        formData.coordinateLatitude,
        formData.coordinateLongitude,
        formData.subscriptionPackageId,
        formData.subscriptionPackagePurchaseOptionId,
      )
      .subscribe((res) => {
        console.log(res);
      });
  }
}
