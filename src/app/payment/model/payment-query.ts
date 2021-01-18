import { IPaymentQuery } from './i-payment-query';

export class PaymentQuery implements IPaymentQuery {
  public pageSize: number;
  public currentPage: number;
  public searchText: string;

  constructor(pageSize: number, currentPage: number, searchText: string) {
    this.pageSize = pageSize;
    this.currentPage = currentPage;
    this.searchText = searchText;
  }
}
