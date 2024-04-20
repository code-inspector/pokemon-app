import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { Container, Spinner } from 'react-bootstrap';
import style from './PokemonModal.module.css';
import { useFetchPokemonByIdQuery } from '../../store/api/pokemonApiSlice';

interface PokemonModalProps {
  show: boolean;
  onHide: () => void;
  id: string;
}

const PokemonModal = ({ show, onHide, id }: PokemonModalProps) => {
  const {
    data: pokemon,
    isLoading,
    isError,
  } = useFetchPokemonByIdQuery(id, {
    skip: !id,
  });

  if (isLoading)
    return (
      <Container className={`d-flex justify-content-center align-items-center ${style.loading}`}>
        <Spinner animation="border" />
      </Container>
    );
  if (isError || !pokemon) return <Container>Error</Container>;

  return (
    <Modal show={show} onHide={onHide} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title>{pokemon?.name}</Modal.Title>
      </Modal.Header>
      <div className="d-flex justify-content-center align-items-center">
        <img src={pokemon.sprites.front_default} alt="Pokemon" className="w-50" />
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
    </Modal>
  );
};

export default PokemonModal;
