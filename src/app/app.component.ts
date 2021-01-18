import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Globals } from './core/globals';
import { loadPayments } from './payment/store/action/payment.actions';
import { PaymentState } from './payment/store/reducer/payment.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(readonly store: Store<PaymentState>,private globals: Globals) {
    if(!this.globals.isLoaded) // to avoid reloading from server /api if we are
    {
      console.log(this.globals.isLoaded)
    this.store.dispatch(loadPayments({paymentQuery: {pageSize: 10, currentPage: 1, searchText: ''}}));  // initial load from db
    this.globals.isLoaded = true;
    }
  }
  title = 'credit-card-payment';
}
