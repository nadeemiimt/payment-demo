import { Component, EventEmitter, OnInit, Output, Input, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CardValidator } from './validator/card-validator';
import { IPaymentDetails } from './model/i-payment-details';
import { PaymentDetails } from './model/payment-details';
import { PaymentService } from './service/payment.service';
import {Store} from '@ngrx/store';
import {savePayment} from './store/action/payment.actions';
import {PaymentState} from './store/reducer/payment.reducer';
import { PaymentCardNumberPipe } from '../core/pipe/payment-card-number/payment-card-number.pipe';
import { ValidThruPipe } from '../core/pipe/valid-thru/valid-thru.pipe';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

/**
 * NgPaymentCard without any dependencies other then ReactiveFormsModule
 */
@Component({
  selector: 'ng-payment-card',
  templateUrl: './payment-card.component.html',
  styleUrls: ['./payment-card.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PaymentCardComponent implements OnInit {
  /**
   * FormGroup available publicly
   */
  /**
   * FormGroup available publicly
   */
  public ccForm!: FormGroup;

  /**
   * List of months
   */
  public months: Array<string> = [];

  /**
   * List of years
   */
  public years: Array<number> = [];

  /**
   * Validation message for missing payment card number
   */
  @Input()
  public ccNumMissingTxt? = 'Card number is required';

  /**
   * Validation message for too short payment card number
   */
  @Input()
  public ccNumTooShortTxt? = 'Card number is too short';

  /**
   * Validation message for too long payment card number
   */
  @Input()
  public ccNumTooLongTxt? = 'Card number is too long';

  /**
   * Validation message for payment card number that contains characters other than digits
   */
  @Input()
  public ccNumContainsLettersTxt? = 'Card number can contain digits only';

  /**
   * Validation message for invalid payment card  number (Luhn's validation)
   */
  @Input()
  public ccNumChecksumInvalidTxt? = 'Provided card number is invalid';

  /**
   * Validation message for missing card holder name
   */
  @Input()
  public cardHolderMissingTxt? = 'Card holder name is required';

  /**
   * Validation message for too long card holder name
   */
  @Input()
  public cardHolderTooLongTxt? = 'Card holder name is too long';

  /**
   * Validation message for missing expiration month
   */
  @Input()
  public expirationMonthMissingTxt? = 'Expiration month is required';

  /**
   * Validation message for missing expiration year
   */
  @Input()
  public expirationYearMissingTxt? = 'Expiration year is required';

  /**
   * Validation message for missing CCV number
   */
  @Input()
  public ccvMissingTxt? = 'CCV number is required';

  /**
   * Validation message for too short CCV number
   */
  @Input()
  public ccvNumTooShortTxt? = 'CCV number is too short';

  /**
   * Validation message for too long CCV number
   */
  @Input()
  public ccvNumTooLongTxt? = 'CCV number is too long';

  /**
   * Validation message for incorrect CCV number containing characters other than digits
   */
  @Input()
  public ccvContainsLettersTxt? = 'CCV number can contain digits only';

  /**
   * Validation message for expired card
   */
  @Input()
  public cardExpiredTxt? = 'Card has expired';

   /**
   * Validation message for invalid amount
   */
  @Input()
  public amountMissingTxt? = 'Card amount is required';

  /**
   * Validation message for invalid amount
   */
  @Input()
  public cardInvalidAmountTxt? = 'Invalid amount';

  /**
   * Switch validation of the payment card number
   */
  @Input()
  public validateCCNum? = true;

  /**
   * Switch validation of the payment card holder
   */
  @Input()
  public validateCardHolder? = true;

  /**
   * Switch validation of the payment amount
   */
  @Input()
  public validateamount? = true;

  /**
   * Switch validation of the payment card expiration month
   */
  @Input()
  public validateExpirationMonth? = true;

  /**
   * Switch validation of the payment card expiration year
   */
  @Input()
  public validateExpirationYear? = true;

  /**
   * Switch validation of the payment card expiration
   */
  @Input()
  public validateCardExpiration? = true;

  /**
   * Switch validation of the payment card CCV number
   */
  @Input()
  public validateCCV? = true;

  // /**
  //  * EventEmitter for payment card object
  //  */
  // @Output()
  // public formSaved: EventEmitter<IPaymentDetails> = new EventEmitter<PaymentDetails>();

  constructor(private _fb: FormBuilder, private store: Store<PaymentState>, readonly paymentCardNumber: PaymentCardNumberPipe, readonly validThruPipe: ValidThruPipe,private route:Router) {}

  public ngOnInit(): void {
    this.buildForm();
    this.assignDateValues();
  }

  /**
   * Populate months and years
   */
  private assignDateValues(): void {
    this.months = PaymentService.getMonths();
    this.years = PaymentService.getYears();
  }

  /**
   * Build reactive form
   */
  private buildForm(): void {
    this.ccForm = this._fb.group(
      {
        cardNumber: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(12),
            Validators.maxLength(19),
            CardValidator.numbersOnly,
            CardValidator.checksum,
          ]),
        ],
        cardHolder: ['', Validators.compose([Validators.required, Validators.maxLength(22)])],
        expirationMonth: ['', Validators.required],
        expirationYear: ['', Validators.required],
        ccv: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(4),
            CardValidator.numbersOnly,
          ]),
        ],
        amount: [ 
          '',
          Validators.compose([
          Validators.required,
            Validators.minLength(1),
            Validators.maxLength(22),
            CardValidator.numbersOnly, 
          ]),         
        ],
      },
      {
        validator: CardValidator.expiration,
      }
    );
  }

  /**
   * Returns payment card type based on payment card number
   */
  public getCardType(ccNum: any) {
    return PaymentService.getCardType(ccNum);
  }

  /**
   * Callback function that emits payment card details after user clicks submit, or press enter
   */
  public savePayment(): void {
    const cardDetails: IPaymentDetails = <PaymentDetails>this.ccForm.value;
    let pays: PaymentDetails[] = []; 
    pays.push(cardDetails);
    this.store.dispatch(savePayment({payments: pays}));
    this.route.navigate(['/home']);
    //this.formSaved.emit(cardDetails);
  }

}