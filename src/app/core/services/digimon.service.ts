import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { CharacterDetail, PagedResult } from '../models/character.model';
const DIGIMON_API = 'https://digi-api.com/api/v1/digimon';
interface DigiListItem {
  id: number;
  name: string;
  image: string;
}
interface DigiListResponse {
  content: DigiListItem[];
  pageable: { totalElements: number };
}
interface DigiDetail {
  id: number;
  name: string;
  xAntibody?: boolean;
  images?: { href: string }[];
  levels?: { level: string }[];
  types?: { type: string }[];
  attributes?: { attribute: string }[];
  releaseDate?: string;
  descriptions?: { language: string; description: string }[];
  skills?: { skill: string; description: string }[];
  fields?: { field: string }[];
  nextEvolutions?: { digimon: string }[];
}
@Injectable({ providedIn: 'root' })
export class DigimonService {
  private readonly http = inject(HttpClient);
  list(page: number, size: number): Observable<PagedResult> {
    return this.http
      .get<DigiListResponse>(DIGIMON_API, {
        params: new HttpParams().set('page', page).set('pageSize', size),
      })
      .pipe(
        map((r) => ({
          total: r.pageable.totalElements,
          items: r.content.map((c) => ({ ...c, universe: 'digimon' })),
        })),
      );
  }
  detail(id: number): Observable<CharacterDetail> {
    return this.http.get<DigiDetail>(`${DIGIMON_API}/${id}`).pipe(
      map((d) => ({
        id: d.id,
        name: d.name,
        image: d.images?.[0]?.href ?? '',
        universe: 'digimon',
        description:
          d.descriptions?.find((x) => x.language === 'en_us')?.description ??
          d.descriptions?.[0]?.description,
        facts: [
          { label: 'Nivel', value: d.levels?.map((x) => x.level).join(', ') ?? '' },
          { label: 'Tipo', value: d.types?.map((x) => x.type).join(', ') ?? '' },
          { label: 'Atributo', value: d.attributes?.map((x) => x.attribute).join(', ') ?? '' },
          { label: 'Lanzamiento', value: d.releaseDate ?? '' },
          { label: 'Anticuerpo X', value: d.xAntibody ? 'Sí' : 'No' },
        ].filter((f) => f.value !== ''),
        tags: [
          ...(d.fields?.map((x) => x.field) ?? []),
          ...(d.nextEvolutions?.slice(0, 8).map((x) => `Evoluciona a ${x.digimon}`) ?? []),
        ],
        sections:
          d.skills
            ?.filter((x) => x.skill)
            .map((x) => ({ title: x.skill, body: x.description || 'Habilidad característica.' })) ??
          [],
      })),
    );
  }
}
