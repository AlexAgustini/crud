import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Address } from '../types/address.type';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PostalCodeService {
  private readonly apiUrl: string;

  constructor(private httpClient: HttpClient) {
    this.apiUrl = environment.urls.viacepApiUrl;
  }

  public getPostalCode(postalCode: string): Observable<Omit<Address, 'id'>> {
    const url = `${this.apiUrl}/${postalCode}/json`;

    return this.httpClient.get<Omit<Address, 'id'>>(url);
  }
}
