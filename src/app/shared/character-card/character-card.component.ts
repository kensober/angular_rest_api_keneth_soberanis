import { Component, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CharacterSummary } from '../../core/models/character.model';
import { ImageDialogComponent } from '../image-dialog/image-dialog.component';

@Component({
  selector: 'app-character-card',
  imports: [RouterLink, MatCardModule, MatIconModule],
  template: `
    <mat-card class="character">
      <button
        class="image-button"
        type="button"
        (click)="openImage()"
        [attr.aria-label]="'Ampliar imagen de ' + character().name"
      >
        @if (!failed()) {
          <img [src]="character().image" [alt]="character().name" (error)="failed.set(true)" />
        } @else {
          <span class="fallback">
            <mat-icon>hide_image</mat-icon><small>Imagen no disponible</small>
          </span>
        }
        <span class="zoom"><mat-icon>zoom_in</mat-icon></span>
      </button>
      <a
        class="detail-link"
        [routerLink]="['/', character().universe, character().id]"
        [attr.aria-label]="'Abrir expediente de ' + character().name"
      >
        <mat-card-content>
          <span class="catalogue">ID / {{ character().id.toString().padStart(4, '0') }}</span>
          <h2>{{ character().name }}</h2>
          <span class="open">Abrir expediente <mat-icon>arrow_outward</mat-icon></span>
        </mat-card-content>
      </a>
    </mat-card>
  `,
  styles: `
    .character {
      height: 100%;
      min-width: 0;
      overflow: hidden;
      background: var(--surface);
      color: var(--text);
      border: 1px solid var(--line);
      border-radius: 3px;
      box-shadow: none;
      transition:
        transform 0.25s,
        border-color 0.25s,
        box-shadow 0.25s;
    }
    .character:hover,
    .character:focus-within {
      transform: translateY(-5px);
      border-color: var(--accent);
      box-shadow: 0 18px 45px rgba(0, 0, 0, 0.14);
    }
    .image-button {
      position: relative;
      width: 100%;
      height: 250px;
      min-width: 0;
      min-height: 0;
      border: 0;
      border-bottom: 1px solid var(--line);
      background: var(--image-bg);
      display: grid;
      grid-template: minmax(0, 1fr) / minmax(0, 1fr);
      place-items: center;
      padding: 18px;
      overflow: hidden;
      cursor: zoom-in;
    }
    .image-button:focus-visible {
      outline: 3px solid var(--amber);
      outline-offset: -4px;
    }
    .image-button img {
      display: block;
      grid-area: 1 / 1;
      min-width: 0;
      min-height: 0;
      max-width: 100%;
      max-height: 100%;
      width: auto;
      height: auto;
      object-fit: contain;
      transform: scale(0.96);
      transition: transform 0.35s;
    }
    .character:hover .image-button img {
      transform: scale(1);
    }
    .zoom {
      position: absolute;
      right: 12px;
      bottom: 12px;
      width: 34px;
      height: 34px;
      display: grid;
      place-items: center;
      background: var(--bg);
      border: 1px solid var(--line);
      color: var(--text);
    }
    .zoom mat-icon {
      font-size: 18px;
      width: 18px;
      height: 18px;
    }
    .fallback {
      display: grid;
      justify-items: center;
      gap: 7px;
      color: var(--muted);
    }
    .detail-link {
      display: block;
      color: inherit;
      text-decoration: none;
    }
    .detail-link:focus-visible {
      outline: 3px solid var(--amber);
      outline-offset: -4px;
    }
    mat-card-content {
      padding: 19px 20px 21px !important;
    }
    .catalogue {
      font-size: 10px;
      letter-spacing: 0.18em;
      color: var(--accent);
      text-transform: uppercase;
    }
    h2 {
      font-family: var(--display);
      font-size: 25px;
      text-transform: capitalize;
      margin: 9px 0 18px;
      line-height: 1.05;
    }
    .open {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 12px;
      color: var(--muted);
      letter-spacing: 0.04em;
    }
    .open mat-icon {
      font-size: 17px;
      width: 17px;
      height: 17px;
    }
    @media (max-width: 600px) {
      .image-button {
        height: 220px;
      }
    }
  `,
})
export class CharacterCardComponent {
  readonly character = input.required<CharacterSummary>();
  readonly failed = signal(false);

  constructor(private readonly dialog: MatDialog) {}

  openImage(): void {
    this.dialog.open(ImageDialogComponent, {
      data: { name: this.character().name, image: this.character().image },
      maxWidth: '94vw',
      panelClass: 'image-dialog-panel',
    });
  }
}
