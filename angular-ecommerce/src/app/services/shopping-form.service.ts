import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Country } from '../common/country';
import { State } from '../common/state';

@Injectable({
  providedIn: 'root'
})
export class ShoppingFormService {

  constructor(private httpClient: HttpClient) { }

  private countryUrl = "http://localhost:8080/api/country";
  private stateUrl = "http://localhost:8080/api/state";

  getCreditCardMonths(startMonth: number): Observable<number[]> {
    let data: number[] = [];
    for( let theMonth=startMonth; theMonth<= 12; theMonth++) {
      data.push(theMonth);
    }
    return of(data);
  }

  

  getCreditCardYears(): Observable<number[]> {
    let data: number[] = [];
    const startYear: number = new Date().getFullYear();
    const endYear = startYear+10;
    for(let year = startYear; year<= endYear; year++) {
      data.push(year);
    }
    return of(data);
  }

  getCountries(): Observable<Country[]> {
    return this.httpClient.get<GetResponseCountries>(this.countryUrl).pipe(
      map(response => response._embedded.country)
    );
  }

  getStates(theCountryCode: string): Observable<State[]> {
    return this.httpClient.get<GetResponseState>(`${this.stateUrl}/search/findByCountryCode?code=${theCountryCode}`).pipe(
      map(response => response._embedded.state)
    );
  }

}

interface GetResponseCountries {
  _embedded : {
    country: Country[];
  }
}

interface GetResponseState {
  _embedded : {
    state: State[];
  }
}
