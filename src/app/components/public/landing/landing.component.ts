import { AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-landing',
  standalone: true,
  templateUrl: './landing.component.html',
  // The landing stylesheet is loaded globally so it can share the application's design tokens
  // without adding another component style budget entry.
})
export class LandingComponent implements AfterViewInit, OnDestroy {
  @ViewChild('heroVideo') private readonly heroVideo?: ElementRef<HTMLVideoElement>;
  @Output() readonly login = new EventEmitter<void>();
  @Output() readonly store = new EventEmitter<void>();
  @Output() readonly contact = new EventEmitter<void>();
  @Output() readonly location = new EventEmitter<void>();
  @Output() readonly facilities = new EventEmitter<void>();
  @Output() readonly testimonials = new EventEmitter<void>();
  protected menuOpen = false;
  protected activeSection = 'inicio';
  private sectionObserver?: IntersectionObserver;
  ngAfterViewInit(): void {
    const video = this.heroVideo?.nativeElement;
    if (!video) return;
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.play().catch(() => undefined);
    if (typeof IntersectionObserver === 'undefined') return;
    const sections = ['inicio', 'servicios', 'horarios']
      .map(id => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));
    this.sectionObserver = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) this.activeSection = visible.target.id;
    }, { rootMargin: '-22% 0px -58% 0px', threshold: [0.1, 0.35, 0.6] });
    sections.forEach(section => this.sectionObserver?.observe(section));
  }
  ngOnDestroy(): void { this.sectionObserver?.disconnect(); }
  protected closeMenu(): void { this.menuOpen = false; }
}

