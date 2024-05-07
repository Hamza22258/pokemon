import { ListGroup } from 'react-bootstrap';

import { formatHeight, formatWeight } from '../utils';
import { PokemonItem } from './PokemonItem';
import { PokemonType, PokemonInfoProps } from '../types';

export const PokemonInfo: React.FC<PokemonInfoProps<PokemonType>> = ({ name, height, weight, types }) => (
  <ListGroup>
    <PokemonItem label='Name' value={name} />
    <PokemonItem label='Height' value={formatHeight(height)} />
    <PokemonItem label='Weight' value={formatWeight(weight)} />
    <ListGroup.Item className='d-flex gap-5 fs-4 justify-content-around'>
      <strong>Types</strong>{' '}
      <div>
        {types?.map(({ type: { name } }) => (
          <p key={name}>{name}</p>
        ))}
      </div>
    </ListGroup.Item>
  </ListGroup>
);
