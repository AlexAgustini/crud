import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AddressForm } from '../../types/address-form.type';
import { PostalCodeService } from '../../../shared/services/postal-code.service';
import { AddressFormService } from '../../services/address-form.service';
import { Address } from '../../../shared/types/address.type';
import { AddressesService } from '../../../shared/services/addresses.service';
import { first } from 'rxjs';

@Component({
  selector: 'address-view',
  templateUrl: './address.view.html',
  styleUrls: ['./address.view.scss'],
})
export class AddressView {
  @Input('addressId') private addressId!: string;

  public isLoading!: boolean;
  public hasError!: boolean;
  public address!: Address;
  public addressFormGroup!: FormGroup<AddressForm>;

  constructor(
    private postalCodeService: PostalCodeService,
    public addressesService: AddressesService,
    private addressFormService: AddressFormService
  ) {}

  ngOnInit() {
    this.fetchAddressRegister();
  }

  private fetchAddressRegister(): void {
    this.addressesService
      .getAddressById(this.addressId)
      .pipe(first())
      .subscribe({
        next: (address) => {
          this.address = address;
        },
        error: () => {},
        complete: () => this.bootstrapForm(),
      });
  }

  private bootstrapForm(): void {
    this.addressFormGroup = this.addressFormService.create(this.address);

    console.log(this.addressFormGroup);
  }
}
