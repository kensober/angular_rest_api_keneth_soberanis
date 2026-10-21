import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
export type ThemeMode = 'light' | 'dark';
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  mode: ThemeMode = this.initialTheme();
  constructor() {
    this.apply(this.mode);
  }
  toggle(): void {
    this.mode = this.mode === 'dark' ? 'light' : 'dark';
    this.apply(this.mode);
    localStorage.setItem('multiverso-theme', this.mode);
  }
  private initialTheme(): ThemeMode {
    const saved = localStorage.getItem('multiverso-theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return typeof matchMedia === 'function' && matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }
  private apply(mode: ThemeMode): void {
    this.document.documentElement.dataset['theme'] = mode;
  }
}
