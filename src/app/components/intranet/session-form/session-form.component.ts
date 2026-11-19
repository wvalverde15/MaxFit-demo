import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FloatingInputComponent } from '../../shared/floating-input/floating-input.component';
import { FloatingTextareaComponent } from '../../shared/floating-textarea/floating-textarea.component';

@Component({ selector: 'app-session-form', standalone: true, imports: [FormsModule, FloatingInputComponent, FloatingTextareaComponent], templateUrl: './session-form.component.html',
  styleUrl: './session-form.component.scss' })
export class SessionFormComponent { @Input() defaultRoutine = 'Fuerza e hipertrofia'; @Output() save = new EventEmitter<{ duration: number; routine: string; completed: number; sets: number; repetitions: number; totalLoad: number; restSeconds: number; effort: number; notes: string }>(); @Output() cancel = new EventEmitter<void>(); duration = 50; routine = 'Fuerza e hipertrofia'; completed = 5; sets = 18; repetitions = 54; totalLoad = 480; restSeconds = 90; effort = 7; notes = ''; get valid() { return this.duration > 0 && this.routine.trim().length > 0 && this.completed > 0 && this.sets > 0 && this.repetitions > 0 && this.effort >= 1 && this.effort <= 10; } }

