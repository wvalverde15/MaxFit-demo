import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FloatingInputComponent } from '../../shared/floating-input/floating-input.component';
import { FloatingSelectComponent } from '../../shared/floating-select/floating-select.component';

@Component({ selector: 'app-plan-form', standalone: true, imports: [FormsModule, FloatingInputComponent, FloatingSelectComponent], templateUrl: './plan-form.component.html',
  styleUrl: './plan-form.component.scss' })
export class PlanFormComponent { @Output() save = new EventEmitter<{ name: string; duration: string; sessions: string; price: number }>(); @Output() cancel = new EventEmitter<void>(); name = ''; duration = '30 días'; sessions = 'Ilimitadas'; price = 120; }

