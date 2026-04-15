import { inject } from '@angular/core';
import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { LoggedInStoreService } from '../stores/logged-in-store.service';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {
  const loggedInUserStoreService = inject(LoggedInStoreService);

  if (loggedInUserStoreService.isLoggedIn()) {
    return true;
  }

  const router = inject(Router);
  const url = router.parseUrl('/auth/login');

  return new RedirectCommand(url);
};
