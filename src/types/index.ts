export type PokemonType = { type: { name: string } };

export interface PokemonInfoProps<T> {
  name: string;
  height: number;
  weight: number;
  types: T[];
}

export interface Pokemon {
  name: string;
}

export interface PokemonState {
  pokemonList: Pokemon[];
  selectedPokemon: Pokemon | null;
}
