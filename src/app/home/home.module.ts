import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { PaymentService } from '../payment/service/payment.service';
import { PaymentCardNumberPipe } from '../core/pipe/payment-card-number/payment-card-number.pipe';
import { ValidThruPipe } from '../core/pipe/valid-thru/valid-thru.pipe';
import { CoreModule } from '../core/core.module';


@NgModule({
  imports: [CommonModule, CoreModule],
  declarations: [HomeComponent],
  providers: [PaymentService, PaymentCardNumberPipe, ValidThruPipe],
})
export class HomeModule { }
