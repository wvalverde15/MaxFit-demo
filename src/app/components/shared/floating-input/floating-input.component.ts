import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

type ControlValue = string | number | null;

@Component({
  selector: 'app-floating-input',
  standalone: true,
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => FloatingInputComponent), multi: true }],
  templateUrl: './floating-input.component.html',
  styleUrl: './floating-input.component.scss'
})
export class FloatingInputComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() type = 'text';
  @Input() inputId = `floating-input-${Math.random().toString(36).slice(2)}`;
  @Input() readonly = false;
  @Input() disabled = false;
  @Input() min: string | number | null = null;
  @Input() max: string | number | null = null;
  @Input() step: string | number | null = null;
  @Input() maxlength: string | number | null = null;
  @Output() valueChange = new EventEmitter<ControlValue>();

  value: ControlValue = '';
  onChange: (value: ControlValue) => void = () => undefined;
  onTouched: () => void = () => undefined;

  get displayValue(): string | number { return this.value ?? ''; }
  get hasValue(): boolean { return this.value !== null && this.value !== undefined && String(this.value).length > 0; }

  writeValue(value: ControlValue): void { this.value = value ?? ''; }
  registerOnChange(fn: (value: ControlValue) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
  setDisabledState(disabled: boolean): void { this.disabled = disabled; }
  handleInput(event: Event): void {
    const raw = (event.target as HTMLInputElement).value;
    const value = this.type === 'number' ? (raw === '' ? null : Number(raw)) : raw;
    this.value = value;
    this.onChange(value);
    this.valueChange.emit(value);
  }
}


