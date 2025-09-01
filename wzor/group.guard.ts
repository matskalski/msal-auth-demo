import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

export const groupGuard: CanActivateFn = (route, state) => {
  return inject(AuthService).isUserInSecurityGroup();
};
