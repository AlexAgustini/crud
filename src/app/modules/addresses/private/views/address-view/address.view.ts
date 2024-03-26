import { Component, DestroyRef, Input } from '@angular/core';
import { AddressForm } from '../../types/address-form.type';
import { PostalCodeService } from '../../../shared/services/postal-code.service';
import { AddressFormService } from '../../services/address-form.service';
import { Address } from '../../../shared/types/address.type';
import { AddressesService } from '../../../shared/services/addresses.service';
import {
  Observable,
  debounceTime,
  distinctUntilChanged,
  filter,
  firstValueFrom,
  switchMap,
  tap,
} from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { FormControl, FormGroup } from '@angular/forms';
import { AddressDto } from '../../../shared/types/address-dto.type';
import { ToastrService } from 'ngx-toastr';
import { states } from '../../helpers/states';
import { Router } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'address-view',
  templateUrl: './address.view.html',
  styleUrls: ['./address.view.scss'],
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('.3s ease', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class AddressView {
  @Input('addressId') private addressId!: string;

  public isLoading!: boolean;
  public isFetchingPostalCode!: boolean;
  public isSaving!: boolean;
  public isRemoving!: boolean;
  public hasError!: boolean;
  public addressFormGroup!: FormGroup<AddressForm>;
  public states = states;

  constructor(
    public addressesService: AddressesService,
    private addressFormService: AddressFormService,
    private postalCodeService: PostalCodeService,
    private toastrService: ToastrService,
    private router: Router,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit() {
    if (this.addressId) {
      this.fetchAddressRegister();
    } else {
      this.bootstrapForm();
    }
  }

  public async fetchAddressRegister(): Promise<void> {
    this.isLoading = true;
    this.hasError = false;

    try {
      const address = await firstValueFrom(
        this.addressesService.getAddressById(this.addressId)
      );

      this.bootstrapForm(address);
    } catch (error: any) {
      this.hasError = true;
      this.toastrService.error(
        'Ocorreu um erro ao buscar dados do endereço. Detalhes: ' +
          error.error.message,
        'Erro!',
        {
          positionClass: 'toast-bottom-right',
        }
      );
    } finally {
      this.isLoading = false;
    }
  }

  public async saveAddress(): Promise<void> {
    if (this.addressFormGroup.invalid) {
      this.addressFormGroup.markAllAsTouched();
      return;
    }

    const formValue = this.addressFormService.merge(this.addressFormGroup);
    this.isSaving = true;

    try {
      await firstValueFrom(
        this.addressesService.saveAddress(formValue, this.addressId)
      );
      this.toastrService.success('Endereço salvo com sucesso', 'Sucesso!', {
        positionClass: 'toast-bottom-right',
      });
      this.router.navigateByUrl('/addresses');
    } catch (error: any) {
      this.toastrService.error(
        'Ocorreu um erro ao salvar o endereço. Detalhes: ' +
          error.error.message,
        'Erro!',
        {
          positionClass: 'toast-bottom-right',
        }
      );
    } finally {
      this.isSaving = false;
    }
  }

  public async removeAddress(): Promise<void> {
    this.isRemoving = true;
    try {
      await firstValueFrom(
        this.addressesService.deleteAddressById(this.addressId)
      );
      this.toastrService.success('Endereço excluído com sucesso', 'Sucesso!', {
        positionClass: 'toast-bottom-right',
      });
      this.router.navigateByUrl('/addresses');
    } catch (error: any) {
      this.toastrService.error(
        'Ocorreu um erro ao remover o endereço. Detalhes: ' +
          error.error.message,
        'Erro!',
        {
          positionClass: 'toast-bottom-right',
        }
      );
    } finally {
      this.isRemoving = false;
    }
  }

  private bootstrapForm(address?: Address): void {
    this.addressFormGroup = this.addressFormService.create(address);
    this.observePostalCodeChanges();
  }

  private observePostalCodeChanges(): void {
    this.addressFormGroup.controls.cep.valueChanges
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        distinctUntilChanged(),
        debounceTime(500),
        filter((postalCode) => postalCode?.length == 8),
        tap(() => (this.isFetchingPostalCode = true)),
        switchMap((postalCode) =>
          this.fetchPostalCodeInfo(postalCode as string)
        )
      )
      .subscribe({
        next: (address) => {
          this.fillFormInformation(address);
          this.isFetchingPostalCode = false;
        },
        error: (error) => {
          this.toastrService.error(
            'Ocorreu um erro ao buscar detalhes do código postal. Detalhes: ' +
              error.message,
            'Erro!',
            {
              positionClass: 'toast-bottom-right',
            }
          );
          this.isFetchingPostalCode = false;
        },
      });
  }

  private fillFormInformation(address: AddressDto): void {
    if ('erro' in address) {
      this.toastrService.error(
        'Não foi possível encontrar dados do cep fornecido',
        'Erro!',
        {
          positionClass: 'toast-bottom-right',
        }
      );

      return;
    }

    let key: keyof typeof address;
    for (key in address) {
      const value = address[key];
      const control = this.addressFormGroup.controls[key] as FormControl;
      control.setValue(value);
    }
  }

  private fetchPostalCodeInfo(postalCode: string): Observable<AddressDto> {
    return this.postalCodeService.getPostalCode(postalCode);
  }
}
