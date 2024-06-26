import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state): boolean => {
  const authService = inject(AuthService);
  const router = inject(Router);
  let token!: string | null;
  authService.token$.subscribe((token$) => (token = token$));
  if (token) return true;
  else {
    router.navigate(['login']);
    return false;
  }
};
