import { Card } from 'react-bootstrap';

import { capitalize } from '../utils';

export const PokemonCard: React.FC<{ name: string }> = ({ name }) => (
  <Card bg='primary' text='white' className='rounded-top d-flex justify-content-center' style={{ borderRadius: '0' }}>
    <Card.Body className='d-flex justify-content-center align-items-center'>
      <Card.Title className='fs-1'>{capitalize(name)}</Card.Title>
    </Card.Body>
  </Card>
);
