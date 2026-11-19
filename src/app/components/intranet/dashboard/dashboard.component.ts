import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  @Input() role = '';
  @Input() name = '';
  @Output() navigate = new EventEmitter<string>();
  @Output() action = new EventEmitter<string>();
}

