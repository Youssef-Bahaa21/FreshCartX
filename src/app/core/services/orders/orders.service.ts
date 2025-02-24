import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private mytoken = localStorage.getItem("token");

  constructor(private httpClient: HttpClient) { }
  
  checkOutPayment(id: string, data: object): Observable<any> {
    const headers = new HttpHeaders({
      'token': `${this.mytoken}`
    });

    return this.httpClient.post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:4200`,
      { shippingAddress: data },
      { headers: headers }
    );
  }
}