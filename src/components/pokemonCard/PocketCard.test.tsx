import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import PokemonCard from './PokemonCard';

describe('PokemonCard component', () => {
  const mockOnCardClick = jest.fn();

  it('displays the correct pokemon information and handles click', () => {
    const expectedImageNumber = '4';
    const pokemon = {
      name: 'Charmander',
      url: 'https://pokeapi.co/api/v2/pokemon/4/',
    };

    render(<PokemonCard pokemon={pokemon} onCardClick={mockOnCardClick} />);

    expect(screen.getByText('Charmander')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Charmander'));

    expect(mockOnCardClick).toHaveBeenCalledWith(expectedImageNumber);

    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png`;
    expect(screen.getByRole('img')).toHaveAttribute('src', imageUrl);

    expect(screen.getByRole('img')).toHaveAttribute('alt', 'Charmander');
  });
});
