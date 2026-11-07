import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FloatingInputComponent, FloatingSelectComponent } from './floating-controls.component';

@Component({
  selector: 'app-sale-cart-form',
  standalone: true,
  imports: [FormsModule, FloatingInputComponent, FloatingSelectComponent],
  template: `<section class="inline-form-shell"><div class="inline-form-head"><div><p class="eyebrow orange">NUEVA VENTA</p><h2>Carrito de compra</h2></div><button class="close-button" type="button" (click)="cancel.emit()">×</button></div><div class="inline-form-grid"><app-floating-select label="Cliente" [(ngModel)]="client"><option>Jorge Medina</option><option>Valeria Sánchez</option><option>Luis Villanueva</option><option>Venta mostrador</option></app-floating-select><app-floating-select label="Producto o servicio" [(ngModel)]="item"><option>Plan Mensual · S/ 120</option><option>Rutina diaria · S/ 15</option><option>Plan Trimestral · S/ 300</option><option>Evaluación nutricional · S/ 80</option></app-floating-select><app-floating-input label="Cantidad" type="number" min="1" [(ngModel)]="quantity"></app-floating-input><app-floating-select label="Medio de pago" [(ngModel)]="method"><option>Efectivo</option><option>Yape</option><option>Plin</option><option>Tarjeta</option></app-floating-select></div><div class="cart-summary"><span>Resumen de compra</span><strong>{{ item.split(' · ')[0] }} × {{ quantity }}</strong><b>S/ {{ total }}</b></div><div class="inline-form-actions"><button class="secondary-button" type="button" (click)="cancel.emit()">Cancelar</button><button class="primary-button" type="button" (click)="save.emit({client, item, quantity, method, total})">Confirmar venta · S/ {{ total }}</button></div></section>`
})
export class SaleCartFormComponent {
  @Output() save = new EventEmitter<{ client: string; item: string; quantity: number; method: string; total: number }>();
  @Output() cancel = new EventEmitter<void>();
  client = 'Jorge Medina'; item = 'Plan Mensual · S/ 120'; quantity = 1; method = 'Efectivo';
  get total(): number { const price = Number(this.item.match(/S\/ (\d+)/)?.[1] ?? 0); return price * this.quantity; }
}
