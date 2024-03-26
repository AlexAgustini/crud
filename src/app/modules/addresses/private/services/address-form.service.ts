import { Injectable } from '@angular/core';
import { AddressForm } from '../types/address-form.type';
import { Address } from '../../shared/types/address.type';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class AddressFormService {
  constructor(private fb: FormBuilder) {}

  public create(address?: Address): FormGroup<AddressForm> {
    return this.fb.group({
      _id: address?._id,
      bairro: address?.bairro,
      cep: [address?.cep, Validators.required],
      ddd: [address?.ddd, Validators.required],
      ibge: [address?.ibge, Validators.required],
      localidade: [address?.localidade, Validators.required],
      logradouro: [address?.logradouro, Validators.required],
      uf: [address?.uf, Validators.required],
      siafi: address?.siafi,
      gia: address?.gia,
      complemento: address?.complemento,
    }) as FormGroup<AddressForm>;
  }

  public merge(addressForm: FormGroup<AddressForm>): Partial<Address> {
    const formValue = addressForm.value;

    return {
      bairro: formValue.bairro,
      cep: formValue.cep,
      complemento: formValue.complemento,
      localidade: formValue.localidade,
      logradouro: formValue.logradouro,
      uf: formValue.uf,
      gia: formValue.gia,
      siafi: Number(formValue.siafi),
      ibge: Number(formValue.ibge),
      ddd: Number(formValue.ddd),
    };
  }
}
