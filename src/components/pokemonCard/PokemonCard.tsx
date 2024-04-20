import Card from 'react-bootstrap/Card';

import style from './PokemonCard.module.css';
import { mediaApiBaseUrl } from '../../config/constants';

interface PokemonCardProps {
  pokemon: any;
  onCardClick: (url: string) => void;
}

const PokemonCard = (props: PokemonCardProps) => {
  const { pokemon, onCardClick } = props;
  const { name, url } = pokemon;
  const imageNumber = url.split('/');
  const number = imageNumber[imageNumber.length - 2];
  const imageUrl = mediaApiBaseUrl + `/${number}.png`;

  return (
    <Card className={style.card} onClick={() => onCardClick(number)}>
      <Card.Img variant="top" src={imageUrl} />
      <hr />
      <Card.Body>
        <Card.Title className={style.cardTitle}>{name}</Card.Title>
      </Card.Body>
    </Card>
  );
};

export default PokemonCard;
