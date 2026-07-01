import { inject, provideAppInitializer } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { AuthTokenStorageService } from "../services/auth-token-storage.service";
import { LoggedInStoreService } from "../stores/logged-in-store.service";
import { of, switchMap, tap } from "rxjs";
import { LoginFacadeService } from "../facades/login-facade.service";

export function provideLoggedInUser() {
  return provideAppInitializer((): any => {
    const authTokenStorageService = inject(AuthTokenStorageService);

    if (!authTokenStorageService.has()) return of();

    const loginFacadeService = inject(LoginFacadeService);
    const token = authTokenStorageService.get() as string;

    return loginFacadeService.refreshToken(token);
  });
}
