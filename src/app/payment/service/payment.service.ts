import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestApiService } from 'src/app/core/service/rest-api.service';

import { default as CARD_TYPES, CardTypesContainer } from '../model/card-types';
import { IPaymentDetails } from '../model/i-payment-details';
import { IPaymentQuery } from '../model/i-payment-query';
import { Month } from '../model/month.enum';

@Injectable()
export class PaymentService {

  constructor(readonly service: RestApiService){

  }
  /**
   * Collection of card types
   */
  private static readonly cardTypes: CardTypesContainer = CARD_TYPES;

  /**
   * Return payments based on query
   */
  public getPayments(paymentQuery: IPaymentQuery): Observable<IPaymentDetails[]> {
    return this.service.getPayments(paymentQuery);
  }

   /**
   * Save payments
   */
  public savePayment(payment: IPaymentDetails): Observable<IPaymentDetails[]> {
    return this.service.newPayment(payment);
  }


  /**
   * Return card type based on card number
   */
  public static getCardType(ccNum: string): string | null {
    for (const [key, val] of Array.from(PaymentService.cardTypes.entries())) {
      if (
        ccNum
          .split(new RegExp('[ \\-]'))
          .join('')
          .match(val)
      ) {
        return key;
      }
    }
    return null;
  }

  /**
   * Return months in numerical format
   */
  public static getMonths(): Array<Month> {
    const months: Array<Month> = [];
    // for (const key of Object.keys(Month)) {
    //   months.push(Month[key]);
    // }

    Object.entries(Month).forEach(item => {
      months.push(item[1]);
  });
    return months;
  }

  /**
   * Return years based on current year
   */
  public static getYears(): Array<number> {
    const years: Array<number> = [];
    const year = new Date().getFullYear();
    for (let i = -2; i < 5; i++) {
      years.push(year + i);
    }
    return years;
  }
}
