import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { LoadingSpinner, NoPokemonSelectedMessage, PokemonCard, PokemonImage, PokemonInfo } from '../components';
import { selectSelectedPokemon, setSelectedPokemon } from '../redux/pokemonSlice';
import { useGetPokemonDetailsQuery } from '../services';

const renderErrorUI = (error: any) => {
  if ('status' in error) {
    const errorMessage = error.status ? `Error: ${error.status}` : 'Unknown error';
    return <div>{errorMessage}</div>;
  } else {
    const errorMessage = error.message || 'Unknown error';
    return <div>Error: {errorMessage}</div>;
  }
};

export const PokemonDetails: React.FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const selectedPokemon: any = useSelector(selectSelectedPokemon);
  const { data, isLoading, error } = useGetPokemonDetailsQuery(parseInt(id || '0', 10));

  useEffect(() => {
    if (data) dispatch(setSelectedPokemon(data));
  }, [data, dispatch]);

  if (!selectedPokemon) return <NoPokemonSelectedMessage />;
  if (isLoading) return <LoadingSpinner />;
  if (error) return renderErrorUI(error);

  return (
    <Container className='shadow rounded p-0' style={{ marginTop: '10%', maxWidth: '400px' }}>
      <PokemonCard name={selectedPokemon.name} />
      <PokemonImage selectedPokemon={selectedPokemon} />
      <PokemonInfo
        name={selectedPokemon.name}
        height={selectedPokemon.height}
        weight={selectedPokemon.weight}
        types={selectedPokemon.types}
      />
    </Container>
  );
};
