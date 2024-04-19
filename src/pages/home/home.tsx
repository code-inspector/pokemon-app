import React, { useState } from 'react';
import PokemonCard from '../../components/pokemonCard/PokemonCard';
import { Col, Container, Row } from 'react-bootstrap';
import PokemonModal from '../../components/pokemonModal/PokemonModal';

interface Pokemon {
  name: string;
  url: string;
}

const pokemonData: Pokemon[] = [
  {
    name: 'bulbasaur',
    url: 'https://pokeapi.co/api/v2/pokemon/1/',
  },
  {
    name: 'ivysaur',
    url: 'https://pokeapi.co/api/v2/pokemon/2/',
  },
  {
    name: 'venusaur',
    url: 'https://pokeapi.co/api/v2/pokemon/3/',
  },
  {
    name: 'charmander',
    url: 'https://pokeapi.co/api/v2/pokemon/4/',
  },
  {
    name: 'charmeleon',
    url: 'https://pokeapi.co/api/v2/pokemon/5/',
  },
  {
    name: 'charizard',
    url: 'https://pokeapi.co/api/v2/pokemon/6/',
  },
  {
    name: 'squirtle',
    url: 'https://pokeapi.co/api/v2/pokemon/7/',
  },
  {
    name: 'wartortle',
    url: 'https://pokeapi.co/api/v2/pokemon/8/',
  },
  {
    name: 'blastoise',
    url: 'https://pokeapi.co/api/v2/pokemon/9/',
  },
];

export const Home = () => {
  const [modal, setModal] = useState<boolean>(false);
  const [selectedPokemonUrl, setSelectedPokemonUrl] = useState<string>('');

  const onCardClick = (url: string) => {
    setModal(true);
    setSelectedPokemonUrl(url);
  };

  const closeModal = () => {
    setModal(false);
  };

  return (
    <Container>
      <h1 className="m-5 d-flex justify-content-center align-items-center">Pokemon List</h1>
      <Row>
        {pokemonData.map((pokemon, index) => (
          <Col key={index} className="mb-5">
            <PokemonCard pokemon={pokemon} index={index + 1} onCardClick={onCardClick} />
          </Col>
        ))}
      </Row>
      <PokemonModal show={modal} onHide={closeModal} selectedPokemonUrl={selectedPokemonUrl} />
    </Container>
  );
};

export default Home;
