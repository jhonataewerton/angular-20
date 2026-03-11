import { Routes } from '@angular/router';
import { CreateOrEditComponent } from './pages/create-or-edit/create-or-edit.component';
import { getTransactionByIdResolver } from './pages/create-or-edit/resolvers/get-transaction-by-id-resolver';
import { ListComponent } from './pages/list/list.component';
import { getTransactionResolver } from './pages/list/resolvers/get-transaction-resolver';

export default [
  {
    path: '',
    component: ListComponent,
    resolve: {
      transactions: getTransactionResolver,
    },
  },
  {
    path: 'create',
    component: CreateOrEditComponent,
  },
  {
    path: 'edit/:id',
    component: CreateOrEditComponent,
    resolve: {
      transaction: getTransactionByIdResolver,
    },
  },
] as Routes;
