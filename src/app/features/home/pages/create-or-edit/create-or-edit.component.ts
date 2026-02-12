import { Component, inject, input, computed } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAnchor, MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { TransactionType } from '../../../../shared/transaction/enums/transaction-type';
import { NgxMaskDirective } from 'ngx-mask';
import { TransactionsService } from '../../../../shared/transaction/services/transactions.service';
import {
  Transaction,
  TransactionPayload,
} from '../../../../shared/transaction/interfaces/transaction';
import { Router } from '@angular/router';
import { FeedbackService } from '../../../../shared/feddback/services/feedback.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-create',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatAnchor,
    MatButtonModule,
    MatButtonToggleModule,
    NgxMaskDirective,
  ],
  templateUrl: './create-or-edit.component.html',
  styleUrl: './create-or-edit.component.scss',
})
export class CreateOrEditComponent {
  private transactionService = inject(TransactionsService);
  private router = inject(Router);
  private feedbackService = inject(FeedbackService);

  transaction = input<Transaction>();

  readonly transactionType = TransactionType;

  isEdit = computed(() => Boolean(this.transaction()));

  form = computed(
    () =>
      new FormGroup({
        type: new FormControl(this.transaction()?.type ?? '', {
          validators: [Validators.required],
        }),
        title: new FormControl(this.transaction()?.title ?? '', {
          validators: [Validators.required],
        }),
        value: new FormControl(this.transaction()?.value ?? '', {
          validators: [Validators.required],
        }),
      }),
  );

  submit() {
    if (this.form().invalid) return;

    const payload: TransactionPayload = {
      title: this.form().value.title as string,
      type: this.form().value.type as TransactionType,
      value: this.form().value.value as number,
    };

    this.createOrEdit(payload)
      .pipe(tap(() => this.router.navigate(['/'])))
      .subscribe();
  }

  private createOrEdit(payload: TransactionPayload) {
    if (this.isEdit()) {
      return this.transactionService
        .put(this.transaction()!.id, payload)
        .pipe(tap(() => this.feedbackService.success('Transação alterada com sucesso')));
    } else {
      return this.transactionService
        .post(payload)
        .pipe(tap(() => this.feedbackService.success('Transação criada com sucesso')));
    }
  }
}
