import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-load-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './load-form.component.html',
  styleUrl: './load-form.component.scss'
})
export class LoadFormComponent {
  @Input() exercise = '';
  @Input() machine = '';
  @Input() currentLoad = 0;
  @Output() saved = new EventEmitter<{ exercise: string; load: number; notes: string }>();
  @Output() closed = new EventEmitter<void>();
  load = 0;
  notes = '';
  ngOnInit() { this.load = this.currentLoad; }
  save() { if (this.load > 0) this.saved.emit({ exercise: this.exercise, load: this.load, notes: this.notes }); }
}

