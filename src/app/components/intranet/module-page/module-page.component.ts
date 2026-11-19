import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-module-page',
  standalone: true,
  templateUrl: './module-page.component.html',
  styleUrl: './module-page.component.scss'
})
export class ModulePageComponent {
  @Input() view = ''; @Input() role = ''; @Input() clients: any[] = []; @Input() plans: any[] = []; @Input() classes: any[] = []; @Input() workouts: any[] = []; @Input() routines: any[] = []; @Input() machines: any[] = []; @Input() accessEvents: any[] = []; @Input() prospects: any[] = []; @Input() appointments: any[] = []; @Input() sales: any[] = [];
  @Output() action = new EventEmitter<string>();
  reports = [{ title: 'Clientes y prospectos', description: 'Altas, conversiones y seguimiento comercial.', icon: '♙', color: 'orange' }, { title: 'Pagos y ventas', description: 'Ingresos y operaciones registradas.', icon: '$', color: 'green' }, { title: 'Asistencia y accesos', description: 'Ingresos, salidas y asistencia mensual.', icon: '⌁', color: 'blue' }, { title: 'Progreso y entrenamiento', description: 'Peso, medidas, rutinas y cargas.', icon: '↗', color: 'purple' }];
  get salesTotal() { return this.sales.reduce((sum, sale) => sum + Number(sale.amount || 0), 0); }
}

