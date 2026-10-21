import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { CharacterDetail, PagedResult } from '../models/character.model';
const DRAGON_BALL_API = 'https://dragonball-api.com/api/characters';
interface DbCharacter {
  id: number;
  name: string;
  image: string;
  ki?: string;
  maxKi?: string;
  race?: string;
  gender?: string;
  description?: string;
  affiliation?: string;
  originPlanet?: { name: string; description?: string };
  transformations?: { name: string; image?: string; ki?: string }[];
}
interface DbList {
  items: DbCharacter[];
  meta: { totalItems: number };
}
@Injectable({ providedIn: 'root' })
export class DragonBallService {
  private readonly http = inject(HttpClient);
  list(page: number, size: number): Observable<PagedResult> {
    return this.http
      .get<DbList>(DRAGON_BALL_API, {
        params: new HttpParams().set('page', page + 1).set('limit', size),
      })
      .pipe(
        map((r) => ({
          total: r.meta.totalItems,
          items: r.items.map((c) => ({
            id: c.id,
            name: c.name,
            image: c.image,
            universe: 'dragon-ball',
          })),
        })),
      );
  }
  detail(id: number): Observable<CharacterDetail> {
    return this.http.get<DbCharacter>(`${DRAGON_BALL_API}/${id}`).pipe(
      map((c) => ({
        id: c.id,
        name: c.name,
        image: c.image,
        universe: 'dragon-ball',
        description: c.description,
        facts: [
          { label: 'Raza', value: c.race ?? '' },
          { label: 'Género', value: c.gender ?? '' },
          { label: 'Ki', value: c.ki ?? '' },
          { label: 'Ki máximo', value: c.maxKi ?? '' },
          { label: 'Afiliación', value: c.affiliation ?? '' },
          { label: 'Planeta de origen', value: c.originPlanet?.name ?? '' },
        ].filter((f) => f.value !== ''),
        tags: c.transformations?.map((t) => t.name) ?? [],
        sections: c.originPlanet?.description
          ? [{ title: c.originPlanet.name, body: c.originPlanet.description }]
          : [],
      })),
    );
  }
}
