import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ClientFormComponent } from './client-form.component';
import { MachineFormComponent } from './machine-form.component';
import { MeasurementFormComponent } from './measurement-form.component';
import { PaymentFormComponent } from './payment-form.component';
import { PlanFormComponent } from './plan-form.component';
import { RoutineFormComponent } from './routine-form.component';
import { SessionFormComponent } from './session-form.component';

export interface FormSubmission { kind: string; data: any; }

@Component({ selector: 'app-form-host', standalone: true, imports: [ClientFormComponent, MachineFormComponent, MeasurementFormComponent, PaymentFormComponent, PlanFormComponent, RoutineFormComponent, SessionFormComponent], template: `@if (activeView === 'pagos' && paymentOpen) { <app-payment-form (save)="saved.emit({kind: 'payment', data: $event})" (cancel)="closed.emit('payment')"></app-payment-form> } @if (activeView === 'progreso' && measurementOpen) { <app-measurement-form (save)="saved.emit({kind: 'measurement', data: $event})" (cancel)="closed.emit('measurement')"></app-measurement-form> } @if (activeView === 'clientes' && clientOpen) { <app-client-form [readOnly]="clientReadOnly" [client]="selectedClient" (save)="saved.emit({kind: 'client', data: $event})" (cancel)="closed.emit('client')"></app-client-form> } @if (activeView === 'membresias' && planOpen) { <app-plan-form (save)="saved.emit({kind: 'plan', data: $event})" (cancel)="closed.emit('plan')"></app-plan-form> } @if (activeView === 'entrenamiento' && routineOpen) { <app-routine-form (save)="saved.emit({kind: 'routine', data: $event})" (cancel)="closed.emit('routine')"></app-routine-form> } @if (activeView === 'entrenamiento' && machineOpen) { <app-machine-form (save)="saved.emit({kind: 'machine', data: $event})" (cancel)="closed.emit('machine')"></app-machine-form> } @if (activeView === 'entrenamiento' && sessionOpen) { <app-session-form (save)="saved.emit({kind: 'session', data: $event})" (cancel)="closed.emit('session')"></app-session-form> }` })
export class FormHostComponent { @Input() activeView = ''; @Input() paymentOpen = false; @Input() measurementOpen = false; @Input() clientOpen = false; @Input() clientReadOnly = false; @Input() selectedClient: any = null; @Input() planOpen = false; @Input() routineOpen = false; @Input() machineOpen = false; @Input() sessionOpen = false; @Output() saved = new EventEmitter<FormSubmission>(); @Output() closed = new EventEmitter<string>(); }
