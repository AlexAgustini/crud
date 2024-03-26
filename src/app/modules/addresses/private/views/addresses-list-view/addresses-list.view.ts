import { Component } from '@angular/core';
import { Address } from '../../../shared/types/address.type';
import { Router } from '@angular/router';
import { AddressesService } from '../../../shared/services/addresses.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'addresses-list-view',
  templateUrl: './addresses-list.view.html',
  styleUrls: ['./addresses-list.view.scss'],
})
export class AddressesListView {
  constructor(
    private addressesService: AddressesService,
    private router: Router
  ) {}

  public isLoading!: boolean;
  public hasError!: boolean;

  public listingData!: Array<Address>;

  ngOnInit() {
    this.fetchAddresses();
  }

  public async fetchAddresses(): Promise<void> {
    this.isLoading = true;
    this.hasError = false;

    try {
      this.listingData = await firstValueFrom(
        this.addressesService.getAllAddresses()
      );
    } catch {
      this.hasError = true;
    } finally {
      this.isLoading = false;
    }
  }

  public editAddress(addressId: string) {
    this.router.navigate(['/addresses', addressId]);
  }
}
