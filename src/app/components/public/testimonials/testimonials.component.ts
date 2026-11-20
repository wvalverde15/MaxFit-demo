import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.scss'
})
export class TestimonialsComponent {
  @Output() readonly login = new EventEmitter<void>();
  @Output() readonly store = new EventEmitter<void>();
  @Output() readonly contact = new EventEmitter<void>();
}
