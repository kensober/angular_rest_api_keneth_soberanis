export type UniverseId = 'digimon' | 'dragon-ball' | 'pokemon' | 'demon-slayer';
export interface UniverseInfo {
  id: UniverseId;
  index: string;
  name: string;
  shortName: string;
  description: string;
  image: string;
  accent: string;
}
export interface CharacterSummary {
  id: number;
  name: string;
  image: string;
  universe: UniverseId;
}
export interface CharacterFact {
  label: string;
  value: string | number;
}
export interface CharacterSection {
  title: string;
  body: string;
}
export interface CharacterDetail extends CharacterSummary {
  description?: string;
  facts: CharacterFact[];
  tags: string[];
  sections: CharacterSection[];
}
export interface PagedResult {
  items: CharacterSummary[];
  total: number;
}
export const UNIVERSES: UniverseInfo[] = [
  {
    id: 'digimon',
    index: '01',
    name: 'Digimon',
    shortName: 'Digimon',
    description: 'Criaturas digitales, niveles, atributos y rutas evolutivas del Mundo Digital.',
    image: 'https://digi-api.com/images/digimon/w/Agumon.png',
    accent: '#9b87f5',
  },
  {
    id: 'dragon-ball',
    index: '02',
    name: 'Dragon Ball Z',
    shortName: 'DBZ',
    description: 'Guerreros, razas, niveles de ki y transformaciones del Universo 7.',
    image: 'https://dragonball-api.com/characters/goku_normal.webp',
    accent: '#f3ba63',
  },
  {
    id: 'pokemon',
    index: '03',
    name: 'Pokémon',
    shortName: 'Pokémon',
    description: 'Especies, tipos, habilidades y estadísticas de la Pokédex mundial.',
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
    accent: '#4dd6c3',
  },
  {
    id: 'demon-slayer',
    index: '04',
    name: 'Demon Slayer',
    shortName: 'Kimetsu',
    description: 'Cazadores, demonios y relatos del cuerpo de exterminio.',
    image: 'https://www.demonslayer-api.com/api/v1/characters/images/1.webp',
    accent: '#ef718e',
  },
];
export function universeInfo(id: string | null): UniverseInfo | undefined {
  return UNIVERSES.find((u) => u.id === id);
}
