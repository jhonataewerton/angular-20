import { inject, provideAppInitializer } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { AuthTokenStorageService } from "../services/auth-token-storage.service";
import { LoggedInStoreService } from "../stores/logged-in-store.service";
import { of, switchMap, tap } from "rxjs";

export function provideLoggedInUser() {
  return provideAppInitializer((): any => {
    const authTokenStorageService = inject(AuthTokenStorageService);

    if (!authTokenStorageService.has()) return of();

    const loggedInStoreService = inject(LoggedInStoreService);
    const authService = inject(AuthService);

    const token = authTokenStorageService.get() as string;

    return authService.refreshToken(token).pipe(
      tap((res) => authTokenStorageService.set(res.token)),
      switchMap((res) => authService.getCurrentUser(res.token)),
      tap((user) => loggedInStoreService.setUser(user))
    );
  });
}
