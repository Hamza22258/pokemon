import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';

import { pokemonApi } from '../services';
import pokemonReducer from './pokemonSlice';

let middlewareConfig;

if (process.env.NODE_ENV === 'test') middlewareConfig = () => [];
else middlewareConfig = (getDefaultMiddleware: any) => getDefaultMiddleware().concat(pokemonApi.middleware);

export const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  middleware: middlewareConfig,
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
