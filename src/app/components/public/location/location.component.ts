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
  protected menuOpen = false;
  @Output() readonly back = new EventEmitter<void>();
  @Output() readonly login = new EventEmitter<void>();
  @Output() readonly store = new EventEmitter<void>();
  @Output() readonly contact = new EventEmitter<void>();
  protected readonly mapsUrl = 'https://www.google.com/maps/search/?api=1&query=Faustino+Sarmiento+508+Urb+Las+Quintanas+Trujillo';
  protected closeMenu(): void { this.menuOpen = false; }
  protected readonly mapEmbedUrl: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.google.com/maps?q=Faustino+Sarmiento+508+Urb+Las+Quintanas+Trujillo&output=embed');
}

