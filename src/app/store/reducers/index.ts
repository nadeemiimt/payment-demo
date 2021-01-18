import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { PaymentState, paymentReducer } from '../../payment/store/reducer/payment.reducer';
import { hydrationMetaReducer } from './hydration.reducer';


export interface State {
payment: PaymentState
}

export const reducers: ActionReducerMap<State> = {
payment: paymentReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [hydrationMetaReducer] : [hydrationMetaReducer];
