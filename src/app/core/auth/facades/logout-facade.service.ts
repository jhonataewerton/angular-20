import { inject, Injectable } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { AuthTokenStorageService } from "../services/auth-token-storage.service";
import { tap } from "rxjs";
import { LoggedInStoreService } from "../stores/logged-in-store.service";

@Injectable({
  providedIn: "root",
})
export class LogoutFacadeService {
  authService = inject(AuthService);
  authTokenStorageService = inject(AuthTokenStorageService);
  loggedInStoreService = inject(LoggedInStoreService);

  logout() {
    return this.authService.logout().pipe(
      tap(() => this.authTokenStorageService.remove()),
      tap(() => this.loggedInStoreService.logout())
    );
  }
}
