import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FloatingInputComponent, FloatingSelectComponent } from './floating-controls.component';

@Component({
  selector: 'app-manual-access-form',
  standalone: true,
  imports: [FormsModule, FloatingInputComponent, FloatingSelectComponent],
  template: `<section class="inline-form-shell"><div class="inline-form-head"><div><p class="eyebrow orange">ASISTENCIA MANUAL</p><h2>Registrar ingreso</h2></div><button class="close-button" type="button" (click)="cancel.emit()">×</button></div><div class="access-code-entry"><app-floating-input label="Código de cliente" [(ngModel)]="clientCode" [maxlength]="4" placeholder="A001"></app-floating-input><small>Ingresa el código de cuatro caracteres del cliente.</small></div><div class="inline-form-grid"><app-floating-select label="Movimiento" [(ngModel)]="movement"><option>Entrada</option><option>Salida</option></app-floating-select><app-floating-input label="Observación" [(ngModel)]="note" placeholder="Opcional"></app-floating-input></div><div class="inline-form-actions"><button class="secondary-button" type="button" (click)="cancel.emit()">Cancelar</button><button class="primary-button" type="button" (click)="save.emit({clientCode, movement, note})">Registrar asistencia</button></div></section>`
})
export class ManualAccessFormComponent {
  @Output() save = new EventEmitter<{ clientCode: string; movement: string; note: string }>();
  @Output() cancel = new EventEmitter<void>();
  clientCode = 'A001'; movement = 'Entrada'; note = '';
}
