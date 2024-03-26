import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AddressDto } from '../types/address-dto.type';

@Injectable({
  providedIn: 'root',
})
export class PostalCodeService {
  private readonly apiUrl: string;

  constructor(private httpClient: HttpClient) {
    this.apiUrl = environment.urls.viacepApiUrl;
  }

  public getPostalCode(postalCode: string): Observable<AddressDto> {
    const url = `${this.apiUrl}/${postalCode}/json`;

    return this.httpClient.get<AddressDto>(url);
  }
}
