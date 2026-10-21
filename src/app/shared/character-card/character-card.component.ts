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
          <span class="fallback"
            ><mat-icon>hide_image</mat-icon><small>Imagen no disponible</small></span
          >
        }
        <span class="zoom" aria-hidden="true"><mat-icon>zoom_in</mat-icon></span>
      </button>
      <mat-card-content>
        <small>ID: {{ character().id }}</small>
        <h2>{{ character().name }}</h2>
        <a
          class="detail-link"
          [routerLink]="['/', character().universe, character().id]"
          [attr.aria-label]="'Ver detalle de ' + character().name"
        >
          Ver detalle <mat-icon>arrow_forward</mat-icon>
        </a>
      </mat-card-content>
    </mat-card>
  `,
  styles: `
    .character {
      height: 100%;
      overflow: hidden;
      background: var(--surface);
      color: var(--text);
      border: 1px solid var(--line);
      border-radius: 6px;
      box-shadow: var(--shadow);
      transition:
        transform 0.2s,
        box-shadow 0.2s;
    }
    .character:hover,
    .character:focus-within {
      transform: translateY(-2px);
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.16);
    }
    .image-button {
      position: relative;
      width: 100%;
      height: 230px;
      border: 0;
      border-bottom: 1px solid var(--line);
      background: var(--image-bg);
      display: grid;
      grid-template: minmax(0, 1fr) / minmax(0, 1fr);
      place-items: center;
      min-width: 0;
      min-height: 0;
      padding: 16px;
      overflow: hidden;
      cursor: zoom-in;
    }
    .image-button img {
      display: block;
      min-width: 0;
      min-height: 0;
      max-width: 100%;
      max-height: 100%;
      width: auto;
      height: auto;
      object-fit: contain;
    }
    .zoom {
      position: absolute;
      right: 10px;
      bottom: 10px;
      width: 34px;
      height: 34px;
      display: grid;
      place-items: center;
      background: var(--surface);
      color: var(--text);
      border-radius: 50%;
      box-shadow: var(--shadow);
    }
    .zoom mat-icon {
      width: 19px;
      height: 19px;
      font-size: 19px;
    }
    .fallback {
      display: grid;
      justify-items: center;
      gap: 8px;
      color: var(--muted);
    }
    mat-card-content {
      padding: 18px !important;
    }
    small {
      color: var(--muted);
    }
    h2 {
      margin: 7px 0 16px;
      font-size: 21px;
      line-height: 1.2;
      text-transform: capitalize;
    }
    .detail-link {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      color: var(--primary);
      font-weight: 600;
      text-decoration: none;
    }
    .detail-link:hover {
      text-decoration: underline;
    }
    .detail-link mat-icon {
      width: 18px;
      height: 18px;
      font-size: 18px;
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
