import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FloatingInputComponent } from '../../shared/floating-input/floating-input.component';

@Component({ selector: 'app-routine-form', standalone: true, imports: [FormsModule, FloatingInputComponent], templateUrl: './routine-form.component.html',
  styleUrl: './routine-form.component.scss' })
export class RoutineFormComponent { @Output() save = new EventEmitter<{ exercise: string; machine: string; sets: string; load: string }>(); @Output() cancel = new EventEmitter<void>(); exercise = ''; machine = ''; sets = '3 × 12'; load = '20 kg'; }

