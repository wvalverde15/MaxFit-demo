import { Component, EventEmitter, Output, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-location',
  standalone: true,
  templateUrl: './location.component.html',
  styleUrl: './location.component.scss'
})
export class LocationComponent {
  private readonly sanitizer = inject(DomSanitizer);
  @Output() readonly back = new EventEmitter<void>();
  @Output() readonly login = new EventEmitter<void>();
  protected readonly mapsUrl = 'https://www.google.com/maps/search/?api=1&query=Faustino+Sarmiento+508+Urb+Las+Quintanas+Trujillo';
  protected readonly mapEmbedUrl: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.google.com/maps?q=Faustino+Sarmiento+508+Urb+Las+Quintanas+Trujillo&output=embed');
}

