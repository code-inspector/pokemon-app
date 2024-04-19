import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import style from './PokemonCard.module.css';
import { mediaApiBaseUrl } from '../../config';

interface PokemonCardProps {
  pokemon: any;
  index: number;
  onCardClick: (url: string) => void;
}

const PokemonCard = (props: PokemonCardProps) => {
  const { pokemon, index, onCardClick } = props;
  const { name, url } = pokemon;
  const imageNumber = url.split('/');
  const number = imageNumber[imageNumber.length - 2];
  const imageUrl = mediaApiBaseUrl + `/${number}.png`;

  return (
    <Card className={style.cardStyle} onClick={() => onCardClick(imageUrl)}>
      <Card.Img variant="top" src={imageUrl} />
      <hr />
      <Card.Body>
        <Card.Title className={style.cardTitle}>{name}</Card.Title>
      </Card.Body>
    </Card>
  );
};

export default PokemonCard;
