import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormInputComponent } from './form-input/form-input.component';
import { FormSelectComponent } from './form-select/form-select.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

@NgModule({
  declarations: [FormInputComponent, FormSelectComponent],
  imports: [CommonModule, ReactiveFormsModule, NgxMaskDirective, NgxMaskPipe],
  exports: [FormInputComponent, FormSelectComponent],
  providers: [provideNgxMask()],
})
export class FormFieldsModule {}
