import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CharacterDetail, PagedResult, UniverseId } from '../models/character.model';
import { DemonSlayerService } from './demon-slayer.service';
import { DigimonService } from './digimon.service';
import { DragonBallService } from './dragon-ball.service';
import { PokemonService } from './pokemon.service';
@Injectable({ providedIn: 'root' })
export class CharacterApiService {
  private readonly digimon = inject(DigimonService);
  private readonly db = inject(DragonBallService);
  private readonly pokemon = inject(PokemonService);
  private readonly demon = inject(DemonSlayerService);
  list(universe: UniverseId, page: number, size: number): Observable<PagedResult> {
    // El listado usa el servicio de la API que eligió el usuario.
    switch (universe) {
      case 'digimon':
        return this.digimon.list(page, size);
      case 'dragon-ball':
        return this.db.list(page, size);
      case 'pokemon':
        return this.pokemon.list(page, size);
      case 'demon-slayer':
        return this.demon.list(page, size);
    }
  }
  detail(universe: UniverseId, id: number): Observable<CharacterDetail> {
    switch (universe) {
      case 'digimon':
        return this.digimon.detail(id);
      case 'dragon-ball':
        return this.db.detail(id);
      case 'pokemon':
        return this.pokemon.detail(id);
      case 'demon-slayer':
        return this.demon.detail(id);
    }
  }
}
