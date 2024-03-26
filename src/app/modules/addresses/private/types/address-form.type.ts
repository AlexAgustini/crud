import { FormControl } from '@angular/forms';

export type AddressForm = {
  cep: FormControl<string | undefined>;
  logradouro: FormControl<string | undefined>;
  complemento: FormControl<string | undefined>;
  bairro: FormControl<string | undefined>;
  localidade: FormControl<string | undefined>;
  uf: FormControl<string | undefined>;
  ibge: FormControl<number | undefined>;
  gia: FormControl<number | undefined>;
  ddd: FormControl<number | undefined>;
  siafi: FormControl<number | undefined>;
};
