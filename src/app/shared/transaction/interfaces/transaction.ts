import { TransactionType } from '../enums/transaction-type';

export interface Transaction {
  value: number;
  type: TransactionType;
  title: string;
}
