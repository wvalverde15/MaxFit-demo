import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FloatingInputComponent, FloatingSelectComponent, FloatingTextareaComponent } from './floating-controls.component';

@Component({
  selector: 'app-prospect-form',
  standalone: true,
  imports: [FormsModule, FloatingInputComponent, FloatingSelectComponent, FloatingTextareaComponent],
  template: `<section class="inline-form-shell"><div class="inline-form-head"><div><p class="eyebrow orange">NUEVO PROSPECTO</p><h2>Registrar prospecto</h2></div><button class="close-button" type="button" (click)="cancel.emit()">×</button></div><div class="inline-form-grid"><app-floating-input label="Nombre completo" [(ngModel)]="name" placeholder="Ej. Ana Torres"></app-floating-input><app-floating-input label="Teléfono / WhatsApp" [(ngModel)]="phone" placeholder="999 999 999"></app-floating-input><app-floating-select label="Plan de interés" [(ngModel)]="interest"><option>Musculación</option><option>Baile</option><option>Solo bajar de peso</option><option>Nutrición</option><option>Funcional</option></app-floating-select><app-floating-select label="Asesor responsable" [(ngModel)]="advisor"><option>María Torres</option><option>Carlos Ríos</option><option>Andrea Montalvo</option></app-floating-select><app-floating-input label="Fecha de contacto" type="date" [(ngModel)]="contactDate"></app-floating-input><app-floating-textarea class="full-field" label="Notas de seguimiento" [(ngModel)]="notes" [rows]="3" placeholder="Interés, objetivo y próximo contacto"></app-floating-textarea></div><div class="inline-form-actions"><button class="secondary-button" type="button" (click)="cancel.emit()">Cancelar</button><button class="primary-button" type="button" (click)="save.emit({name, phone, interest, advisor, contactDate, notes})">Guardar prospecto</button></div></section>`
})
export class ProspectFormComponent {
  @Output() save = new EventEmitter<{ name: string; phone: string; interest: string; advisor: string; contactDate: string; notes: string }>();
  @Output() cancel = new EventEmitter<void>();
  name = ''; phone = ''; interest = 'Musculación'; advisor = 'María Torres'; contactDate = '2026-10-24'; notes = '';
}
