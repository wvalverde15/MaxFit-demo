import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DemoStoreService {
  read<T>(key: string): T | null {
    if (typeof localStorage === 'undefined') return null;
    try { return JSON.parse(localStorage.getItem(key) ?? 'null') as T | null; } catch { localStorage.removeItem(key); return null; }
  }
  write<T>(key: string, value: T): void {
    if (typeof localStorage !== 'undefined') localStorage.setItem(key, JSON.stringify(value));
  }
  remove(key: string): void { if (typeof localStorage !== 'undefined') localStorage.removeItem(key); }
}
