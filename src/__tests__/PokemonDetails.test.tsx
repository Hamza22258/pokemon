import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';

import { store } from '../redux/store';
import { PokemonDetails } from '../pages/PokemonDetails';
import * as pokemonApiModule from '../services';

jest.mock('../services/index', () => ({
  useGetPokemonDetailsQuery: jest.fn(),
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
      isError: false,
    };

    pokemonApiModule.useGetPokemonDetailsQuery.mockReturnValue(mockData);

    render(
      <Provider store={store}>
        <PokemonDetails />
      </Provider>
    );

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  test('renders error message', () => {
    const mockData = {
      data: undefined,
      isLoading: false,
      error: { message: 'Failed to fetch data' },
    };

    pokemonApiModule.useGetPokemonDetailsQuery.mockReturnValue(mockData);

    render(
      <Provider store={store}>
        <PokemonDetails />
      </Provider>
    );

    expect(screen.getByText('Error: Failed to fetch data')).toBeInTheDocument();
  });

  test('renders Pokemon list', () => {
    const mockData = {
      name: 'Pikachu',
      weight: '10',
      height: '5',
      types: [{ type: { name: 'Electric' } }],
      sprites: { front_default: 'some/image/url' },
    };

    pokemonApiModule.useGetPokemonDetailsQuery.mockReturnValue(mockData);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <PokemonDetails />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Weight')).toBeInTheDocument();
    expect(screen.getByText('Height')).toBeInTheDocument();
    expect(screen.getByText('Types')).toBeInTheDocument();
  });
});
