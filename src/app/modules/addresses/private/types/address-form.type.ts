import { FormControl } from '@angular/forms';

export type AddressForm = {
  _id: FormControl<string>;
  cep: FormControl<string>;
  logradouro: FormControl<string>;
  complemento: FormControl<string>;
  bairro: FormControl<string>;
  localidade: FormControl<string>;
  uf: FormControl<string>;
  gia: FormControl<string>;
  ibge: FormControl<number>;
  ddd: FormControl<number>;
  siafi: FormControl<number>;
};
