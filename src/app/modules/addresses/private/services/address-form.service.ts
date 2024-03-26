import { Injectable } from '@angular/core';
import { AddressForm } from '../types/address-form.type';
import { Address } from '../../shared/types/address.type';
import { FormGroup, NonNullableFormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class AddressFormService {
  constructor(private fb: NonNullableFormBuilder) {}

  public create(address?: Address): FormGroup<AddressForm> {
    const formGroup: FormGroup<AddressForm> = this.fb.group({
      bairro: address?.bairro,
      cep: address?.cep,
      complemento: address?.complemento,
      siafi: address?.siafi,
      ddd: address?.ddd,
      gia: address?.gia,
      ibge: address?.ibge,
      localidade: address?.localidade,
      logradouro: address?.logradouro,
      uf: address?.uf,
    });

    return formGroup;
  }

  public merge(
    addressForm: NonNullable<FormGroup<AddressForm>>
  ): Partial<Address> {
    const formValue = addressForm.value;

    return {
      bairro: formValue.bairro,
      cep: formValue.cep,
      complemento: formValue.complemento,
      ibge: formValue.ibge,
      ddd: formValue.ddd,
      gia: formValue.gia,
      localidade: formValue.localidade,
      logradouro: formValue.logradouro,
      siafi: formValue.siafi,
      uf: formValue.uf,
    };
  }
}
