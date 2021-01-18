import { Action, createAction, props } from '@ngrx/store';
import {IPaymentDetails} from '../../model/i-payment-details';
import {IPaymentQuery} from '../../model/i-payment-query';

export enum PaymentActionTypes {
  LoadPayments = '[Home Page] Load Payments',
  LoadPaymentsSuccess = '[Home Page] Load Payments Success',
  SavePayment = '[Payment] Save Payment',
  SavePaymentSuccess = '[Payment] Save Payment Success',
  PaymentsLoadError = '[Payment] Payment Load Error',
  PaymentSaveError = '[Payment] Payment Save Error'
}

export const savePayment = createAction(PaymentActionTypes.SavePayment,  props<{payments: IPaymentDetails[]}>());
export const savePaymentSuccess = createAction(PaymentActionTypes.SavePaymentSuccess,  props<{payments: IPaymentDetails[]}>());
export const loadPayments = createAction(PaymentActionTypes.LoadPayments,  props<{paymentQuery: IPaymentQuery}>());
export const loadPaymentsSuccess = createAction(PaymentActionTypes.LoadPaymentsSuccess,  props<{payments: IPaymentDetails[]}>());
export const loadPaymentsError = createAction(PaymentActionTypes.PaymentsLoadError,  props<{error: any}>());
export const savePaymentError = createAction(PaymentActionTypes.PaymentSaveError,  props<{error: any}>());