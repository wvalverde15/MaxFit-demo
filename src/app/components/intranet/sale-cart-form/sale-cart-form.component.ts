import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FloatingInputComponent } from '../../shared/floating-input/floating-input.component';
import { FloatingSelectComponent } from '../../shared/floating-select/floating-select.component';

@Component({
  selector: 'app-sale-cart-form',
  standalone: true,
  imports: [FormsModule, FloatingInputComponent, FloatingSelectComponent],
  templateUrl: './sale-cart-form.component.html',
  styleUrl: './sale-cart-form.component.scss'
})
export class SaleCartFormComponent {
  @Output() save = new EventEmitter<{ client: string; item: string; quantity: number; method: string; total: number }>();
  @Output() cancel = new EventEmitter<void>();
  client = 'Jorge Medina'; item = 'Plan Mensual · S/ 120'; quantity = 1; method = 'Efectivo';
  get total(): number { const price = Number(this.item.match(/S\/ (\d+)/)?.[1] ?? 0); return price * this.quantity; }
}

