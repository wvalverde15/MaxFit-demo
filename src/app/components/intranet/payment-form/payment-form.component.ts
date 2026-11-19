import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FloatingInputComponent } from '../../shared/floating-input/floating-input.component';
import { FloatingSelectComponent } from '../../shared/floating-select/floating-select.component';

@Component({ selector: 'app-payment-form', standalone: true, imports: [FormsModule, FloatingInputComponent, FloatingSelectComponent], templateUrl: './payment-form.component.html',
  styleUrl: './payment-form.component.scss' })
export class PaymentFormComponent { @Output() save = new EventEmitter<{ client: string; amount: number; method: string }>(); @Output() cancel = new EventEmitter<void>(); client = 'Jorge Medina'; amount = 120; method = 'Efectivo'; }

