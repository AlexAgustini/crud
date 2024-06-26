import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'addresses',
    loadChildren: () =>
      import('./modules/addresses/addresses.module').then(
        (m) => m.AddressesModule
      ),
  },
  {
    path: '**',
    redirectTo: 'addresses',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { bindToComponentInputs: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
