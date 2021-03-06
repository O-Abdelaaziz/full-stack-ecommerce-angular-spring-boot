import { environment } from './../../environments/environment';
import { OrderHistory } from './../common/order-history';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderHistoryService {
  private baseUrl = environment.backendUrl;
  
  constructor(private httpClient:HttpClient) { }

  getOrderHistory(email:string):Observable<GetResponseOrderHistory>{
    const OrderHistoryUrl=`${this.baseUrl}/orders/search/findByCustomerEmailOrderByCreatedDateDesc?email=${email}`;
    return this.httpClient.get<GetResponseOrderHistory>(OrderHistoryUrl)
  }
}

interface GetResponseOrderHistory
{
  _embedded:{
    orders:OrderHistory[],
  }
}