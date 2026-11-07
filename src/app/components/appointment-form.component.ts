import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FloatingInputComponent, FloatingSelectComponent, FloatingTextareaComponent } from './floating-controls.component';

@Component({
  selector: 'app-appointment-form',
  standalone: true,
  imports: [FormsModule, FloatingInputComponent, FloatingSelectComponent, FloatingTextareaComponent],
  template: `<section class="inline-form-shell"><div class="inline-form-head"><div><p class="eyebrow orange">NUEVA CITA</p><h2>Programar seguimiento</h2></div><button class="close-button" type="button" (click)="cancel.emit()">×</button></div><div class="inline-form-grid"><app-floating-input label="Persona" [(ngModel)]="person" placeholder="Prospecto o cliente"></app-floating-input><app-floating-select label="Tipo" [(ngModel)]="type"><option>Cita comercial</option><option>Seguimiento de cliente</option><option>Cita nutricional</option></app-floating-select><app-floating-select label="Responsable" [(ngModel)]="advisor"><option>María Torres</option><option>Carlos Ríos</option><option>Andrea Montalvo</option></app-floating-select><app-floating-input label="Fecha" type="date" [(ngModel)]="date"></app-floating-input><app-floating-input label="Hora" type="time" [(ngModel)]="time"></app-floating-input><app-floating-textarea class="full-field" label="Observaciones" [(ngModel)]="notes" [rows]="3" placeholder="Motivo y acuerdos de la cita"></app-floating-textarea></div><div class="inline-form-actions"><button class="secondary-button" type="button" (click)="cancel.emit()">Cancelar</button><button class="primary-button" type="button" (click)="save.emit({person, type, advisor, date, time, notes})">Guardar cita</button></div></section>`
})
export class AppointmentFormComponent {
  @Output() save = new EventEmitter<{ person: string; type: string; advisor: string; date: string; time: string; notes: string }>();
  @Output() cancel = new EventEmitter<void>();
  person = ''; type = 'Cita comercial'; advisor = 'María Torres'; date = '2026-10-24'; time = '10:00'; notes = '';
}
