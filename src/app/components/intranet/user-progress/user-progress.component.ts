import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-user-progress',
  standalone: true,
  templateUrl: './user-progress.component.html',
  styleUrl: './user-progress.component.scss'
})
export class UserProgressComponent {
  @Input() measurements: any[] = [];
  @Input() sessionRecords: any[] = [];
  @Input() workouts: any[] = [];
  @Output() action = new EventEmitter<string>();
  days = Array.from({ length: 31 }, (_, index) => index + 1);
  get latest() { return this.measurements[0] ?? { date: 'Sin registros', weight: 0, waist: 0, chest: 0, arm: 0, leg: 0 }; }
  get chartMeasurements() { return [...this.measurements].reverse().slice(-5); }
  get remaining() { return Math.max(0, this.latest.weight - 70).toFixed(1); }
  get goalProgress() { return Math.min(100, Math.max(0, Math.round(((75.3 - this.latest.weight) / 5.3) * 100))); }
  get consistency() { return Math.min(100, Math.round((this.sessionRecords.length / 15) * 100)); }
  get bestLoads() { return this.workouts.slice(0, 3); }
  barHeight(weight: number) { return Math.max(20, Math.min(90, 100 - ((weight - 68) * 7))); }
  loadHeight(load: number) { const max = Math.max(...this.sessionRecords.map(item => item.totalLoad || 1), 1); return Math.max(18, Math.round((load / max) * 88)); }
  measurePercent(value: number, max: number) { return Math.min(100, Math.round((value / max) * 100)); }
  variation(key: string) { const previous = this.measurements[1]?.[key]; const current = this.latest[key]; if (!previous || !current) return '—'; const diff = Number(current) - Number(previous); return `${diff > 0 ? '+' : ''}${diff.toFixed(1)} cm`; }
  attended(day: number) { return this.sessionRecords.some(item => Number(String(item.date).match(/\d+/)?.[0]) === day); }
}

