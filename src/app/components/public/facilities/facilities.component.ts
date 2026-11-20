import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-facilities',
  standalone: true,
  templateUrl: './facilities.component.html',
  styleUrl: './facilities.component.scss'
})
export class FacilitiesComponent {
  protected menuOpen = false;
  @Output() readonly login = new EventEmitter<void>();
  @Output() readonly store = new EventEmitter<void>();
  protected closeMenu(): void { this.menuOpen = false; }
}
