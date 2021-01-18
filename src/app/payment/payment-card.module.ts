import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PaymentCardComponent } from './payment-card.component';
import { PaymentService } from './service/payment.service';
import { CoreModule } from '../core/core.module';
import { EffectsModule } from '@ngrx/effects';
import { PaymentEffects } from './store/effect/payment.effect';

/**
 * Monolithic module that is being bundled and published.
 * Depends only on ReactiveFormsModule and CommonModule.
 */
@NgModule({
  imports: [ReactiveFormsModule, CommonModule, CoreModule,
    EffectsModule.forFeature([PaymentEffects]),],
  declarations: [PaymentCardComponent],
  providers: [PaymentService],
  exports: [PaymentCardComponent],
})
export class PaymentCardModule {}