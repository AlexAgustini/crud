import { Address } from './address.type';

export type AddressDto = Omit<Address, '_id'>;
