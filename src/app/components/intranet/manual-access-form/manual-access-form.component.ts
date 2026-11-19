import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FloatingInputComponent } from '../../shared/floating-input/floating-input.component';
import { FloatingSelectComponent } from '../../shared/floating-select/floating-select.component';

@Component({
  selector: 'app-manual-access-form',
  standalone: true,
  imports: [FormsModule, FloatingInputComponent, FloatingSelectComponent],
  templateUrl: './manual-access-form.component.html',
  styleUrl: './manual-access-form.component.scss'
})
export class ManualAccessFormComponent {
  @Output() save = new EventEmitter<{ clientCode: string; movement: string; note: string }>();
  @Output() cancel = new EventEmitter<void>();
  clientCode = 'A001'; movement = 'Entrada'; note = '';
}

