import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FloatingInputComponent } from '../../shared/floating-input/floating-input.component';

@Component({ selector: 'app-measurement-form', standalone: true, imports: [FormsModule, FloatingInputComponent], templateUrl: './measurement-form.component.html',
  styleUrl: './measurement-form.component.scss' })
export class MeasurementFormComponent { @Output() save = new EventEmitter<{ date: string; weight: number; waist: number; chest: number; arm: number; leg: number }>(); @Output() cancel = new EventEmitter<void>(); date = '05 Sep 2024'; weight = 72.5; waist = 82; chest = 98; arm = 36; leg = 57; }

