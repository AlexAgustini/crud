import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AddressView } from './private/views/address-view/address.view';
import { AddressesListView } from './private/views/addresses-list-view/addresses-list.view';
import { AddressesRoutingModule } from './addresses-routing.module';
import { FormFieldsModule } from 'src/app/common/components/form-fields/form-fields.module';
import { provideToastr } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AddressView, AddressesListView],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    AddressesRoutingModule,
    FormFieldsModule,
  ],
  providers: [],
})
export class AddressesModule {}
