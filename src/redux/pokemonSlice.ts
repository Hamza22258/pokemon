import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from './store';
import { Pokemon, PokemonState } from '../types';

const initialState: PokemonState = {
  pokemonList: [],
  selectedPokemon: { name: '' },
};

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    setPokemonList(state, action: PayloadAction<Pokemon[]>) {
      state.pokemonList = action.payload;
    },
    setSelectedPokemon(state, action: PayloadAction<Pokemon | null>) {
      state.selectedPokemon = action.payload;
    },
  },
});

export const { setPokemonList, setSelectedPokemon } = pokemonSlice.actions;

export const selectPokemonList = (state: RootState) => state.pokemon.pokemonList;
export const selectSelectedPokemon = (state: RootState) => state.pokemon.selectedPokemon;

export default pokemonSlice.reducer;
