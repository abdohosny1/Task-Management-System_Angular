import { Component, OnInit, ViewChild, ElementRef, Input, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss']
})
export class TextInputComponent implements OnInit, ControlValueAccessor {
  @ViewChild('input', { static: true }) input!: ElementRef;
  @Input() type: string = 'text';
  @Input() lable?: string;

  constructor(@Self() public controlDir: NgControl) {
    this.controlDir.valueAccessor = this;
  }

  ngOnInit(): void {
    const control = this.controlDir.control;
    const validators = control?.validator ? [control.validator] : [];
    const asyncValidators = control?.asyncValidator ? [control.asyncValidator] : [];

    control?.setValidators(validators);
    control?.setAsyncValidators(asyncValidators);
    control?.updateValueAndValidity();
  }

  onChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement; // Use `as` for type assertion
    this.onChangeCallback(inputElement.value);
  }




  // Add a separate property for the change callback
  onChangeCallback: (value: string) => void = () => {};
    onTouched = () => {};

  writeValue(obj: any): void {
    if (this.input) {
      this.input.nativeElement.value = obj || '';
    }
  }



  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  registerOnChange(fn: (value: string) => void): void {
    this.onChangeCallback = fn;
  }

}
