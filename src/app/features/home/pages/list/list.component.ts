import { Component, inject, input, linkedSignal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ConfirmationDialogService } from '../../../../../shared/dialog/confirmation/services/confirmation-dialog.service';
import { FeedbackService } from '../../../../shared/feddback/services/feedback.service';
import { Transaction } from '../../../../shared/transaction/interfaces/transaction';
import { TransactionsService } from '../../../../shared/transaction/services/transactions.service';
import { MatButtonModule } from '@angular/material/button';
import { Balance } from './components/balance/balance';
import { NoTransactions } from './components/no-transactions/no-transactions';
import { TransactionItem } from './components/transaction-item/transaction-item';
import { TransactionsContainerComponent } from './components/transactions-container/transactions-container.component';

@Component({
  selector: 'app-list',
  imports: [
    Balance,
    MatButtonModule,
    RouterLink,
    TransactionsContainerComponent,
    TransactionItem,
    NoTransactions,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  private transactionsService = inject(TransactionsService);
  private feedbackService = inject(FeedbackService);
  private router = inject(Router);
  private confirmationDialogService = inject(ConfirmationDialogService);

  transactions = input.required<Transaction[]>();

  items = linkedSignal(() => this.transactions());

  ngOnInit(): void {}

  edit($transaction: Transaction) {
    this.router.navigate(['edit', $transaction.id]);
  }

  remove(transaction: Transaction) {
    this.confirmationDialogService
      .open({
        title: 'Deletar transação',
        message: 'Você realmente quer deletar a transação?',
        yesButtonText: 'Sim',
        noButtonText: 'Não',
      })
      .subscribe({
        next: () => {
          this.removeTransactionFromArray(transaction);
          this.feedbackService.success('Transação removida com sucesso');
        },
      });

    this.transactionsService.delete(transaction.id).subscribe({
      next: () => {},
    });
  }

  private removeTransactionFromArray(transaction: Transaction) {
    this.items.update((transactions) => transactions.filter((item) => item.id !== transaction.id));
  }
}
