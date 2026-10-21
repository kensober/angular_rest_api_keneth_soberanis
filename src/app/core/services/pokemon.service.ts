import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { CharacterDetail, PagedResult } from '../models/character.model';
const POKEMON_API = 'https://pokeapi.co/api/v2/pokemon';
interface PokeList {
  count: number;
  results: { name: string; url: string }[];
}
interface PokeDetail {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience?: number;
  sprites: { other?: { 'official-artwork'?: { front_default?: string } }; front_default?: string };
  types: { type: { name: string } }[];
  abilities: { ability: { name: string }; is_hidden: boolean }[];
  stats: { base_stat: number; stat: { name: string } }[];
}
function art(id: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}
@Injectable({ providedIn: 'root' })
export class PokemonService {
  private readonly http = inject(HttpClient);
  list(page: number, size: number): Observable<PagedResult> {
    return this.http
      .get<PokeList>(POKEMON_API, {
        params: new HttpParams().set('offset', page * size).set('limit', size),
      })
      .pipe(
        map((r) => ({
          total: r.count,
          items: r.results.map((p) => {
            const id = Number(p.url.split('/').filter(Boolean).pop());
            return { id, name: p.name, image: art(id), universe: 'pokemon' };
          }),
        })),
      );
  }
  detail(id: number): Observable<CharacterDetail> {
    return this.http.get<PokeDetail>(`${POKEMON_API}/${id}`).pipe(
      map((p) => ({
        id: p.id,
        name: p.name,
        image:
          p.sprites.other?.['official-artwork']?.front_default ??
          p.sprites.front_default ??
          art(p.id),
        universe: 'pokemon',
        description: `Pokémon registrado con el número ${p.id} en la Pokédex.`,
        facts: [
          { label: 'Altura', value: `${p.height / 10} m` },
          { label: 'Peso', value: `${p.weight / 10} kg` },
          { label: 'Experiencia base', value: p.base_experience ?? '' },
        ].filter((f) => f.value !== ''),
        tags: [
          ...p.types.map((x) => `Tipo: ${x.type.name}`),
          ...p.abilities.map((x) => `${x.ability.name}${x.is_hidden ? ' · oculta' : ''}`),
        ],
        sections: p.stats.map((x) => ({
          title: x.stat.name.replace('-', ' '),
          body: `${x.base_stat} puntos base`,
        })),
      })),
    );
  }
}
