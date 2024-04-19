import React from 'react';

import Modal from 'react-bootstrap/Modal';

import style from './PokemonModal.module.css';

interface PokemonModalProps {
  show: boolean;
  onHide: () => void;
  selectedPokemonUrl: string;
}

const PokemonModal = (props: PokemonModalProps) => {
  const { selectedPokemonUrl } = props;
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <div className="d-flex justify-content-center align-items-center">
        <img src={selectedPokemonUrl} alt="PokemonImage" className="w-50" />
      </div>

      <span className="m-4 d-flex justify-content-between">
        <span className={style.title}>Name:</span>
        <span>Woohoo, you are reading this text in a modal!</span>
      </span>
      <hr />
      <span className="m-4 d-flex justify-content-between">
        <span className={style.title}>Height:</span>
        <span>Woohoo, you are reading this text in a modal!</span>
      </span>
      <hr />
      <span className="m-4 d-flex justify-content-between">
        <span className={style.title}>Weight:</span>
        <span>Woohoo, you are reading this text in a modal!</span>
      </span>
      <hr />
      <span className="m-4 d-flex justify-content-between">
        <span className={style.title}>Types:</span>
        <span>Woohoo, you are reading this text in a modal!</span>
      </span>
    </Modal>
  );
};

export default PokemonModal;
