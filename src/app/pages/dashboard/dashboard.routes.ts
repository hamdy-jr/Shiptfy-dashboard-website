import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { CustomersTableComponent } from './Pages/customers-table/customers-table.component';
import { AdministratorGuard } from '../../authantication/auth.guard';
import { IndexComponent } from './Pages/index/index.component';
import { SubscriptionRequestsComponent } from './Pages/subscription-requests/subscription-requests.component';
import { SkillsComponent } from './Pages/skills/skills.component';
import { SubscriptionPackagesComponent } from './Pages/subscription-packages/subscription-packages.component';
import { VirtualExpoComponent } from './Pages/virtial-expo/virtual-expo.component';
import { HeadHuntComponent } from './Pages/head-hunt/head-hunt.component';

export const DashboardRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AdministratorGuard],
    children: [
      {
        path: '',
        component: IndexComponent,
      },
      {
        path: 'customers',
        component: CustomersTableComponent,
      },
      {
        path: 'subscriptions-request',
        component: SubscriptionRequestsComponent,
      },
      {
        path: 'skills',
        component: SkillsComponent,
      },
      {
        path: 'subscriptions-packages',
        component: SubscriptionPackagesComponent,
      },
      {
        path: 'virtual-expo',
        component: VirtualExpoComponent,
      },
      {
        path: 'head-hunt',
        component: HeadHuntComponent,
      },
    ],
  },
];
