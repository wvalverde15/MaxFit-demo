import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

type ControlValue = string | number | null;

@Component({
  selector: 'app-floating-select',
  standalone: true,
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => FloatingSelectComponent), multi: true }],
  templateUrl: './floating-select.component.html',
  styleUrl: './floating-select.component.scss'
})
export class FloatingSelectComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() inputId = `floating-select-${Math.random().toString(36).slice(2)}`;
  @Input() disabled = false;
  @Output() valueChange = new EventEmitter<ControlValue>();

  value: ControlValue = '';
  onChange: (value: ControlValue) => void = () => undefined;
  onTouched: () => void = () => undefined;

  get hasValue(): boolean { return this.value !== null && this.value !== undefined && String(this.value).length > 0; }

  writeValue(value: ControlValue): void { this.value = value ?? ''; }
  registerOnChange(fn: (value: ControlValue) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
  setDisabledState(disabled: boolean): void { this.disabled = disabled; }
  handleChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.value = value;
    this.onChange(value);
    this.valueChange.emit(value);
  }
}


