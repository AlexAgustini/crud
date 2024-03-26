import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AddressView } from './private/views/address-view/address.view';
import { AddressesListView } from './private/views/addresses-list-view/addresses-list.view';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: AddressesListView,
      },
      {
        path: ':addressId',
        component: AddressView,
      },
    ]),
  ],
})
export class AddressesRoutingModule {}
