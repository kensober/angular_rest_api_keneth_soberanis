import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { UNIVERSES } from '../../core/models/character.model';
@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, MatIconModule],
  template: `<section class="hero page">
      <div class="orbital" aria-hidden="true"><i></i><i></i><span>04</span></div>
      <div class="hero-copy">
        <p class="eyebrow">Archivo dimensional / Vol. I</p>
        <h1>Cuatro universos.<br /><em>Un solo observatorio.</em></h1>
        <p class="intro">
          Explora personajes, poderes y evoluciones a través de cuatro archivos conectados en tiempo
          real con sus universos.
        </p>
        <a class="explore" href="#archivos">Explorar archivos <mat-icon>south</mat-icon></a>
      </div>
      <aside>
        <span>ÍNDICE DEL OBSERVATORIO</span><strong><i></i> 4 archivos disponibles</strong
        ><small>Datos consultados mediante API REST</small>
      </aside>
    </section>
    <section id="archivos" class="archive page">
      <header>
        <p class="eyebrow">Índice de colecciones</p>
        <h2>Selecciona un universo</h2>
      </header>
      <div class="universe-grid">
        @for (u of universes; track u.id; let i = $index) {
          <a class="universe" [routerLink]="['/', u.id]" [style.--universe-accent]="u.accent"
            ><span class="number">{{ u.index }}</span>
            <div class="orbit" aria-hidden="true"></div>
            <div class="universe-image">
              @if (!broken()[i]) {
                <img
                  [src]="u.image"
                  [alt]="'Personaje representativo de ' + u.name"
                  (error)="markBroken(i)"
                />
              } @else {
                <mat-icon>auto_awesome</mat-icon>
              }
            </div>
            <div class="universe-copy">
              <span>COLECCIÓN / {{ u.index }}</span>
              <h3>{{ u.name }}</h3>
              <p>{{ u.description }}</p>
              <b>Entrar al archivo <mat-icon>arrow_forward</mat-icon></b>
            </div></a
          >
        }
      </div>
    </section>
    <footer class="page">
      <span>MULTIVERSO EXPLORER</span><span>OBSERVATORIO DIGITAL · 2026</span>
    </footer>`,
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
