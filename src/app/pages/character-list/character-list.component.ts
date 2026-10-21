import { Component, DestroyRef, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorIntl, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CharacterSummary, UniverseInfo, universeInfo } from '../../core/models/character.model';
import { CharacterApiService } from '../../core/services/character-api.service';
import { spanishPaginatorIntl } from '../../core/services/paginator-intl';
import { CharacterCardComponent } from '../../shared/character-card/character-card.component';
@Component({
  selector: 'app-character-list',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    CharacterCardComponent,
  ],
  providers: [{ provide: MatPaginatorIntl, useFactory: spanishPaginatorIntl }],
  templateUrl: './character-list.component.html',
  styleUrl: './character-list.component.scss',
})
export class CharacterListComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly api = inject(CharacterApiService);
  private readonly snack = inject(MatSnackBar);
  private readonly destroy = inject(DestroyRef);
  readonly universe = signal<UniverseInfo | undefined>(undefined);
  readonly items = signal<CharacterSummary[]>([]);
  readonly total = signal(0);
  readonly loading = signal(true);
  readonly page = signal(0);
  pageSize = 12;
  constructor() {
    this.route.paramMap.pipe(takeUntilDestroyed(this.destroy)).subscribe((params) => {
      const current = universeInfo(params.get('universe'));
      if (!current) {
        this.router.navigateByUrl('/');
        return;
      }
      this.universe.set(current);
      this.page.set(0);
      this.load();
    });
  }
  load(): void {
    const current = this.universe();
    if (!current) return;
    this.loading.set(true);
    this.api
      .list(current.id, this.page(), this.pageSize)
      .pipe(
        finalize(() => this.loading.set(false)),
        takeUntilDestroyed(this.destroy),
      )
      .subscribe({
        next: (r) => {
          this.items.set(r.items);
          this.total.set(r.total);
        },
        error: () => {
          this.items.set([]);
          this.snack.open('No se pudieron cargar los personajes. Verifica tu conexión.', 'Cerrar', {
            duration: 5000,
          });
        },
      });
  }
  changePage(event: PageEvent): void {
    this.page.set(event.pageIndex);
    this.pageSize = event.pageSize;
    this.load();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  back(): void {
    history.length > 1 ? history.back() : this.router.navigateByUrl('/');
  }
}
