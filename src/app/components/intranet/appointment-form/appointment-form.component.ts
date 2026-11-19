import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FloatingInputComponent } from '../../shared/floating-input/floating-input.component';
import { FloatingSelectComponent } from '../../shared/floating-select/floating-select.component';
import { FloatingTextareaComponent } from '../../shared/floating-textarea/floating-textarea.component';

@Component({
  selector: 'app-appointment-form',
  standalone: true,
  imports: [FormsModule, FloatingInputComponent, FloatingSelectComponent, FloatingTextareaComponent],
  templateUrl: './appointment-form.component.html',
  styleUrl: './appointment-form.component.scss'
})
export class AppointmentFormComponent {
  @Output() save = new EventEmitter<{ person: string; type: string; advisor: string; date: string; time: string; notes: string }>();
  @Output() cancel = new EventEmitter<void>();
  person = ''; type = 'Cita comercial'; advisor = 'María Torres'; date = '2026-10-24'; time = '10:00'; notes = '';
}

