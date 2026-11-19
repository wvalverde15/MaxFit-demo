import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

type ControlValue = string | number | null;

@Component({
  selector: 'app-floating-textarea',
  standalone: true,
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => FloatingTextareaComponent), multi: true }],
  templateUrl: './floating-textarea.component.html',
  styleUrl: './floating-textarea.component.scss'
})
export class FloatingTextareaComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() inputId = `floating-textarea-${Math.random().toString(36).slice(2)}`;
  @Input() rows = 3;
  @Input() readonly = false;
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
  handleInput(event: Event): void {
    const value = (event.target as HTMLTextAreaElement).value;
    this.value = value;
    this.onChange(value);
    this.valueChange.emit(value);
  }
}

