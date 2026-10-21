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
  template: `<a class="skip-link" href="#contenido-principal">Saltar al contenido</a
    ><mat-toolbar class="topbar"
      ><a routerLink="/" class="brand" aria-label="Ir al inicio"
        ><span class="brand-orbit"><span></span></span><strong>Multiverso</strong
        ><small>Explorer</small></a
      >
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
      <span class="spacer"></span
      ><button
        mat-icon-button
        (click)="theme.toggle()"
        [attr.aria-label]="theme.mode() === 'dark' ? 'Activar tema claro' : 'Activar tema oscuro'"
      >
        <mat-icon>{{ theme.mode() === 'dark' ? 'light_mode' : 'dark_mode' }}</mat-icon></button
      ><button
        class="mobile-menu"
        mat-icon-button
        [matMenuTriggerFor]="menu"
        aria-label="Abrir menú"
      >
        <mat-icon>menu</mat-icon></button
      ><mat-menu #menu="matMenu"
        ><a mat-menu-item routerLink="/">Inicio</a>
        @for (u of universes; track u.id) {
          <a mat-menu-item [routerLink]="['/', u.id]">{{ u.name }}</a>
        }
      </mat-menu></mat-toolbar
    >`,
  styles: [
    `
      :host {
        display: block;
        position: sticky;
        top: 0;
        z-index: 50;
      }
      .topbar {
        height: 68px;
        padding: 0 clamp(18px, 4vw, 64px);
        border-bottom: 1px solid var(--line);
        background: color-mix(in srgb, var(--bg) 88%, transparent);
        backdrop-filter: blur(16px);
        color: var(--text);
      }
      .brand {
        display: flex;
        align-items: baseline;
        gap: 7px;
        color: inherit;
        text-decoration: none;
        letter-spacing: 0.02em;
      }
      .brand strong {
        font-family: var(--display);
        font-size: 21px;
      }
      .brand small {
        text-transform: uppercase;
        letter-spacing: 0.18em;
        font-size: 9px;
        color: var(--muted);
      }
      .brand-orbit {
        width: 27px;
        height: 27px;
        border: 1px solid var(--accent);
        border-radius: 50%;
        display: grid;
        place-items: center;
        position: relative;
        margin-right: 3px;
      }
      .brand-orbit:after {
        content: '';
        position: absolute;
        width: 35px;
        border-top: 1px solid var(--accent);
        transform: rotate(-35deg);
      }
      .brand-orbit span {
        width: 5px;
        height: 5px;
        background: var(--amber);
        border-radius: 50%;
      }
      nav {
        display: flex;
        margin-left: clamp(20px, 4vw, 58px);
        gap: 2px;
      }
      nav a {
        font-size: 12px;
        letter-spacing: 0.05em;
        color: var(--muted);
      }
      nav a.active {
        color: var(--text);
      }
      nav a.active:after {
        content: '';
        height: 2px;
        background: var(--accent);
        position: absolute;
        left: 14px;
        right: 14px;
        bottom: 2px;
      }
      .spacer {
        flex: 1;
      }
      .mobile-menu {
        display: none;
      }
      .skip-link {
        position: fixed;
        left: 12px;
        top: -50px;
        background: var(--text);
        color: var(--bg);
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
        .brand small {
          display: none;
        }
      }
    `,
  ],
})
export class HeaderComponent {
  readonly universes = UNIVERSES;
  readonly theme = inject(ThemeService);
}
