import { TransactionType } from '../enums/transaction-type';

export interface Transaction {
  id: number;
  value: number;
  type: TransactionType;
  title: string;
}
