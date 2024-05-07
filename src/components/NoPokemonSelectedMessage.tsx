import { Container } from 'react-bootstrap';

import { PokemonCard } from '../components';

export const NoPokemonSelectedMessage: React.FC = () => (
  <Container className='mt-3'>
    <PokemonCard name='No Pokemon selected' />
  </Container>
);
