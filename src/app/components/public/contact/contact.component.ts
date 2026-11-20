import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FloatingInputComponent } from '../../shared/floating-input/floating-input.component';
import { FloatingSelectComponent } from '../../shared/floating-select/floating-select.component';

export interface ContactInquiry { name: string; interest: string; whatsapp: string; message: string; }

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, FloatingInputComponent, FloatingSelectComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  protected menuOpen = false;
  @Output() readonly back = new EventEmitter<void>();
  @Output() readonly login = new EventEmitter<void>();
  @Output() readonly store = new EventEmitter<void>();
  @Output() readonly location = new EventEmitter<void>();
  @Output() readonly submitted = new EventEmitter<ContactInquiry>();
  protected form: ContactInquiry = { name: '', interest: '', whatsapp: '', message: '' };
  protected countryCode = '+51';
  protected phone = '';
  protected error = '';
  protected step = 1;
  protected readonly interestOptions = ['Musculación', 'Baile', 'Nutrición', 'Bajar de Peso', 'Membresías', 'Productos de la tienda'];
  protected selectedInterests: string[] = [];
  protected closeMenu(): void { this.menuOpen = false; }
  protected get stepTitle(): string { return this.step === 1 ? '¿Cómo te llamas?' : this.step === 2 ? '¿Cuál es tu WhatsApp?' : '¿Qué cambio quieres empezar?'; }
  protected get stepDescription(): string { return this.step === 1 ? 'Queremos conocerte.' : this.step === 2 ? 'Te enviaremos la información por este medio.' : 'Elige el servicio que más se adapta a tu objetivo.'; }
  protected nextStep(): void {
    this.error = '';
    if (this.step === 1 && !this.form.name.trim()) { this.error = 'Ingresa tu nombre para continuar.'; return; }
    if (this.step === 2 && !this.phone.trim()) { this.error = 'Ingresa tu número de WhatsApp para continuar.'; return; }
    if (this.step < 3) { this.step += 1; return; }
    if (!this.selectedInterests.length) { this.error = 'Selecciona al menos un servicio para continuar.'; return; }
    this.form.interest = this.selectedInterests.join(', ');
    this.form.whatsapp = `${this.countryCode} ${this.phone.trim()}`;
    const inquiry = { ...this.form, name: this.form.name.trim(), whatsapp: this.form.whatsapp.trim(), message: this.form.message.trim() };
    this.submitted.emit(inquiry);
    const text = `Hola Max Fit, soy ${inquiry.name}. Estoy interesado(a) en ${inquiry.interest}. Mi WhatsApp es ${inquiry.whatsapp}.${inquiry.message ? ` Mi consulta es: ${inquiry.message}` : ''}`;
    window.open(`https://wa.me/51979431110?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  }
  protected previousStep(): void { this.error = ''; this.step = Math.max(1, this.step - 1); }
  protected isInterestSelected(option: string): boolean { return this.selectedInterests.includes(option); }
  protected toggleInterest(option: string): void {
    this.error = '';
    this.selectedInterests = this.isInterestSelected(option)
      ? this.selectedInterests.filter(item => item !== option)
      : [...this.selectedInterests, option];
    this.form.interest = this.selectedInterests.join(', ');
  }
}

