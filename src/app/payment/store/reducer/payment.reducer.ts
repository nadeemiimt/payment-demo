import { createReducer, on} from '@ngrx/store';
import {IPaymentDetails} from '../../model/i-payment-details';
import { loadPaymentsSuccess, savePaymentSuccess, loadPaymentsError, savePaymentError, loadPayments, savePayment } from '../action/payment.actions';


export const paymentFeatureKey = 'payment';

export interface PaymentState {
  payments: IPaymentDetails[];
  error: string;
}

export const initialState: PaymentState = {
  payments: [],
  error: ''
};

export const paymentReducer = createReducer(
  initialState,
  on(loadPayments, (state, {paymentQuery}) => ({ ...state, payments: state.payments, error: '' })),
  on(savePayment, (state, {payments}) => ({ ...state, payments: state.payments, error: '' })),
  on(loadPaymentsSuccess, (state, {payments}) => ({ ...state, payments: payments, error: '' })),
  on(savePaymentSuccess, (state, {payments}) => ({ ...state, payments: state.payments.concat(payments), error: '' })),
  on(loadPaymentsError, (state, {error}) => ({ ...state, payments: state.payments, error: error })),
  on(savePaymentError, (state, {error}) => ({ ...state, payments: state.payments, error: error })),
);

// unique()

export const selectPayment = (state: PaymentState) => state.payments;

export const selectError = (state: PaymentState) => state.error;
