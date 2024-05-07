import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';

import { store } from '../redux/store';
import { PokemonList } from '../pages/PokemonList';
import * as pokemonApiModule from '../services';

jest.mock('../services/index', () => ({
  useGetPokemonListQuery: jest.fn(),
  pokemonApi: {
    reducerPath: 'pokemonApi',
    reducer: (state = {}, action: any) => state,
    middleware: () => [],
  },
}));

describe('PokemonList component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading message', () => {
    const mockData = {
      data: undefined,
      isLoading: true,
      error: null,
    };

    pokemonApiModule.useGetPokemonListQuery.mockReturnValue(mockData);

    render(
      <Provider store={store}>
        <PokemonList />
      </Provider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders error message', () => {
    const mockData = {
      data: undefined,
      isLoading: false,
      error: { message: 'Failed to fetch data' },
    };

    pokemonApiModule.useGetPokemonListQuery.mockReturnValue(mockData);

    render(
      <Provider store={store}>
        <PokemonList />
      </Provider>
    );

    expect(screen.getByText('Error: Failed to fetch data')).toBeInTheDocument();
  });

  test('renders no Pokemon message', () => {
    const mockData = {
      data: { results: [], count: 0 },
      isLoading: false,
      error: null,
    };

    pokemonApiModule.useGetPokemonListQuery.mockReturnValue(mockData);

    render(
      <Provider store={store}>
        <PokemonList />
      </Provider>
    );

    expect(screen.getByText('No Pokémon found')).toBeInTheDocument();
  });

  test('renders Pokemon list', () => {
    const mockData = {
      data: { results: [{ name: 'Pikachu' }, { name: 'Bulbasaur' }], count: 2 },
      isLoading: false,
      error: null,
    };

    pokemonApiModule.useGetPokemonListQuery.mockReturnValue(mockData);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <PokemonList />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
  });
});
