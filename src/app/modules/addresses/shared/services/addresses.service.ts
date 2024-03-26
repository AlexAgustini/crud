import { Injectable } from '@angular/core';
import { Address } from '../types/address.type';
import { Observable, delay } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AddressesService {
  private readonly baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = `${environment.urls.baseApiUrl}/addresses`;
  }

  public getAllAddresses(): Observable<Array<Address>> {
    return this.httpClient.get<Array<Address>>(this.baseUrl).pipe(delay(500));
  }

  public getAddressById(addressId: string): Observable<Address> {
    const url = `${this.baseUrl}/${addressId}`;
    return this.httpClient.get<Address>(url).pipe(delay(500));
  }

  public saveAddress(
    address: Partial<Address>,
    addressId?: string
  ): Observable<Address> {
    let url = this.baseUrl;

    if (addressId) {
      url += `/${addressId}`;
      return this.httpClient.put<Address>(url, address).pipe(delay(500));
    } else {
      return this.httpClient.post<Address>(url, address).pipe(delay(500));
    }
  }

  public deleteAddressById(addressId: string): Observable<void> {
    const url = `${this.baseUrl}/${addressId}`;
    return this.httpClient.delete<void>(url).pipe(delay(500));
  }
}
