import { Injectable } from '@angular/core';
import { Address } from '../types/address.type';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AddressesService {
  private readonly baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = environment.urls.baseApiUrl;
  }

  public getAddressById(addressId: string): Observable<Address> {
    return of(1) as any;
  }

  public saveAddress(address: Address): Observable<boolean> {
    return 1 as any;
  }

  public deleteAddressById(addressId: string): Observable<boolean> {
    return 1 as any;
  }
}
