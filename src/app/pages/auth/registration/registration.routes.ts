import { Routes } from '@angular/router';
import { RegistrationComponent } from './registration.component';
import { StepOneComponent } from './step-one/step-one.component';
import { StepTwoComponent } from './step-two/step-two.component';
import { StepThreeComponent } from './step-three/step-three.component';
import { AdministratorGuard } from '../../../authantication/auth.guard';

export const RegistrationRoutes: Routes = [
  {
    path: 'register',
    component: RegistrationComponent,
    canActivate: [AdministratorGuard],
    children: [
      {
        path: '',
        component: StepOneComponent,
      },

      {
        path: 'step-two',
        component: StepTwoComponent,
      },
      {
        path: 'step-three',
        component: StepThreeComponent,
      },
    ],
  },
];
