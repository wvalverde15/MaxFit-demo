import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface ClientFormData {
  id?: number;
  name: string;
  phone: string;
  whatsapp: string;
  facebook: string;
  instagram: string;
  tiktok: string;
  membership: string;
}

@Component({
  selector: 'app-client-form', standalone: true, imports: [FormsModule],
  template: `
    <section class="inline-form-shell">
      <div class="inline-form-head"><div><p class="eyebrow orange">{{ readOnly ? 'FICHA DEL CLIENTE' : 'NUEVO CLIENTE' }}</p><h2>{{ readOnly ? 'Datos del cliente' : 'Registrar cliente' }}</h2><p class="muted">{{ readOnly ? 'Consulta la información de contacto y membresía.' : 'Crea una ficha inicial para comenzar su seguimiento.' }}</p></div><button class="close-button" type="button" (click)="cancel.emit()">×</button></div>
      <div class="inline-form-grid client-form-grid">
        <label>Nombre completo<input [(ngModel)]="name" [readonly]="readOnly" placeholder="Nombre del cliente" /></label>
        <label>Teléfono<input [(ngModel)]="phone" [readonly]="readOnly" placeholder="999 999 999" /></label>
        <label>WhatsApp<input [(ngModel)]="whatsapp" [readonly]="readOnly" placeholder="51999 999 999" /></label>
        <label>Membresía<select [(ngModel)]="membership" [disabled]="readOnly"><option>Mensual</option><option>Trimestral</option><option>Semestral</option><option>Pase 12 sesiones</option></select></label>
        <label>Facebook<input [(ngModel)]="facebook" [readonly]="readOnly" placeholder="facebook.com/usuario" /></label>
        <label>Instagram<input [(ngModel)]="instagram" [readonly]="readOnly" placeholder="@usuario" /></label>
        <label>TikTok<input [(ngModel)]="tiktok" [readonly]="readOnly" placeholder="@usuario" /></label>
      </div>
      <div class="inline-form-actions"><button class="secondary-button" type="button" (click)="cancel.emit()">{{ readOnly ? 'Cerrar' : 'Cancelar' }}</button>@if (!readOnly) { <button class="primary-button" type="button" (click)="save.emit({id, name, phone, whatsapp, facebook, instagram, tiktok, membership})">Guardar cliente</button> }</div>
    </section>
  `
})
export class ClientFormComponent implements OnChanges {
  @Input() readOnly = false; @Input() client: Partial<ClientFormData> | null = null;
  @Output() save = new EventEmitter<ClientFormData>(); @Output() cancel = new EventEmitter<void>();
  id?: number; name = ''; phone = ''; whatsapp = ''; facebook = ''; instagram = ''; tiktok = ''; membership = 'Mensual';
  ngOnChanges(changes: SimpleChanges): void { if (changes['client'] || changes['readOnly']) { const item = this.client ?? {}; this.id = item.id; this.name = item.name ?? ''; this.phone = item.phone ?? ''; this.whatsapp = item.whatsapp ?? ''; this.facebook = item.facebook ?? ''; this.instagram = item.instagram ?? ''; this.tiktok = item.tiktok ?? ''; this.membership = item.membership ?? 'Mensual'; } }
}
