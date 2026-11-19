import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface UserPaymentSubmission { plan: string; amount: number; method: 'Yape' | 'Plin'; phone: string; fileName: string; }

@Component({
  selector: 'app-user-payment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-payment.component.html',
  styleUrl: './user-payment.component.scss'
})
export class UserPaymentComponent {
  @Input() view = 'pagos'; @Input() plans: any[] = []; @Input() paymentRequest: any = null;
  @Output() submitted = new EventEmitter<UserPaymentSubmission>(); @Output() copyNumber = new EventEmitter<string>(); @Output() openApp = new EventEmitter<'Yape' | 'Plin'>();
  selectedPlan = 'Mensual'; selectedAmount = 120; method: 'Yape' | 'Plin' = 'Yape'; paymentPhone = '979 431 110'; fileName = ''; showAllHistory = false; showPaymentFlow = false; currentStep = 1;
  paymentHistory = [{ date: '05 Sep 2026', concept: 'Plan Mensual', method: 'Efectivo', amount: 120, status: 'Confirmado' }, { date: '05 Ago 2026', concept: 'Plan Mensual', method: 'Yape', amount: 120, status: 'Confirmado' }, { date: '05 Jul 2026', concept: 'Plan Mensual', method: 'Plin', amount: 120, status: 'Confirmado' }, { date: '05 Jun 2026', concept: 'Plan Mensual', method: 'Efectivo', amount: 120, status: 'Confirmado' }];
  get planOptions() { const source = this.plans?.length ? this.plans : [{ name: 'Mensual', duration: '30 días', sessions: 'Ilimitadas', price: 'S/ 120' }]; return source.slice(0, 4).map(plan => ({ name: plan.name, duration: plan.duration, sessions: plan.sessions, amount: Number(String(plan.price).replace(/[^0-9.]/g, '')) || 120 })); }
  get visibleHistory() { return this.showAllHistory ? this.paymentHistory : this.paymentHistory.slice(0, 3); }
  selectPlan(name: string, amount: number) { this.selectedPlan = name; this.selectedAmount = amount; }
  nextStep() { if (this.currentStep < 3) this.currentStep += 1; }
  previousStep() { if (this.currentStep > 1) this.currentStep -= 1; }
  handleFile(event: Event) { const file = (event.target as HTMLInputElement).files?.[0]; if (file) this.fileName = file.name; }
  submitProof() { if (this.fileName) { this.submitted.emit({ plan: this.selectedPlan, amount: this.selectedAmount, method: this.method, phone: this.paymentPhone, fileName: this.fileName }); this.showPaymentFlow = false; this.currentStep = 1; } }
}

