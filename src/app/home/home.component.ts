import { Component, OnDestroy, OnInit } from '@angular/core';
import {select, Store} from '@ngrx/store';
import {selectPayments} from '../payment/store/selector/payment.selectors';
import {PaymentState} from '../payment/store/reducer/payment.reducer';
import { IPaymentDetails } from '../payment/model/i-payment-details';
import { Observable, Subject } from 'rxjs';
import { PaymentService } from '../payment/service/payment.service';
import { PaymentCardNumberPipe } from '../core/pipe/payment-card-number/payment-card-number.pipe';
import { ValidThruPipe } from '../core/pipe/valid-thru/valid-thru.pipe';
import { loadPayments, loadPaymentsSuccess } from '../payment/store/action/payment.actions';
import { map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  private readonly ngUnsubscribe = new Subject<void>();
  payments$: Observable<IPaymentDetails[]> | undefined;
  constructor(readonly store: Store<PaymentState>, readonly paymentCardNumber: PaymentCardNumberPipe, readonly validThruPipe: ValidThruPipe) {
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
  
  ngOnInit(): void {
    this.payments$ = this.store.pipe(select(selectPayments)
    ,takeUntil(this.ngUnsubscribe)  // avoid memory leak
    );
  }

   /**
   * Returns payment card type based on payment card number
   */
  public getCardType(ccNum: any) {
    return PaymentService.getCardType(ccNum);
  }

}
