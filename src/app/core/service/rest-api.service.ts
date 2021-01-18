import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IPaymentDetails } from '../../payment/model/i-payment-details';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, filter, map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { IPaymentQuery } from 'src/app/payment/model/i-payment-query';

@Injectable({
  providedIn: CommonModule,
})
  export class RestApiService {
  
    // Define API
    apiURL = 'http://localhost:3000';
  
    constructor(private http: HttpClient) { }
  
    /*========================================
      CRUD Methods for consuming RESTful API
    =========================================*/
  
    // Http Options
    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }  
  
    // HttpClient API get() method => Fetch payment list
    getPayments(paymentQuery: IPaymentQuery): Observable<IPaymentDetails[]> {
      // paymentQury can be used for filter. leaving for now.
      return this.http.get<IPaymentDetails[]>(this.apiURL + '/payments')
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
    }
  
    // HttpClient API get() method => Fetch payment
    getPayment(id: string): Observable<IPaymentDetails> {
      return this.http.get<IPaymentDetails>(this.apiURL + '/payments/' + id)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
    }  
  
    // HttpClient API post() method => Create employee
    newPayment(payment: IPaymentDetails): Observable<IPaymentDetails[]> {
      return this.http.post<IPaymentDetails[]>(this.apiURL + '/payments', JSON.stringify(payment), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
    }
  
    // Error handling 
    handleError(error:any) {
      debugger;
       let errorMessage = '';
       if(error.error instanceof ErrorEvent) {
         // Get client-side error
         errorMessage = error.error.message;
       } else {
         // Get server-side error
         errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
       }
//       window.alert(errorMessage);
       return throwError(errorMessage);
    }
  
  }
  