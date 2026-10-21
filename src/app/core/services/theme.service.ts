import { DOCUMENT } from '@angular/common';
import { Injectable, inject, signal } from '@angular/core';
export type ThemeMode = 'light' | 'dark';
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  readonly mode = signal<ThemeMode>(this.initialTheme());
  constructor() {
    this.apply(this.mode());
  }
  toggle(): void {
    const next = this.mode() === 'dark' ? 'light' : 'dark';
    this.mode.set(next);
    this.apply(next);
    localStorage.setItem('multiverso-theme', next);
  }
  private initialTheme(): ThemeMode {
    const saved = localStorage.getItem('multiverso-theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return typeof matchMedia === 'function' && matchMedia('(prefers-color-scheme: light)').matches
      ? 'light'
      : 'dark';
  }
  private apply(mode: ThemeMode): void {
    this.document.documentElement.dataset['theme'] = mode;
  }
}
