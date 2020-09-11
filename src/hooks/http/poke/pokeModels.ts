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
