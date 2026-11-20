import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.scss'
})
export class TestimonialsComponent {
  protected menuOpen = false;
  @Output() readonly login = new EventEmitter<void>();
  @Output() readonly store = new EventEmitter<void>();
  @Output() readonly contact = new EventEmitter<void>();
  protected activeIndex = 0;
  protected readonly testimonials = [
    { name: 'Ana Torres', role: 'Miembro Max Fit', image: 'testimonial-ana.png', alt: 'Ana, miembro de Max Fit', quote: 'Volví a sentirme fuerte y constante. Ahora entrenar forma parte de mi semana.' },
    { name: 'Carlos Medina', role: 'Miembro Max Fit', image: 'testimonial-carlos.png', alt: 'Carlos, miembro de Max Fit', quote: 'Encontré un lugar donde puedo avanzar a mi ritmo y no rendirme.' },
    { name: 'María Salazar', role: 'Miembro Max Fit', image: 'testimonial-maria.png', alt: 'María, miembro de Max Fit', quote: 'La energía del gimnasio me motiva a seguir cuidándome todos los días.' },
    { name: 'Lucía Ramos', role: 'Miembro Max Fit', image: 'testimonial-lucia.png', alt: 'Lucía, miembro de Max Fit', quote: 'Con el baile recuperé la alegría de moverme y disfrutar el entrenamiento.' }
  ];
  protected previous(): void { this.activeIndex = (this.activeIndex - 1 + this.testimonials.length) % this.testimonials.length; }
  protected next(): void { this.activeIndex = (this.activeIndex + 1) % this.testimonials.length; }
  protected show(index: number): void { this.activeIndex = index; }
  protected closeMenu(): void { this.menuOpen = false; }
}
