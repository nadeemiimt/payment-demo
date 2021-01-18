import { IPaymentDetails } from './i-payment-details';

export class PaymentDetails implements IPaymentDetails {
  id: string;
  public cardHolder: string;
  public cardNumber: string;
  public ccv: number;
  public expirationMonth: string;
  public expirationYear: string;
  public amount: string;

  constructor(id: string, cardHolder: string, cardNumber: string, ccv: number, expirationMonth: string, expirationYear: string, amount: string) {
    this.id = id;
    this.cardHolder = cardHolder;
    this.cardNumber = cardNumber;
    this.ccv = ccv;
    this.expirationYear = expirationYear;
    this.expirationMonth = expirationMonth;
    this.amount = amount;
  }
}
