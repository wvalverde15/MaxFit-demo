import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-shell',
  standalone: true,
  templateUrl: './app-shell.component.html',
  styleUrl: './app-shell.component.scss'
})
export class AppShellComponent {
  @Input() navItems: any[] = [];
  @Input() activeView = '';
  @Input() role = '';
  @Input() roleLabel = '';
  @Input() name = '';
  @Input() menuOpen = false;
  @Output() navigate = new EventEmitter<string>();
  @Output() logout = new EventEmitter<void>();
  @Output() menu = new EventEmitter<void>();
  initials(name: string) { return name.split(' ').map(part => part[0]).slice(0, 2).join(''); }
}

