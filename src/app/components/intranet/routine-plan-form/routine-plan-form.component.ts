import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FloatingInputComponent } from '../../shared/floating-input/floating-input.component';
import { FloatingSelectComponent } from '../../shared/floating-select/floating-select.component';
import { FloatingTextareaComponent } from '../../shared/floating-textarea/floating-textarea.component';

export interface RoutinePlanFormData {
  name: string;
  focus: string;
  duration: string;
  exercises: string;
}

@Component({
  selector: 'app-routine-plan-form', standalone: true, imports: [FormsModule, FloatingInputComponent, FloatingSelectComponent, FloatingTextareaComponent],
  templateUrl: './routine-plan-form.component.html',
  styleUrl: './routine-plan-form.component.scss'
})
export class RoutinePlanFormComponent {
  @Output() save = new EventEmitter<RoutinePlanFormData>(); @Output() cancel = new EventEmitter<void>();
  name = ''; focus = 'Fuerza e hipertrofia'; duration = '4 semanas'; exercises = 'Prensa inclinada, Press de pecho, Jalón al pecho';
}

