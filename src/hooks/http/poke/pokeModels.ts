export interface Pokemon {
  name: string;
  url: string;
}

export interface PokeSprite {
  back_default: string;
  back_shiny: string;
  front_default: string;
  front_shiny: string;
  other: {
    dream_world: {
      front_default: string;
    };
  };
}

export interface PokeStat {
  base_stat: number;
  stat: {
    name: string;
  };
}

export interface PokeType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokeMove {
  move: {
    name: string;
  };
}

export interface GetPokeDetailResponse {
  name: string;
  order: number;
  sprites: PokeSprite;
  types: PokeType[];
  moves: PokeMove[];
  nextUrl: string | null;
  stats: PokeStat[];
  weight: number;
  height: number;
  base_experience: number;
}

export interface GetPokeListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
  serializedResults: GetPokeDetailResponse[];
}

export interface GetPokeTypeListResponse {
  results: Pokemon[];
}
