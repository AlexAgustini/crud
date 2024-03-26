import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AddressView } from './private/views/address-view/address.view';
import { AddressesListView } from './private/views/addresses-list-view/addresses-list.view';
import { AddressesRoutingModule } from './addresses-routing.module';

@NgModule({
  declarations: [AddressView, AddressesListView],
  imports: [ReactiveFormsModule, CommonModule, AddressesRoutingModule],
})
export class AddressesModule {}
