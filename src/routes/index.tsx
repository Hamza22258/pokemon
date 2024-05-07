import { Route, Routes, Outlet } from 'react-router-dom';

import { PokemonDetails } from '../pages/PokemonDetails';
import { PokemonList } from '../pages/PokemonList';

export const AppRoutes = () => (
  <Routes>
    <Route path='/' element={<Outlet />}>
      <Route index element={<PokemonList />} />
      <Route path='pokemon' element={<PokemonList />} />
    </Route>

    <Route path='/pokemon/:id' element={<PokemonDetails />} />
  </Routes>
);
