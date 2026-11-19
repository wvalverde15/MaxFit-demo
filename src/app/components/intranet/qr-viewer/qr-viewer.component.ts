import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-qr-viewer',
  standalone: true,
  templateUrl: './qr-viewer.component.html',
  styleUrl: './qr-viewer.component.scss'
})
export class QrViewerComponent {
  @Input() name = '';
  @Input() clientCode = 'A001';
  @Output() closed = new EventEmitter<void>();
  initials(name: string) { return name.split(' ').map(part => part[0]).slice(0, 2).join(''); }
}

