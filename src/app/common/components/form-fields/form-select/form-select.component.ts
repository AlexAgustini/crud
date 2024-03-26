import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'form-select',
  templateUrl: './form-select.component.html',
})
export class FormSelectComponent<T> {
  @Input({ required: true }) public formControlRef!: FormControl;
  @Input({ required: true }) options!: Array<T>;
  @Input({ required: true }) optionLabelKey!: keyof T;
  @Input({ required: true }) optionValueKey!: keyof T;
  @Input() public title!: string;
  @Input() placeholder!: string;

  @Output() optionSelected = new EventEmitter();

  ngOnInit() {}
}
