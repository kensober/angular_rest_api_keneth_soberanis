import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { CharacterSummary } from '../../core/models/character.model';
import { ImageDialogComponent } from '../image-dialog/image-dialog.component';

@Component({
  selector: 'app-character-card',
  imports: [RouterLink, MatCardModule],
  templateUrl: './character-card.component.html',
  styles: `
    .character {
      height: 100%;
      overflow: hidden;
      background: var(--surface);
      color: var(--text);
      border: 1px solid var(--line);
    }
    .image-button {
      width: 100%;
      height: 200px;
      border: 0;
      border-bottom: 1px solid var(--line);
      background: var(--image-bg);
      display: grid;
      grid-template: minmax(0, 1fr) / minmax(0, 1fr);
      place-items: center;
      padding: 12px;
      overflow: hidden;
      cursor: pointer;
    }
    .image-button img {
      display: block;
      width: 100%;
      height: 100%;
      min-width: 0;
      min-height: 0;
      object-fit: contain;
    }
    .fallback {
      color: var(--muted);
    }
    mat-card-content {
      padding: 14px !important;
    }
    small {
      color: var(--muted);
    }
    h2 {
      margin: 6px 0 12px;
      font-size: 18px;
    }
    .detail-link {
      color: var(--primary);
    }
    @media (max-width: 600px) {
      .image-button {
        height: 200px;
      }
    }
  `,
})
export class CharacterCardComponent {
  @Input({ required: true }) character!: CharacterSummary;
  failed = false;

  constructor(private readonly dialog: MatDialog) {}

  openImage(): void {
    this.dialog.open(ImageDialogComponent, {
      data: { name: this.character.name, image: this.character.image },
      maxWidth: '94vw',
      panelClass: 'image-dialog-panel',
    });
  }
}
