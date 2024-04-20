import React from 'react';
import { render, screen } from '@testing-library/react';

import PokemonModal from './PokemonModal';
import { useFetchPokemonByIdQuery } from '../../store/api/pokemonApiSlice';

jest.mock('../../store/api/pokemonApiSlice', () => ({
  usePokemons: jest.fn(),
  useFetchPokemonByIdQuery: jest.fn(),
}));

describe('PokemonModal component', () => {
  beforeEach(() => {
    (useFetchPokemonByIdQuery as jest.Mock).mockReturnValue({
      data: null,
      isFetching: false,
      isError: false,
    });
  });

  it('displays loading state correctly', () => {
    (useFetchPokemonByIdQuery as jest.Mock).mockReturnValue({ isFetching: true });
    render(<PokemonModal onHide={() => {}} id="1" />);
    expect(screen.getByTestId('pokemon-loading')).toBeInTheDocument();
  });

  it('displays an error when there is a problem fetching data', () => {
    (useFetchPokemonByIdQuery as jest.Mock).mockReturnValue({ isError: true });
    render(<PokemonModal onHide={() => {}} id="1" />);
    expect(screen.getByTestId('pokemon-error')).toBeInTheDocument();
  });

  it('displays the pokemon details when data is available', () => {
    (useFetchPokemonByIdQuery as jest.Mock).mockReturnValue({
      data: {
        name: 'Pikachu',
        height: 4,
        weight: 60,
        types: ['electric'],
        sprites: { front_default: 'http://example.com/pikachu.png' },
      },
      isLoading: false,
      isError: false,
    });
    render(<PokemonModal onHide={() => {}} id="1" />);
    const pikachuTexts = screen.getAllByText('Pikachu');
    expect(pikachuTexts.length).toBe(1);
    expect(screen.getByText('Name:')).toBeInTheDocument();
    expect(screen.getByText('Height:')).toBeInTheDocument();
    expect(screen.getByText('Weight:')).toBeInTheDocument();
    expect(screen.getByText('Types:')).toBeInTheDocument();
    expect(screen.getByText('electric')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', 'http://example.com/pikachu.png');
  });
});
