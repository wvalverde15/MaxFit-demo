import { AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-landing',
  standalone: true,
  templateUrl: './landing.component.html',
  // The landing stylesheet is loaded globally so it can share the application's design tokens
  // without adding another component style budget entry.
})
export class LandingComponent implements AfterViewInit {
  @ViewChild('heroVideo') private readonly heroVideo?: ElementRef<HTMLVideoElement>;
  @Output() readonly login = new EventEmitter<void>();
  @Output() readonly store = new EventEmitter<void>();
  @Output() readonly contact = new EventEmitter<void>();
  @Output() readonly location = new EventEmitter<void>();
  protected menuOpen = false;
  protected activeTestimonial = 0;
  ngAfterViewInit(): void {
    const video = this.heroVideo?.nativeElement;
    if (!video) return;
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.play().catch(() => undefined);
  }
  protected closeMenu(): void { this.menuOpen = false; }
  protected previousTestimonial(): void { this.activeTestimonial = (this.activeTestimonial + 3) % 4; }
  protected nextTestimonial(): void { this.activeTestimonial = (this.activeTestimonial + 1) % 4; }
}

