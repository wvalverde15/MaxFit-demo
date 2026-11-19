import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FloatingInputComponent } from '../../shared/floating-input/floating-input.component';
import { FloatingSelectComponent } from '../../shared/floating-select/floating-select.component';
import { FloatingTextareaComponent } from '../../shared/floating-textarea/floating-textarea.component';

@Component({
  selector: 'app-prospect-form',
  standalone: true,
  imports: [FormsModule, FloatingInputComponent, FloatingSelectComponent, FloatingTextareaComponent],
  templateUrl: './prospect-form.component.html',
  styleUrl: './prospect-form.component.scss'
})
export class ProspectFormComponent {
  @Output() save = new EventEmitter<{ name: string; phone: string; interest: string; advisor: string; contactDate: string; notes: string }>();
  @Output() cancel = new EventEmitter<void>();
  name = ''; phone = ''; interest = 'Musculación'; advisor = 'María Torres'; contactDate = '2026-10-24'; notes = '';
}

