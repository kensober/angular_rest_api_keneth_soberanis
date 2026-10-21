import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ThemeService } from '../../core/services/theme.service';
import { UNIVERSES } from '../../core/models/character.model';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    RouterLinkActive,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
  ],
  template: `<a class="skip-link" href="#contenido-principal">Saltar al contenido</a>
    <mat-toolbar class="topbar">
      <a routerLink="/" class="brand" aria-label="Ir al inicio">
        <mat-icon>groups</mat-icon><strong>Explorador de personajes</strong>
      </a>
      <nav aria-label="Navegación principal">
        <a
          mat-button
          routerLink="/"
          routerLinkActive="active"
          [routerLinkActiveOptions]="{ exact: true }"
          >Inicio</a
        >
        @for (u of universes; track u.id) {
          <a mat-button [routerLink]="['/', u.id]" routerLinkActive="active">{{ u.shortName }}</a>
        }
      </nav>
      <span class="spacer"></span>
      <button
        mat-icon-button
        (click)="theme.toggle()"
        [attr.aria-label]="theme.mode() === 'dark' ? 'Activar tema claro' : 'Activar tema oscuro'"
      >
        <mat-icon>{{ theme.mode() === 'dark' ? 'light_mode' : 'dark_mode' }}</mat-icon>
      </button>
      <button
        class="mobile-menu"
        mat-icon-button
        [matMenuTriggerFor]="menu"
        aria-label="Abrir menú"
      >
        <mat-icon>menu</mat-icon>
      </button>
      <mat-menu #menu="matMenu">
        <a mat-menu-item routerLink="/">Inicio</a>
        @for (u of universes; track u.id) {
          <a mat-menu-item [routerLink]="['/', u.id]">{{ u.name }}</a>
        }
      </mat-menu>
    </mat-toolbar>`,
  styles: [
    `
      :host {
        display: block;
        position: sticky;
        top: 0;
        z-index: 50;
      }
      .topbar {
        height: 64px;
        padding: 0 max(16px, calc((100vw - 1200px) / 2));
        background: #3f51b5;
        color: #fff;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
      }
      .brand {
        display: flex;
        align-items: center;
        gap: 10px;
        color: inherit;
        text-decoration: none;
      }
      .brand strong {
        font-size: 19px;
      }
      nav {
        display: flex;
        margin-left: 32px;
      }
      nav a {
        color: #fff !important;
        opacity: 0.82;
      }
      nav a.active {
        opacity: 1;
        background: rgba(255, 255, 255, 0.14);
      }
      .spacer {
        flex: 1;
      }
      .mobile-menu {
        display: none;
      }
      .topbar > button {
        color: #fff !important;
      }
      .skip-link {
        position: fixed;
        left: 12px;
        top: -50px;
        background: #fff;
        color: #212121;
        padding: 10px;
        z-index: 100;
      }
      .skip-link:focus {
        top: 10px;
      }
      @media (max-width: 850px) {
        nav {
          display: none;
        }
        .mobile-menu {
          display: inline-flex;
        }
      }
      @media (max-width: 460px) {
        .brand strong {
          font-size: 16px;
        }
      }
    `,
  ],
})
export class HeaderComponent {
  readonly universes = UNIVERSES;
  readonly theme = inject(ThemeService);
}
