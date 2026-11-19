import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-detail-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail-page.component.html',
  styleUrl: './detail-page.component.scss'
})
export class DetailPageComponent {
  @Input() kind = '';
  @Input() data: any = {};
  @Output() closed = new EventEmitter<void>();
  get title() { return this.kind === 'exercise' ? 'Detalle del ejercicio' : this.kind === 'routine' ? 'Detalle de la rutina' : this.kind === 'session' ? 'Detalle de la sesión' : this.kind === 'prospect' ? 'Detalle del prospecto' : this.kind === 'sale' ? 'Detalle de la venta' : 'Reporte general'; }
}

