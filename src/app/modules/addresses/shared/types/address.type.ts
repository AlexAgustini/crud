export type Address = {
  _id: string;
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: number;
  ddd: number;
  siafi?: number;
  gia?: string;
  complemento?: string;
};
