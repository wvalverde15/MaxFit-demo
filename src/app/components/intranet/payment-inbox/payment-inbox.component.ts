import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-payment-inbox', standalone: true, imports: [CommonModule],
  templateUrl: './payment-inbox.component.html',
  styleUrl: './payment-inbox.component.scss'
})
export class PaymentInboxComponent {
  @Input() proofs: any[] = [];
  @Output() action = new EventEmitter<string>();
  expandedId: number | null = null;
  get pendingCount() { return this.proofs.filter(item => item.status === 'Pendiente').length; }
  get validatedCount() { return this.proofs.filter(item => item.status === 'Validado').length; }
  get rejectedCount() { return this.proofs.filter(item => item.status === 'Rechazado').length; }
  initials(name: string) { return name.split(' ').map(part => part[0]).slice(0, 2).join(''); }
}

