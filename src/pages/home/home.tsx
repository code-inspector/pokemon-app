import React, { useState } from 'react';
import { Col, Container, Row, Spinner } from 'react-bootstrap';

import style from './home.module.css';

import PokemonCard from '../../components/pokemonCard/PokemonCard';
import PokemonModal from '../../components/pokemonModal/PokemonModal';
import { usePokemons } from '../../store/api/pokemonApiSlice';
import Button from '../../components/button/Button';

export const Home = () => {
  const [selectedPokemonId, setSelectedPokemonId] = useState<string>('');

  const { pokemons, isFetching, isError, fetchNextPage, fetchPreviousPage, hasNextPage, hasPreviousPage } =
    usePokemons();

  const onCardClick = (url: string) => {
    setSelectedPokemonId(url);
  };

  const onHide = () => {
    setSelectedPokemonId('');
  };

  if (isError) return <Container data-testid="pokemons-error">Error while fetching data</Container>;

  return (
    <Container className="py-5">
      <Row className="mb-5">
        <h1 className="d-flex justify-content-center align-items-center">Pokemon List</h1>
      </Row>
      <div>
        {isFetching ? (
          <Container
            className={`d-flex justify-content-center align-items-center ${style.loading}`}
            data-testid="pokemons-loading"
          >
            <Spinner animation="border" />
          </Container>
        ) : (
          <>
            <Row className="d-flex justify-content-center align-items-center">
              {pokemons?.map((pokemon, index) => (
                <Col xs={10} md={6} lg={4} xl={3} key={index} className="mb-5">
                  <PokemonCard pokemon={pokemon} onCardClick={onCardClick} />
                </Col>
              ))}
            </Row>
            <div className="d-flex justify-content-center align-items-center column-gap-3">
              <Button title={'Previous'} disabled={!hasPreviousPage} onClick={() => fetchPreviousPage()} />
              <Button title={'Next'} disabled={!hasNextPage} onClick={() => fetchNextPage()} />
            </div>
          </>
        )}
      </div>
      <PokemonModal onHide={onHide} id={selectedPokemonId} />
    </Container>
  );
};

export default Home;
