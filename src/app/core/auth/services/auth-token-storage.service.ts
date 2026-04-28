import { LocalStorageToken } from "./../tokens/local-storage";
import { inject, Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AuthTokenStorageService {
  private readonly key: string = "auth_token";
  localStorageToken = inject(LocalStorageToken);

  set(token: string) {
    this.localStorageToken.setItem(this.key, token);
  }

  has(): boolean {
    return Boolean(this.get());
  }

  get(): string | null {
    return this.localStorageToken.getItem(this.key);
  }
}
