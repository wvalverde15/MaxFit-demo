import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

type ControlValue = string | number | null;

@Component({
  selector: 'app-floating-input',
  standalone: true,
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => FloatingInputComponent), multi: true }],
  template: `<div class="floating-control" [class.has-value]="hasValue"><input [id]="inputId" [type]="type" [value]="displayValue" [placeholder]="placeholder" [attr.min]="min" [attr.max]="max" [attr.step]="step" [attr.maxlength]="maxlength" [readonly]="readonly" [disabled]="disabled" [attr.aria-label]="label" (input)="handleInput($event)" (blur)="onTouched()" /><label [for]="inputId">{{ label }}</label></div>`
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

@Component({
  selector: 'app-floating-select',
  standalone: true,
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => FloatingSelectComponent), multi: true }],
  template: `<div class="floating-control" [class.has-value]="hasValue"><select [id]="inputId" [value]="value ?? ''" [disabled]="disabled" [attr.aria-label]="label" (change)="handleChange($event)" (blur)="onTouched()"><ng-content></ng-content></select><label [for]="inputId">{{ label }}</label></div>`
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

@Component({
  selector: 'app-floating-textarea',
  standalone: true,
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => FloatingTextareaComponent), multi: true }],
  template: `<div class="floating-control floating-textarea" [class.has-value]="hasValue"><textarea [id]="inputId" [value]="value ?? ''" [placeholder]="placeholder" [rows]="rows" [readonly]="readonly" [disabled]="disabled" [attr.aria-label]="label" (input)="handleInput($event)" (blur)="onTouched()"></textarea><label [for]="inputId">{{ label }}</label></div>`
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
