import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-load-form',
  standalone: true,
  imports: [FormsModule],
  template: `
    <section class="form-page"><div class="form-page-head"><div><span class="eyebrow orange">REGISTRO DE ENTRENAMIENTO</span><h2>Registrar carga</h2><p class="muted">Guarda el peso utilizado para medir tu avance en este ejercicio.</p></div><button class="close-button" type="button" (click)="closed.emit()">×</button></div>
      <div class="panel form-card load-form-card"><div class="load-form-exercise"><span class="exercise-icon">✦</span><div><small>Ejercicio seleccionado</small><strong>{{ exercise }}</strong><span>{{ machine }}</span></div></div><label>Carga utilizada (kg)<input type="number" min="0" step="0.5" [(ngModel)]="load" /></label><label>Observación (opcional)<textarea rows="3" [(ngModel)]="notes" placeholder="Ejemplo: completé todas las repeticiones con buena técnica"></textarea></label><div class="form-actions"><button class="secondary-button" type="button" (click)="closed.emit()">Cancelar</button><button class="primary-button" type="button" [disabled]="load <= 0" (click)="save()">Guardar carga</button></div></div>
    </section>
  `
})
export class LoadFormComponent {
  @Input() exercise = '';
  @Input() machine = '';
  @Input() currentLoad = 0;
  @Output() saved = new EventEmitter<{ exercise: string; load: number; notes: string }>();
  @Output() closed = new EventEmitter<void>();
  load = 0;
  notes = '';
  ngOnInit() { this.load = this.currentLoad; }
  save() { if (this.load > 0) this.saved.emit({ exercise: this.exercise, load: this.load, notes: this.notes }); }
}
