import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { savePayment, loadPayments, loadPaymentsError, savePaymentError, loadPaymentsSuccess, savePaymentSuccess } from '../action/payment.actions';
import { map, catchError, switchMap } from 'rxjs/operators';
import { PaymentService } from '../../service/payment.service';
import { of } from 'rxjs';
import { displaySuccess, displayError } from 'src/app/core/store/action/notification.action';
import { Store } from '@ngrx/store';
import { PaymentState } from '../reducer/payment.reducer';

@Injectable()
export class PaymentEffects {

    loadPayment$ = createEffect(() => 
    this.actions$.pipe(
        ofType(loadPayments),
        switchMap(action => this.paymentService.getPayments(action.paymentQuery)
            .pipe(
                map(payments => (loadPaymentsSuccess({payments: payments}))),
                catchError(e => of(loadPaymentsError(e))))
        )
    )
    );

    savePayment$ = createEffect(() => this.actions$.pipe(
        ofType(savePayment),
        switchMap(action => this.paymentService.savePayment(action.payments[0])
            .pipe(
                map(payments => (savePaymentSuccess({payments: payments}))),
                catchError(e => of(savePaymentError(e))))
        )
    ));

    // loadPaymentSuccess$ = createEffect(() => this.actions$.pipe(
    //     ofType(loadPaymentsSuccess),
    //     map(action =>
    //         displaySuccess({
    //             title: "Load Success",
    //             description: 'Total ' + action.payments.length + ' payments record',
    //         })
    //     )
    // )
    // );

    savePaymentSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(savePaymentSuccess),
        map(action =>
            displaySuccess({
                title: "Save Success",
                description: '',
            })
        )
    )
    );

    loadPaymentError$ = createEffect(() => this.actions$.pipe(
        ofType(loadPaymentsError),
        map(action =>
            displayError({
                title: "Load Error",
                description: action.error,
            })
        )
    )
    );

    savePaymentError$ = createEffect(() => this.actions$.pipe(
        ofType(savePaymentError),
        map(action =>
            displayError({
                title: "Save Error",
                description: action.error,
            })
        )
    )
    );

    constructor(private actions$: Actions, private paymentService: PaymentService, private store: Store<PaymentState>,) { }

}

