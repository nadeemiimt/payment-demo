import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { RestApiService } from './service/rest-api.service';
import { PaymentCardNumberPipe } from './pipe/payment-card-number/payment-card-number.pipe';
import { ValidThruPipe } from './pipe/valid-thru/valid-thru.pipe';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { EffectsModule } from '@ngrx/effects';
import { NotificationEffects } from './store/effect/notification.effect';



@NgModule({
  declarations: [PaymentCardNumberPipe, ValidThruPipe, PageNotFoundComponent],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    EffectsModule.forFeature([NotificationEffects]),
  ],
  providers: [RestApiService],
  exports: [PaymentCardNumberPipe, ValidThruPipe]
})
export class CoreModule { }
