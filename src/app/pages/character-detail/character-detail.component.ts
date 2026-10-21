import { Component, DestroyRef, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CharacterDetail, UniverseInfo, universeInfo } from '../../core/models/character.model';
import { CharacterApiService } from '../../core/services/character-api.service';
import { ImageDialogComponent } from '../../shared/image-dialog/image-dialog.component';
@Component({
  selector: 'app-character-detail',
  imports: [MatButtonModule, MatChipsModule, MatIconModule, MatProgressSpinnerModule],
  template: `<section class="detail page-shell">
    @if (loading()) {
      <div class="loading">
        <mat-spinner diameter="48"></mat-spinner>
        <p>Abriendo expediente…</p>
      </div>
    } @else if (character(); as c) {
      <button class="back" mat-button (click)="back()">
        <mat-icon>arrow_back</mat-icon> Volver al archivo
      </button>
      <div class="detail-grid">
        <div class="visual">
          <span class="index"
            >{{ universe()?.index }} / {{ c.id.toString().padStart(4, '0') }}</span
          >
          <div class="orbits" aria-hidden="true"></div>
          <button (click)="openImage()" [attr.aria-label]="'Ampliar imagen de ' + c.name">
            <img [src]="c.image" [alt]="c.name" /><span><mat-icon>zoom_in</mat-icon> Ampliar</span>
          </button>
        </div>
        <article>
          <p class="eyebrow">{{ universe()?.name }} / Expediente</p>
          <h1>{{ c.name }}</h1>
          @if (c.description) {
            <p class="description">{{ c.description }}</p>
          }
          @if (c.facts.length) {
            <dl>
              @for (fact of c.facts; track fact.label) {
                <div>
                  <dt>{{ fact.label }}</dt>
                  <dd>{{ fact.value }}</dd>
                </div>
              }
            </dl>
          }
          @if (c.tags.length) {
            <section class="tags">
              <h2>Clasificación y habilidades</h2>
              <mat-chip-set aria-label="Atributos del personaje">
                @for (tag of c.tags; track tag) {
                  <mat-chip>{{ tag }}</mat-chip>
                }
              </mat-chip-set>
            </section>
          }
          @if (c.sections.length) {
            <section class="sections">
              <h2>Información adicional</h2>
              @for (section of c.sections; track section.title) {
                <div>
                  <h3>{{ section.title }}</h3>
                  <p>{{ section.body }}</p>
                </div>
              }
            </section>
          }
        </article>
      </div>
    } @else {
      <div class="loading">
        <mat-icon>error_outline</mat-icon>
        <h1>Expediente no encontrado</h1>
        <button mat-stroked-button (click)="back()">Regresar</button>
      </div>
    }
  </section>`,
  styleUrl: './character-detail.component.scss',
})
export class CharacterDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly api = inject(CharacterApiService);
  private readonly snack = inject(MatSnackBar);
  private readonly dialog = inject(MatDialog);
  private readonly destroy = inject(DestroyRef);
  readonly universe = signal<UniverseInfo | undefined>(undefined);
  readonly character = signal<CharacterDetail | undefined>(undefined);
  readonly loading = signal(true);
  constructor() {
    this.route.paramMap.pipe(takeUntilDestroyed(this.destroy)).subscribe((params) => {
      const u = universeInfo(params.get('universe'));
      const id = Number(params.get('id'));
      if (!u || !Number.isFinite(id)) {
        this.router.navigateByUrl('/');
        return;
      }
      this.universe.set(u);
      this.loading.set(true);
      this.api
        .detail(u.id, id)
        .pipe(
          finalize(() => this.loading.set(false)),
          takeUntilDestroyed(this.destroy),
        )
        .subscribe({
          next: (c) => this.character.set(c),
          error: () => {
            this.character.set(undefined);
            this.snack.open('No pudimos abrir este expediente.', 'Cerrar', { duration: 5000 });
          },
        });
    });
  }
  openImage(): void {
    const c = this.character();
    if (c)
      this.dialog.open(ImageDialogComponent, {
        data: { name: c.name, image: c.image },
        maxWidth: '94vw',
      });
  }
  back(): void {
    history.length > 1 ? history.back() : this.router.navigate(['/', this.universe()?.id]);
  }
}
