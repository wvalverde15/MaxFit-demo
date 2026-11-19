import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-user-training',
  standalone: true,
  templateUrl: './user-training.component.html',
  styleUrl: './user-training.component.scss'
})
export class UserTrainingComponent {
  @Input() workouts: any[] = [];
  @Output() action = new EventEmitter<string>();
}

