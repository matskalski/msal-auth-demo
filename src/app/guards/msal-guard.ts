import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Auth } from '../services/auth';

export const msalGuard: CanActivateFn = (route, state) => {
  console.log('guard')
  let authService = inject(Auth)

  return authService.isLogedIn();
};
