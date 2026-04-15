import { InjectionToken } from '@angular/core';

export const LocalStorageToken = new InjectionToken<Storage>('LocalStorage', {
  providedIn: 'root',
  factory: () => window.localStorage,
});
