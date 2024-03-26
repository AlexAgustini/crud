import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'form-input',
  templateUrl: './form-input.component.html',
})
export class FormInputComponent {
  @Input({ required: true }) public formControlRef!: FormControl;
  @Input() public title!: string;
  @Input() type: 'text' | 'number' = 'text';
  @Input() placeholder!: string;
  @Input() mask!: string;

  ngOnInit() {}
}
