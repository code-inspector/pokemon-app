import React, { useState } from 'react';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import PokemonCard from '../../components/pokemonCard/PokemonCard';
import PokemonModal from '../../components/pokemonModal/PokemonModal';

import { useFetchPokemonsQuery } from '../../store/api/pokemonApiSlice';

export const Home = () => {
  const [modal, setModal] = useState<boolean>(false);
  const [selectedPokemonId, setSelectedPokemonId] = useState<string>('');

  const { data: pokemons, isError, isLoading, error } = useFetchPokemonsQuery();

  const onCardClick = (url: string) => {
    setModal(true);
    setSelectedPokemonId(url);
  };

  const closeModal = () => {
    setModal(false);
  };

  if (isLoading)
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" />
      </Container>
    );
  if (isError) return <Container>Error while fetching data</Container>;

  return (
    <Container>
      <h1 className="m-5 d-flex justify-content-center align-items-center">Pokemon List</h1>
      <Row>
        {pokemons &&
          pokemons?.map((pokemon, index) => (
            <Col key={index} className="mb-5">
              <PokemonCard pokemon={pokemon} onCardClick={onCardClick} />
            </Col>
          ))}
      </Row>
      {modal && <PokemonModal show={modal} onHide={closeModal} id={selectedPokemonId} />}
    </Container>
  );
};

export default Home;
