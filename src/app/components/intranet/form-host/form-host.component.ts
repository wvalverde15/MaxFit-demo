import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ClientFormComponent } from '../client-form/client-form.component';
import { MachineFormComponent } from '../machine-form/machine-form.component';
import { MeasurementFormComponent } from '../measurement-form/measurement-form.component';
import { PaymentFormComponent } from '../payment-form/payment-form.component';
import { PlanFormComponent } from '../plan-form/plan-form.component';
import { RoutineFormComponent } from '../routine-form/routine-form.component';
import { SessionFormComponent } from '../session-form/session-form.component';
import { RoutinePlanFormComponent } from '../routine-plan-form/routine-plan-form.component';
import { ProspectFormComponent } from '../prospect-form/prospect-form.component';
import { AppointmentFormComponent } from '../appointment-form/appointment-form.component';
import { SaleCartFormComponent } from '../sale-cart-form/sale-cart-form.component';
import { ManualAccessFormComponent } from '../manual-access-form/manual-access-form.component';

export interface FormSubmission { kind: string; data: any; }

@Component({ selector: 'app-form-host', standalone: true, imports: [ClientFormComponent, MachineFormComponent, MeasurementFormComponent, PaymentFormComponent, PlanFormComponent, RoutineFormComponent, RoutinePlanFormComponent, SessionFormComponent, ProspectFormComponent, AppointmentFormComponent, SaleCartFormComponent, ManualAccessFormComponent], templateUrl: './form-host.component.html',
  styleUrl: './form-host.component.scss' })
export class FormHostComponent { @Input() activeView = ''; @Input() paymentOpen = false; @Input() measurementOpen = false; @Input() clientOpen = false; @Input() clientReadOnly = false; @Input() selectedClient: any = null; @Input() planOpen = false; @Input() routinePlanOpen = false; @Input() routineOpen = false; @Input() machineOpen = false; @Input() sessionOpen = false; @Input() prospectOpen = false; @Input() appointmentOpen = false; @Input() saleOpen = false; @Input() manualAccessOpen = false; @Output() saved = new EventEmitter<FormSubmission>(); @Output() closed = new EventEmitter<string>(); }

