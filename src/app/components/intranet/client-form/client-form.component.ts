import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FloatingInputComponent } from '../../shared/floating-input/floating-input.component';
import { FloatingSelectComponent } from '../../shared/floating-select/floating-select.component';

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
  selector: 'app-client-form', standalone: true, imports: [FormsModule, FloatingInputComponent, FloatingSelectComponent],
  templateUrl: './client-form.component.html',
  styleUrl: './client-form.component.scss'
})
export class ClientFormComponent implements OnChanges {
  @Input() readOnly = false; @Input() client: Partial<ClientFormData> | null = null;
  @Output() save = new EventEmitter<ClientFormData>(); @Output() cancel = new EventEmitter<void>();
  id?: number; name = ''; phone = ''; whatsapp = ''; facebook = ''; instagram = ''; tiktok = ''; membership = 'Mensual';
  ngOnChanges(changes: SimpleChanges): void { if (changes['client'] || changes['readOnly']) { const item = this.client ?? {}; this.id = item.id; this.name = item.name ?? ''; this.phone = item.phone ?? ''; this.whatsapp = item.whatsapp ?? ''; this.facebook = item.facebook ?? ''; this.instagram = item.instagram ?? ''; this.tiktok = item.tiktok ?? ''; this.membership = item.membership ?? 'Mensual'; } }
}

