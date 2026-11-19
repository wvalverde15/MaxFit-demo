import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FloatingInputComponent } from '../../shared/floating-input/floating-input.component';
import { FloatingSelectComponent } from '../../shared/floating-select/floating-select.component';

@Component({ selector: 'app-machine-form', standalone: true, imports: [FormsModule, FloatingInputComponent, FloatingSelectComponent], templateUrl: './machine-form.component.html',
  styleUrl: './machine-form.component.scss' })
export class MachineFormComponent { @Output() save = new EventEmitter<{ name: string; area: string; image: string; video: string }>(); @Output() cancel = new EventEmitter<void>(); name = ''; area = 'Piernas'; image = ''; video = ''; }

