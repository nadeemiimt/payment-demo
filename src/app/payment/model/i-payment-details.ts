export interface IPaymentDetails {
  id: string;
  cardNumber: string;
  cardHolder: string;
  expirationMonth: string;
  expirationYear: string;
  ccv: number;
  amount: string;
}
