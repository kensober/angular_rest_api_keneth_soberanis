import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-image-dialog',
  imports: [MatDialogModule, MatButtonModule, MatIconModule],
  template: `<div class="dialog-head">
      <p>{{ data.name }}</p>
      <button mat-icon-button (click)="dialog.close()" aria-label="Cerrar imagen">
        <mat-icon>close</mat-icon>
      </button>
    </div>
    <mat-dialog-content
      ><img [src]="data.image" [alt]="'Imagen ampliada de ' + data.name"
    /></mat-dialog-content>`,
  styles: [
    `
      :host {
        display: block;
        background: var(--surface);
        color: var(--text);
      }
      .dialog-head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px 10px 0 24px;
      }
      .dialog-head p {
        font-size: 20px;
        font-weight: 600;
        margin: 0;
      }
      mat-dialog-content {
        display: grid;
        place-items: center;
        padding: 8px 24px 24px !important;
      }
      img {
        display: block;
        max-width: min(78vw, 780px);
        max-height: 75vh;
        width: auto;
        height: auto;
        object-fit: contain;
      }
    `,
  ],
})
export class ImageDialogComponent {
  readonly data = inject<{ name: string; image: string }>(MAT_DIALOG_DATA);
  readonly dialog = inject(MatDialogRef<ImageDialogComponent>);
}
