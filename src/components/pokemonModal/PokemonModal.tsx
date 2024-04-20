import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { Container, Spinner } from 'react-bootstrap';
import style from './PokemonModal.module.css';
import { useFetchPokemonByIdQuery } from '../../store/api/pokemonApiSlice';

interface PokemonModalProps {
  onHide: () => void;
  id: string;
}

const PokemonModal = ({ onHide, id }: PokemonModalProps) => {
  const {
    data: pokemon,
    isFetching,
    isError,
  } = useFetchPokemonByIdQuery(id, {
    skip: !id,
  });

  return (
    <Modal show={!!id} onHide={onHide} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton />
      {isFetching && (
        <Container className={`d-flex justify-content-center align-items-center ${style.loading}`}>
          <Spinner animation="border" data-testid="pokemon-loading" />
        </Container>
      )}
      {pokemon && !isFetching && (
        <>
          <div className="d-flex justify-content-center align-items-center">
            <img src={pokemon?.sprites?.front_default} alt={pokemon?.name || 'pokemon'} className="w-50" />
          </div>

          <span className="m-4 d-flex justify-content-between">
            <span className={style.title}>Name:</span>
            <span>{pokemon?.name}</span>
          </span>
          <hr />
          <span className="m-4 d-flex justify-content-between">
            <span className={style.title}>Height:</span>
            <span>{pokemon?.height}</span>
          </span>
          <hr />
          <span className="m-4 d-flex justify-content-between">
            <span className={style.title}>Weight:</span>
            <span>{pokemon?.weight}</span>
          </span>
          <hr />
          <span className="m-4 d-flex justify-content-between">
            <span className={style.title}>Types:</span>
            <span>{pokemon?.types?.join(', ')}</span>
          </span>
        </>
      )}
      {isError && !isFetching && (
        <Container
          className={`d-flex justify-content-center align-items-center ${style.loading}`}
          data-testid="pokemon-error"
        >
          Unable to fetch details
        </Container>
      )}
    </Modal>
  );
};

export default PokemonModal;
