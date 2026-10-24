import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface RoutinePlanFormData {
  name: string;
  focus: string;
  duration: string;
  exercises: string;
}

@Component({
  selector: 'app-routine-plan-form', standalone: true, imports: [FormsModule],
  template: `<section class="inline-form-shell"><div class="inline-form-head"><div><p class="eyebrow orange">NUEVO PLAN DE RUTINA</p><h2>Crear rutina</h2><p class="muted">Una rutina agrupa varios ejercicios para asignarlos como plan.</p></div><button class="close-button" type="button" (click)="cancel.emit()">×</button></div><div class="inline-form-grid"><label>Nombre de la rutina<input [(ngModel)]="name" placeholder="Ej. Fuerza e hipertrofia" /></label><label>Objetivo<select [(ngModel)]="focus"><option>Fuerza e hipertrofia</option><option>Pérdida de grasa</option><option>Tren superior</option><option>Tren inferior</option><option>Movilidad y core</option></select></label><label>Duración<select [(ngModel)]="duration"><option>4 semanas</option><option>6 semanas</option><option>8 semanas</option><option>12 semanas</option></select></label><label class="form-span-2">Ejercicios incluidos<textarea [(ngModel)]="exercises" rows="4" placeholder="Prensa inclinada, Press de pecho, Jalón al pecho"></textarea><small class="form-help">Separa los ejercicios con comas. Luego podrás asignar cargas desde el catálogo.</small></label></div><div class="inline-form-actions"><button class="secondary-button" type="button" (click)="cancel.emit()">Cancelar</button><button class="primary-button" type="button" (click)="save.emit({name, focus, duration, exercises})">Guardar plan de rutina</button></div></section>`
})
export class RoutinePlanFormComponent {
  @Output() save = new EventEmitter<RoutinePlanFormData>(); @Output() cancel = new EventEmitter<void>();
  name = ''; focus = 'Fuerza e hipertrofia'; duration = '4 semanas'; exercises = 'Prensa inclinada, Press de pecho, Jalón al pecho';
}
