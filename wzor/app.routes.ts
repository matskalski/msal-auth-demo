import { Routes } from '@angular/router';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { OrderManagementComponent } from './components/order-management/order-management.component';
import { MsalGuard } from '@azure/msal-angular';
import { AppComponent } from './app.component';
import { groupGuard } from './auth/group.guard';

export const routes: Routes = [
  {
    path: '',
    component: AppComponent
  },
  {
    path: 'login',
    component: LoginFormComponent,
  },
  {
    path: 'orders',
    component: OrderManagementComponent,
    canActivate: [MsalGuard, groupGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
