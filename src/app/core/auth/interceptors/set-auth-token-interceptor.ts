import { HttpInterceptorFn } from "@angular/common/http";
import { AuthTokenStorageService } from "../services/auth-token-storage.service";
import { inject } from "@angular/core";
import { LoggedInStoreService } from "../stores/logged-in-store.service";

export const setAuthTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const loggedInUserStoreService = inject(LoggedInStoreService);

  if (!loggedInUserStoreService.isLoggedIn()) return next(req);

  const token = inject(AuthTokenStorageService).get();

  const modifiedReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  return next(modifiedReq);
};
