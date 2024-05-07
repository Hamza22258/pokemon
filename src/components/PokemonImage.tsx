import { Card } from 'react-bootstrap';

export const PokemonImage = (props: any) => {
  return (
    <Card className='d-flex justify-content-center border-0'>
      <Card.Body className='d-flex justify-content-center align-items-center'>
        <img src={`${props?.selectedPokemon?.sprites?.front_default}`} alt='Pokemon' style={{ width: '150px' }} />
      </Card.Body>
    </Card>
  );
};
