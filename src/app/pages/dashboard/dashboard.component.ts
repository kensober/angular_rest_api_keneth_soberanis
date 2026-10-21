import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { UNIVERSES } from '../../core/models/character.model';
@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, MatIconModule],
  template: `<main class="dashboard page-shell">
    <section class="intro">
      <h1>Explorador de personajes</h1>
      <p>Consulta personajes de cuatro universos usando diferentes APIs REST.</p>
      <span><mat-icon>public</mat-icon> 4 universos disponibles</span>
    </section>
    <section aria-labelledby="universos-title">
      <h2 id="universos-title">Selecciona un universo</h2>
      <div class="universe-grid">
        @for (u of universes; track u.id; let i = $index) {
          <article class="universe" [style.--universe-accent]="u.accent">
            <div class="universe-image">
              @if (!broken()[i]) {
                <img [src]="u.image" [alt]="'Personaje de ' + u.name" (error)="markBroken(i)" />
              } @else {
                <mat-icon>image_not_supported</mat-icon>
              }
            </div>
            <div class="universe-copy">
              <h3>{{ u.name }}</h3>
              <p>{{ u.description }}</p>
              <a [routerLink]="['/', u.id]">Ver personajes <mat-icon>arrow_forward</mat-icon></a>
            </div>
          </article>
        }
      </div>
    </section>
    <footer>Proyecto de Programación Web · APIs REST</footer>
  </main>`,
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  readonly universes = UNIVERSES;
  readonly broken = signal<boolean[]>([]);
  markBroken(i: number): void {
    const next = [...this.broken()];
    next[i] = true;
    this.broken.set(next);
  }
}
