import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AppStore} from '../app.store';

export function redirectLoginIfNotAuthenticated(): CanActivateFn {
  return (route) => {
    const user = inject(AppStore).user();
    const router = inject(Router);
    if (!user) {
      return router.parseUrl('/login')
    }
    return true
  };
}

export function redirectDashboardIfAuthenticated(): CanActivateFn {
  return (route) => {
    const user = inject(AppStore).user();
    const router = inject(Router);
    if (user) {
      return router.parseUrl('/dashboard')
    }
    return true
  };
}
