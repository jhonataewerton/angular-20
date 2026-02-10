import { Routes } from '@angular/router';
import { Home } from './home';

export default [
  {
    path: '',
    // loadComponent: () => import('./home').then((m) => m.Home),
    component: Home,
  },
] as Routes;
