import { environment } from './../../environments/environment';
import { Purchase } from './../common/purchase';
import { State } from './../common/state';
import { map } from 'rxjs/operators';
import { Country } from './../common/country';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {

  private baseUrl = environment.backendUrl;

  constructor(private httpClient: HttpClient) {}

  getCountries(): Observable<Country[]> {
    return this.httpClient.get<GetResponseCountry>(`${this.baseUrl}/countries`).pipe(
      map(response => response._embedded.countries)
    )
  }

  getState(countryCode:string): Observable<State[]> {
    return this.httpClient.get<GetResponseState>(`${this.baseUrl}/states/search/findByCountryCode?code=${countryCode}`).pipe(
      map(response => response._embedded.states)
    )
  }

  getCreditCardMonth(startMonth: number): Observable<number[]> {
    let data: number[] = [];

    for (let theMonth = startMonth; theMonth <= 12; theMonth++) {
      data.push(theMonth);
    }

    return of(data);
  }

  getCreditCardYear(): Observable<number[]> {
    let data: number[] = [];
    const startYear:number=new Date().getFullYear();
    const endYear:number=startYear +10;


    for (let theYear = startYear; theYear <= endYear; theYear++) {
      data.push(theYear);
    }

    return of(data);
  }

  placeOrder (purchase: Purchase):Observable<any>{
    return this.httpClient.post<Purchase>(`${this.baseUrl}/checkout/purchase`,purchase);
  }
  
}

interface GetResponseCountry {
  _embedded: {
    countries: Country[];
  },
}

interface GetResponseState{
  _embedded: {
    states: State[];
  },
}