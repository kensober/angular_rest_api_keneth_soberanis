import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { CharacterDetail, PagedResult } from '../models/character.model';
const DEMON_SLAYER_API = 'https://www.demonslayer-api.com/api/v1/characters';
interface DemonCharacter {
  id: number;
  name: string;
  img: string;
  age?: number;
  gender?: string;
  race?: string;
  description?: string;
  quote?: string;
  first_arc_appearance?: { name?: string; description?: string };
  affiliation?: { name?: string; description?: string };
  combat_style?: { name?: string; description?: string }[];
}
interface DemonResponse {
  content: DemonCharacter[];
  pagination?: { totalElements: number };
}
@Injectable({ providedIn: 'root' })
export class DemonSlayerService {
  private readonly http = inject(HttpClient);
  list(page: number, size: number): Observable<PagedResult> {
    return this.http
      .get<DemonResponse>(DEMON_SLAYER_API, {
        params: new HttpParams().set('page', page + 1).set('limit', size),
      })
      .pipe(
        map((r) => ({
          total: r.pagination?.totalElements ?? r.content.length,
          items: r.content.map((c) => ({
            id: c.id,
            name: c.name,
            image: c.img,
            universe: 'demon-slayer',
          })),
        })),
      );
  }
  detail(id: number): Observable<CharacterDetail> {
    return this.http
      .get<DemonResponse>(DEMON_SLAYER_API, { params: new HttpParams().set('id', id) })
      .pipe(
        map((r) => {
          const c = r.content[0];
          if (!c) throw new Error('Personaje no encontrado');
          return {
            id: c.id,
            name: c.name,
            image: c.img,
            universe: 'demon-slayer',
            description: c.description,
            facts: [
              { label: 'Edad', value: c.age ?? '' },
              { label: 'Género', value: c.gender ?? '' },
              { label: 'Raza', value: c.race ?? '' },
              { label: 'Afiliación', value: c.affiliation?.name ?? '' },
              { label: 'Primera aparición', value: c.first_arc_appearance?.name ?? '' },
            ].filter((f) => f.value !== ''),
            tags: c.combat_style?.flatMap((style) => (style.name ? [style.name] : [])) ?? [],
            sections: [
              ...(c.quote ? [{ title: 'Cita', body: `“${c.quote}”` }] : []),
              ...(c.first_arc_appearance?.description
                ? [
                    {
                      title: c.first_arc_appearance.name || 'Primera aparición',
                      body: c.first_arc_appearance.description,
                    },
                  ]
                : []),
              ...(c.affiliation?.description
                ? [{ title: c.affiliation.name || 'Afiliación', body: c.affiliation.description }]
                : []),
              ...(c.combat_style?.flatMap((style) =>
                style.name && style.description
                  ? [{ title: style.name, body: style.description }]
                  : [],
              ) ?? []),
            ],
          };
        }),
      );
  }
}
