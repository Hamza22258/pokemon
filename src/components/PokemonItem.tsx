import { ListGroup } from 'react-bootstrap';

export const PokemonItem: React.FC<{ label: string; value: string | number }> = ({ label, value }) => (
  <ListGroup.Item className='d-flex gap-5 fs-4 justify-content-around rounded-0'>
    <strong>{label}</strong> {value}
  </ListGroup.Item>
);
