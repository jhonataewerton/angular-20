import { FeedbackService } from './../../shared/feddback/services/feedback.service';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { Balance } from './components/balance/balance';
import { TransactionItem } from './components/transaction-item/transaction-item';
import { Transaction } from '../../shared/transaction/interfaces/transaction';
import { NoTransactions } from './components/no-transactions/no-transactions';
import { TransactionsService } from '../../shared/transaction/services/transactions.service';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogService } from '../../../shared/dialog/confirmation/services/confirmation-dialog.service';

@Component({
  selector: 'app-home',
  imports: [Balance, TransactionItem, NoTransactions, MatButtonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  private transactionsService = inject(TransactionsService);
  private feedbackService = inject(FeedbackService);
  private router = inject(Router);
  private confirmationDialogService = inject(ConfirmationDialogService);

  transactions = signal<Transaction[]>([]);

  ngOnInit(): void {
    this.getTransections();
  }

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
    this.transactions.update((transactions) =>
      transactions.filter((item) => item.id !== transaction.id),
    );
  }

  private getTransections() {
    this.transactionsService.getAll().subscribe({
      next: (transactions) => {
        this.transactions.set(transactions);
      },
    });
  }
}
