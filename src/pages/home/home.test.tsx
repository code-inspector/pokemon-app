import React from 'react';
import { render, screen } from '@testing-library/react';

import Home from './home';
import { usePokemons, useFetchPokemonByIdQuery } from '../../store/api/pokemonApiSlice';

jest.mock('../../store/api/pokemonApiSlice', () => ({
  usePokemons: jest.fn(),
  useFetchPokemonByIdQuery: jest.fn(),
}));

describe('Home Component', () => {
  beforeEach(() => {
    (usePokemons as jest.Mock).mockReturnValue({
      pokemons: [{ name: 'Bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' }],
      isFetching: false,
      isError: false,
      hasNextPage: true,
      hasPreviousPage: false,
    });
    (useFetchPokemonByIdQuery as jest.Mock).mockReturnValue({
      data: null,
      isFetching: false,
      isError: false,
    });
  });

  it('renders without crashing', () => {
    render(<Home />);
    expect(screen.getByText('Pokemon List')).toBeInTheDocument();
  });

  it('displays a list of pokemons when data is available', () => {
    render(<Home />);
    expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
  });

  it('shows loading indicator when data is being fetched', () => {
    (usePokemons as jest.Mock).mockReturnValue({
      isFetching: true,
    });
    render(<Home />);
    expect(screen.getByTestId('pokemons-loading')).toBeInTheDocument();
  });

  it('shows an error message when there is an error fetching data', () => {
    (usePokemons as jest.Mock).mockReturnValue({
      isError: true,
      error: { message: 'Error fetching data' },
    });
    render(<Home />);
    expect(screen.getByTestId('pokemons-error')).toBeInTheDocument();
  });
});
