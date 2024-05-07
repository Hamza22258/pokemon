import { useEffect, useState } from 'react';
import { Card, Container, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { PLACEHOLDER_IMG } from '../constants';
import { selectPokemonList, setPokemonList } from '../redux/pokemonSlice';
import { useGetPokemonListQuery } from '../services';

export const PokemonList: React.FC = () => {
  const dispatch = useDispatch();
  const [cardTitle, setCardTitle] = useState('');
  const pokemonList = useSelector(selectPokemonList);
  const { data, isLoading, error } = useGetPokemonListQuery('');

  useEffect(() => {
    setCardTitle(isLoading ? 'Loading...' : 'PokeReact');
  }, [isLoading]);

  useEffect(() => {
    if (data) dispatch(setPokemonList(data.results));
  }, [dispatch, data]);

  const noPokemonUI = !isLoading && !error && pokemonList && pokemonList.length === 0 && <div>No Pokémon found</div>;
  const errorUI = error && <div>Error: {'status' in error ? error.status : error.message || 'Unknown error'}</div>;

  const pokemonListUI = !isLoading && !error && pokemonList && pokemonList.length > 0 && (
    <ListGroup>
      {pokemonList.map((pokemon: { name: string }, index: number) => {
        const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
          e.currentTarget.classList.remove('fs-4');
          e.currentTarget.classList.add('fs-3');
        };

        const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
          e.currentTarget.classList.remove('fs-3');
          e.currentTarget.classList.add('fs-4');
        };

        return (
          <ListGroup.Item
            key={pokemon.name}
            as={Link}
            to={`/pokemon/${index + 1}`}
            className='d-flex gap-5 rounded-0 fs-4'
            style={{ cursor: 'pointer', transition: 'font-size 0.3s ease' }}
            action
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <img src={`.${PLACEHOLDER_IMG}`} alt='Pokemon' style={{ width: '30px', marginRight: '10px' }} />{' '}
            {pokemon.name}
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );

  return (
    <Container className='mt-3' style={{ maxWidth: '400px' }}>
      <Card
        bg='primary'
        text='white'
        className='rounded-top d-flex justify-content-center'
        style={{ borderRadius: '0' }}
      >
        <Card.Body className='d-flex justify-content-center align-items-center'>
          <Card.Title className='fs-1'>{cardTitle}</Card.Title>
        </Card.Body>
      </Card>
      {errorUI}
      {noPokemonUI}
      {pokemonListUI}
    </Container>
  );
};
